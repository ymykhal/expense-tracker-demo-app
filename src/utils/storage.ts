import type { Transaction } from '../types/transaction';

const KEY = 'expense-tracker:transactions';

export function loadTransactions(): Transaction[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Transaction[];
  } catch {
    return [];
  }
}

export function saveTransactions(data: Transaction[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
