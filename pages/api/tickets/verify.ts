import type { NextApiRequest, NextApiResponse } from 'next';
import { getTicketById, markTicketAsUsed } from '@/lib/data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ticketId } = req.body;

  if (!ticketId) {
    return res.status(400).json({ error: 'Ticket ID is required' });
  }

  const ticket = getTicketById(ticketId);

  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  if (ticket.used) {
    return res.status(400).json({
      error: 'Ticket already used',
      ticket: {
        ticketId: ticket.ticketId,
        name: ticket.name,
        eventTitle: ticket.eventTitle,
        used: true,
        usedAt: ticket.usedAt,
      },
    });
  }

  // Mark as used
  const success = markTicketAsUsed(ticketId);

  if (!success) {
    return res.status(500).json({ error: 'Failed to mark ticket as used' });
  }

  return res.status(200).json({
    success: true,
    ticket: {
      ticketId: ticket.ticketId,
      name: ticket.name,
      eventTitle: ticket.eventTitle,
      used: true,
    },
  });
}




