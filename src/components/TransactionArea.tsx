import React from 'react';
import { TransactionForm } from './TransactionForm';
import TransactionList from './TransactionList';
import { useTheme } from '../hooks/useTheme';

const TransactionArea: React.FC = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="pt-8 pb-8">
      <h2 className={`text-2xl font-bold mb-8 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>Transactions</h2>
      <div className="space-y-6">
        {/* Transaction Form */}
        <TransactionForm />

        {/* Transaction List */}
        <TransactionList />
      </div>
    </div>
  );
};

export default TransactionArea;