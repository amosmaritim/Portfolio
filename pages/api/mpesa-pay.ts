import type { NextApiRequest, NextApiResponse } from 'next';
import { initiateSTKPush } from '@/lib/mpesa';
import { getEventById } from '@/lib/data';
import { savePendingTransaction } from '@/lib/pending';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { eventId, phoneNumber, name, email } = req.body;

  if (!eventId || !phoneNumber || !name || !email) {
    return res.status(400).json({ error: 'Event ID, phone number, name, and email are required' });
  }

  const event = getEventById(eventId);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  try {
    const response = await initiateSTKPush({
      phoneNumber,
      amount: event.price,
      accountReference: `EVENT-${eventId}`,
      transactionDesc: `Ticket for ${event.title}`,
    });

    if (response.ResponseCode === '0') {
      // Store pending transaction
      savePendingTransaction({
        checkoutRequestId: response.CheckoutRequestID,
        eventId,
        name,
        email,
        phone: phoneNumber,
        amount: event.price,
        createdAt: new Date().toISOString(),
      });

      return res.status(200).json({
        success: true,
        checkoutRequestId: response.CheckoutRequestID,
        message: 'Payment request sent. Please check your phone.',
      });
    } else {
      return res.status(400).json({
        error: response.errorMessage || 'Failed to initiate payment',
      });
    }
  } catch (error: any) {
    console.error('M-Pesa payment error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to initiate M-Pesa payment',
    });
  }
}

