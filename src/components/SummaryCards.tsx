import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { useTransactions } from '../hooks/useTransactions';

interface SummaryCardProps {
  title: string;
  value: number;
  iconBgColor: string;
  iconColor: string;
  textColor: string;
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  iconBgColor, 
  iconColor, 
  textColor, 
  icon 
}) => {
  const { isDark } = useTheme();
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className={`rounded-lg shadow-sm border p-6 transition-colors ${
      isDark 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 ${iconBgColor} rounded-full flex items-center justify-center`}>
            <div className={`w-5 h-5 ${iconColor}`}>
              {icon}
            </div>
          </div>
        </div>
        <div className="pl-4 flex-1">
          <dt className={`text-sm font-medium truncate ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {title}
          </dt>
          <dd className={`text-2xl font-bold ${textColor}`}>
            {formatCurrency(value)}
          </dd>
        </div>
      </div>
    </div>
  );
};

const SummaryCards: React.FC = () => {
  const { isDark } = useTheme();
  const { transactions } = useTransactions();
  
  // Calculate totals from transactions
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.totalIncome += transaction.amount;
      } else {
        acc.totalExpenses += transaction.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpenses: 0 }
  );

  const balance = totals.totalIncome - totals.totalExpenses;

  // Define icons as React components
  const IncomeIcon = (
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
    </svg>
  );

  const ExpenseIcon = (
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
    </svg>
  );

  const BalanceIcon = (
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="pt-8 pb-8">
      <h2 className={`text-2xl font-bold mb-8 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Income"
          value={totals.totalIncome}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
          textColor="text-green-600"
          icon={IncomeIcon}
        />
        
        <SummaryCard
          title="Total Expenses"
          value={totals.totalExpenses}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
          textColor="text-red-600"
          icon={ExpenseIcon}
        />
        
        <SummaryCard
          title="Balance"
          value={balance}
          iconBgColor={balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}
          iconColor={balance >= 0 ? 'text-blue-600' : 'text-orange-600'}
          textColor={balance >= 0 ? 'text-blue-600' : 'text-orange-600'}
          icon={BalanceIcon}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
