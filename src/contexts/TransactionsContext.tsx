import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Transaction } from '../types/transaction';
import { loadTransactions, saveTransactions } from '../utils/storage';
import { TransactionsContext } from './transactions';

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadTransactions()
  );

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [...prev, { ...t, id: crypto.randomUUID() }]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const value = {
    transactions,
    addTransaction,
    removeTransaction,
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};