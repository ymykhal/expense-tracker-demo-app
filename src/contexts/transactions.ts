import { createContext } from 'react';
import type { Transaction } from '../types/transaction';

export interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  removeTransaction: (id: string) => void;
}

export const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);