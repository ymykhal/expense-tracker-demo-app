import React from 'react';
import type { Transaction } from '../types/transaction';
import { useTheme } from '../hooks/useTheme';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { isDark } = useTheme();
  const { description, category, date, amount, type } = transaction;
  
  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format the amount with proper currency display
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  return (
    <div className={`flex items-center justify-between p-4 pr-12 border-b transition-colors ${
      isDark 
        ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
        : 'bg-white border-gray-200 hover:bg-gray-50'
    }`}>
      {/* Left side: Description and Category */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {description}
        </p>
        <p className={`text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {category}
        </p>
      </div>

      {/* Center: Date */}
      <div className="px-4">
        <p className={`text-sm ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {formatDate(date)}
        </p>
      </div>

      {/* Right side: Amount */}
      <div className="text-right">
        <p className={`text-sm font-semibold ${
          type === 'income' 
            ? 'text-green-600' 
            : 'text-red-600'
        }`}>
          {type === 'income' ? '+' : '-'}{formatAmount(amount)}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
