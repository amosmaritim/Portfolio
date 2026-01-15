import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const pendingFile = path.join(dataDir, 'pending.json');

export interface PendingTransaction {
  checkoutRequestId: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  createdAt: string;
}

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export function getPendingTransactions(): PendingTransaction[] {
  if (!fs.existsSync(pendingFile)) {
    return [];
  }
  const data = fs.readFileSync(pendingFile, 'utf-8');
  return JSON.parse(data);
}

export function savePendingTransaction(transaction: PendingTransaction): void {
  const transactions = getPendingTransactions();
  transactions.push(transaction);
  fs.writeFileSync(pendingFile, JSON.stringify(transactions, null, 2));
}

export function getPendingTransaction(checkoutRequestId: string): PendingTransaction | null {
  const transactions = getPendingTransactions();
  return transactions.find(t => t.checkoutRequestId === checkoutRequestId) || null;
}

export function deletePendingTransaction(checkoutRequestId: string): void {
  const transactions = getPendingTransactions();
  const filtered = transactions.filter(t => t.checkoutRequestId !== checkoutRequestId);
  fs.writeFileSync(pendingFile, JSON.stringify(filtered, null, 2));
}




