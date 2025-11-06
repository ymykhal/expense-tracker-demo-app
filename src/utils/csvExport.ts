import type { Transaction } from '../types/transaction';

/**
 * Exports transactions to CSV format and triggers download
 * @param transactions - Array of transactions to export
 * @param filename - Optional filename for the CSV file
 */
export const exportTransactionsToCSV = (
  transactions: Transaction[], 
  filename?: string
): void => {
  if (transactions.length === 0) {
    console.warn('No transactions to export');
    return;
  }

  // Generate default filename with timestamp if not provided
  const defaultFilename = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
  const finalFilename = filename || defaultFilename;

  // CSV headers
  const headers = ['Date', 'Description', 'Amount', 'Type', 'Category'];
  
  // Sort transactions by date (newest first) for export
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  // Convert transactions to CSV rows
  const csvRows = sortedTransactions.map(transaction => [
    transaction.date,
    `"${transaction.description.replace(/"/g, '""')}"`, // Escape quotes in description
    transaction.amount.toFixed(2),
    transaction.type,
    transaction.category
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...csvRows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    // Create object URL and trigger download
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', finalFilename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up object URL
    URL.revokeObjectURL(url);
  }
};

/**
 * Formats transactions for export with additional computed fields
 * @param transactions - Array of transactions to format
 * @returns Formatted transactions with computed fields
 */
export const formatTransactionsForExport = (transactions: Transaction[]) => {
  return transactions.map(transaction => ({
    ...transaction,
    formattedAmount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(transaction.amount),
    formattedDate: new Date(transaction.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }));
};