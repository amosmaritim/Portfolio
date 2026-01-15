import type { NextApiRequest, NextApiResponse } from 'next';
import { getTickets } from '@/lib/data';
import { getPendingTransaction } from '@/lib/pending';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { checkoutRequestId, phone } = req.body;

  if (!checkoutRequestId && !phone) {
    return res.status(400).json({ error: 'CheckoutRequestID or phone is required' });
  }

  // Check if pending transaction still exists (payment not confirmed)
  if (checkoutRequestId) {
    const pending = getPendingTransaction(checkoutRequestId);
    if (pending) {
      return res.status(200).json({ 
        status: 'pending',
        message: 'Payment confirmation pending' 
      });
    }
  }

  // Check if ticket was created (payment confirmed)
  // Look for recent tickets matching the phone number (within last 10 minutes)
  const tickets = getTickets();
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const ticket = tickets.find(t => {
    if (phone) {
      // Format phone for comparison (remove + and ensure 254 format)
      const formattedPhone = phone.replace(/\D/g, '');
      const ticketPhone = t.phone.replace(/\D/g, '');
      return ticketPhone === formattedPhone && t.createdAt > tenMinutesAgo;
    }
    return false;
  });

  if (ticket) {
    return res.status(200).json({
      status: 'completed',
      ticket: {
        ticketId: ticket.ticketId,
        name: ticket.name,
        eventTitle: ticket.eventTitle,
      },
    });
  }

  return res.status(200).json({
    status: 'pending',
    message: 'Payment confirmation pending',
  });
}

