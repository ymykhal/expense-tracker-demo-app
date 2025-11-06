import React from 'react';
import TransactionItem from './TransactionItem';
import { useTheme } from '../hooks/useTheme';
import { useTransactions } from '../hooks/useTransactions';
import { exportTransactionsToCSV } from '../utils/csvExport';

const TransactionList: React.FC = () => {
  const { isDark } = useTheme();
  const { transactions, removeTransaction } = useTransactions();
  
  // Sort transactions by date in descending order (most recent first)
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Handle CSV export
  const handleExportCSV = () => {
    exportTransactionsToCSV(sortedTransactions);
  };

  // Handle empty state
  if (sortedTransactions.length === 0) {
    return (
      <div className={`rounded-lg shadow-sm border overflow-hidden transition-colors ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="p-8 text-center">
          <div className={`w-16 h-16 mx-auto mb-4 ${
            isDark ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className={`text-lg font-medium mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>No transactions yet</h3>
          <p className={`${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>Add your first transaction to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg shadow-sm border overflow-hidden transition-colors ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Header */}
      <div className={`px-4 py-3 border-b transition-colors ${
        isDark 
          ? 'border-gray-700 bg-gray-750' 
          : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-medium ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Recent Transactions</h3>
          
          {/* Export to CSV Button */}
          <button
            onClick={handleExportCSV}
            disabled={sortedTransactions.length === 0}
            className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
              sortedTransactions.length === 0
                ? isDark
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isDark
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
            title={sortedTransactions.length === 0 ? 'No transactions to export' : 'Export transactions to CSV'}
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export to CSV
          </button>
        </div>
      </div>
      
      {/* Transaction List */}
      <div className={`divide-y ${
        isDark ? 'divide-gray-700' : 'divide-gray-200'
      }`}>
        {sortedTransactions.map((transaction) => (
          <div key={transaction.id} className="group relative">
            <TransactionItem transaction={transaction} />
            
            {/* Delete Button */}
            <button
              onClick={() => removeTransaction(transaction.id)}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors duration-200 ${
                isDark 
                  ? 'text-red-400 hover:text-red-300 hover:bg-red-900' 
                  : 'text-red-400 hover:text-red-600 hover:bg-red-50'
              }`}
              aria-label={`Delete transaction: ${transaction.description}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
