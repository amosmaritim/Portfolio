import type { NextApiRequest, NextApiResponse } from 'next';
import { saveTicket, getEventById, Ticket } from '@/lib/data';
import { generateQRCode } from '@/lib/qrcode';
import { sendTicketEmail } from '@/lib/email';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { eventId, name, email, phone } = req.body;

  if (!eventId || !name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const event = getEventById(eventId);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  // Generate unique ticket ID
  const ticketId = `TKT-${uuidv4().toUpperCase().substring(0, 8)}`;

  // Generate QR code
  let qrCodeDataUrl: string;
  try {
    qrCodeDataUrl = await generateQRCode(ticketId);
  } catch (error) {
    console.error('Error generating QR code:', error);
    return res.status(500).json({ error: 'Failed to generate QR code' });
  }

  // Create ticket
  const ticket: Ticket = {
    id: uuidv4(),
    ticketId,
    eventId: event.id,
    eventTitle: event.title,
    name,
    email,
    phone,
    price: event.price,
    createdAt: new Date().toISOString(),
    used: false,
  };

  // Save ticket
  saveTicket(ticket);

  // Send email
  try {
    await sendTicketEmail({
      name,
      email,
      eventTitle: event.title,
      eventDate: event.date,
      eventLocation: event.location,
      ticketId,
      qrCodeDataUrl,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't fail the request if email fails, ticket is still created
  }

  return res.status(201).json({
    ticket,
    qrCodeDataUrl,
  });
}




