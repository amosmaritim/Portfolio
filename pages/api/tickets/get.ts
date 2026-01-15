import type { NextApiRequest, NextApiResponse } from 'next';
import { getTicketById } from '@/lib/data';
import { generateQRCode } from '@/lib/qrcode';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ticketId } = req.query;

  if (!ticketId || typeof ticketId !== 'string') {
    return res.status(400).json({ error: 'Ticket ID is required' });
  }

  const ticket = getTicketById(ticketId);

  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  // Generate QR code
  let qrCode: string;
  try {
    qrCode = await generateQRCode(ticket.ticketId);
  } catch (error) {
    console.error('Error generating QR code:', error);
    return res.status(500).json({ error: 'Failed to generate QR code' });
  }

  return res.status(200).json({
    ticket,
    qrCode,
  });
}




