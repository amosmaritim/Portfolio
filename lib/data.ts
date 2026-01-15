import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const eventsFile = path.join(dataDir, 'events.json');
const ticketsFile = path.join(dataDir, 'tickets.json');

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  price: number;
  createdAt: string;
}

export interface Ticket {
  id: string;
  ticketId: string;
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  price: number;
  createdAt: string;
  used: boolean;
  usedAt?: string;
}

// Events functions
export function getEvents(): Event[] {
  if (!fs.existsSync(eventsFile)) {
    return [];
  }
  const data = fs.readFileSync(eventsFile, 'utf-8');
  return JSON.parse(data);
}

export function getEventById(id: string): Event | null {
  const events = getEvents();
  return events.find(e => e.id === id) || null;
}

export function saveEvent(event: Event): void {
  const events = getEvents();
  const existingIndex = events.findIndex(e => e.id === event.id);
  
  if (existingIndex >= 0) {
    events[existingIndex] = event;
  } else {
    events.push(event);
  }
  
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
}

export function deleteEvent(id: string): boolean {
  const events = getEvents();
  const filtered = events.filter(e => e.id !== id);
  
  if (filtered.length === events.length) {
    return false;
  }
  
  fs.writeFileSync(eventsFile, JSON.stringify(filtered, null, 2));
  return true;
}

// Tickets functions
export function getTickets(): Ticket[] {
  if (!fs.existsSync(ticketsFile)) {
    return [];
  }
  const data = fs.readFileSync(ticketsFile, 'utf-8');
  return JSON.parse(data);
}

export function getTicketById(ticketId: string): Ticket | null {
  const tickets = getTickets();
  return tickets.find(t => t.ticketId === ticketId) || null;
}

export function saveTicket(ticket: Ticket): void {
  const tickets = getTickets();
  tickets.push(ticket);
  fs.writeFileSync(ticketsFile, JSON.stringify(tickets, null, 2));
}

export function markTicketAsUsed(ticketId: string): boolean {
  const tickets = getTickets();
  const ticket = tickets.find(t => t.ticketId === ticketId);
  
  if (!ticket || ticket.used) {
    return false;
  }
  
  ticket.used = true;
  ticket.usedAt = new Date().toISOString();
  
  fs.writeFileSync(ticketsFile, JSON.stringify(tickets, null, 2));
  return true;
}




