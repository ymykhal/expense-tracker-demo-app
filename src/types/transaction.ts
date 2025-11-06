export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;          // ISO string
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
}
