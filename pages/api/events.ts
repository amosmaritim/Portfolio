import type { NextApiRequest, NextApiResponse } from 'next';
import { getEvents, saveEvent, deleteEvent, getEventById, Event } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const events = getEvents();
    return res.status(200).json(events);
  }

  if (req.method === 'POST') {
    const { title, date, location, description, imageUrl, price } = req.body;

    if (!title || !date || !location || !description || !imageUrl || price === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const event: Event = {
      id: uuidv4(),
      title,
      date,
      location,
      description,
      imageUrl,
      price: parseFloat(price),
      createdAt: new Date().toISOString(),
    };

    saveEvent(event);
    return res.status(201).json(event);
  }

  if (req.method === 'PUT') {
    const { id, title, date, location, description, imageUrl, price } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Event ID is required' });
    }

    const existingEvent = getEventById(id);
    if (!existingEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const updatedEvent: Event = {
      ...existingEvent,
      title: title || existingEvent.title,
      date: date || existingEvent.date,
      location: location || existingEvent.location,
      description: description || existingEvent.description,
      imageUrl: imageUrl || existingEvent.imageUrl,
      price: price !== undefined ? parseFloat(price) : existingEvent.price,
    };

    saveEvent(updatedEvent);
    return res.status(200).json(updatedEvent);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Event ID is required' });
    }

    const deleted = deleteEvent(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.status(200).json({ message: 'Event deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}




