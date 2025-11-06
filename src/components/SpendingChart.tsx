import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useTheme } from '../hooks/useTheme';
import { useTransactions } from '../hooks/useTransactions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type ChartView = 'month' | 'category';

const SpendingChart: React.FC = () => {
  const { isDark } = useTheme();
  const { transactions } = useTransactions();
  const [chartView, setChartView] = useState<ChartView>('category');

  // Filter only expense transactions for spending analysis
  const expenseTransactions = useMemo(
    () => transactions.filter(t => t.type === 'expense'),
    [transactions]
  );

  // Calculate category data
  const categoryData = useMemo(() => {
    const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    
    return { labels, data };
  }, [expenseTransactions]);

  // Calculate monthly data
  const monthlyData = useMemo(() => {
    const monthlyTotals = expenseTransactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      acc[monthKey] = (acc[monthKey] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    // Sort by month
    const sortedEntries = Object.entries(monthlyTotals).sort(([a], [b]) => a.localeCompare(b));
    
    const labels = sortedEntries.map(([month]) => {
      const [year, monthNum] = month.split('-');
      const date = new Date(parseInt(year), parseInt(monthNum) - 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    });
    
    const data = sortedEntries.map(([, amount]) => amount);
    
    return { labels, data };
  }, [expenseTransactions]);

  // Chart colors
  const colors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4',
    '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'
  ];

  // Category chart configuration (Doughnut)
  const categoryChartData = {
    labels: categoryData.labels,
    datasets: [
      {
        label: 'Spending by Category',
        data: categoryData.data,
        backgroundColor: colors.slice(0, categoryData.labels.length),
        borderColor: colors.slice(0, categoryData.labels.length).map(color => color + '80'),
        borderWidth: 2,
      },
    ],
  };

  // Monthly chart configuration (Bar)
  const monthlyChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlyData.data,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          color: isDark ? '#ffffff' : '#374151',
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        titleColor: isDark ? '#ffffff' : '#111827',
        bodyColor: isDark ? '#d1d5db' : '#374151',
        borderColor: isDark ? '#4b5563' : '#e5e7eb',
        borderWidth: 1,
        callbacks: {
          label: function(context: unknown) {
            const ctx = context as { dataset: { label?: string }; parsed: number | { y: number } };
            const value = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(typeof ctx.parsed === 'number' ? ctx.parsed : (ctx.parsed as { y: number }).y || 0);
            return `${ctx.dataset.label || 'Value'}: ${value}`;
          },
        },
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      x: {
        ticks: {
          color: isDark ? '#d1d5db' : '#6b7280',
        },
        grid: {
          color: isDark ? '#374151' : '#f3f4f6',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: isDark ? '#d1d5db' : '#6b7280',
          callback: function(value: unknown) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(Number(value));
          },
        },
        grid: {
          color: isDark ? '#374151' : '#f3f4f6',
        },
      },
    },
  };

  return (
    <div className={`rounded-lg shadow-sm border p-6 transition-colors ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Header with title and view selector */}
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-medium ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Spending Analysis</h3>
        
        {/* View Toggle */}
        <div className={`flex rounded-lg p-1 ${
          isDark ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <button
            onClick={() => setChartView('category')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              chartView === 'category'
                ? isDark 
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'bg-white text-gray-900 shadow-sm'
                : isDark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            By Category
          </button>
          <button
            onClick={() => setChartView('month')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              chartView === 'month'
                ? isDark 
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'bg-white text-gray-900 shadow-sm'
                : isDark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            By Month
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-64">
        {expenseTransactions.length === 0 ? (
          // Empty state
          <div className={`h-full flex items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
            isDark 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-gray-50 border-gray-300'
          }`}>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <h4 className={`text-lg font-medium mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                No expense data
              </h4>
              <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                Add some expense transactions to see spending analysis
              </p>
            </div>
          </div>
        ) : (
          // Chart display
          <div className={`h-full rounded-lg ${
            isDark ? 'bg-gray-700' : 'bg-gray-50'
          } p-4`}>
            {chartView === 'category' ? (
              <Doughnut data={categoryChartData} options={chartOptions} />
            ) : (
              <Bar data={monthlyChartData} options={barChartOptions} />
            )}
          </div>
        )}
      </div>

      {/* Data Summary */}
      {expenseTransactions.length > 0 && (
        <div className={`mt-4 p-4 rounded-lg ${
          isDark ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50'
        }`}>
          <p className={`text-sm ${
            isDark ? 'text-blue-200' : 'text-blue-800'
          }`}>
            <span className="font-medium">Showing:</span> {expenseTransactions.length} expense transactions
            {chartView === 'category' && ` across ${categoryData.labels.length} categories`}
            {chartView === 'month' && ` across ${monthlyData.labels.length} months`}
          </p>
        </div>
      )}
    </div>
  );
};

export default SpendingChart;
