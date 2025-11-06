import { useState } from 'react';
import type { FormEvent } from 'react';
import type { TransactionType } from '../types/transaction';
import { useTheme } from '../hooks/useTheme';
import { useTransactions } from '../hooks/useTransactions';

export function TransactionForm() {
  const { isDark } = useTheme();
  const { addTransaction } = useTransactions();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!description || Number.isNaN(value)) return;

    addTransaction({
      date,
      description,
      amount: value,
      type,
      category,
    });
    setDescription('');
    setAmount('');
    setCategory('General');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-xl shadow p-4 mb-6 flex flex-col gap-3 transition-colors ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="flex flex-wrap gap-3">
        <input
          type="date"
          className={`border rounded-lg px-3 py-2 flex-1 min-w-[140px] transition-colors ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <select
          className={`border rounded-lg px-3 py-2 transition-colors ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          value={type}
          onChange={e => setType(e.target.value as TransactionType)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          type="number"
          className={`border rounded-lg px-3 py-2 w-32 transition-colors ${
            type === 'income' 
              ? isDark 
                ? 'bg-green-900 border-green-700 focus:bg-green-800 focus:border-green-600' 
                : 'bg-green-50 border-green-200 focus:bg-green-100 focus:border-green-300'
              : isDark 
                ? 'bg-red-900 border-red-700 focus:bg-red-800 focus:border-red-600' 
                : 'bg-red-50 border-red-200 focus:bg-red-100 focus:border-red-300'
          } ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900'}`}
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          className={`border rounded-lg px-3 py-2 flex-1 min-w-[160px] transition-colors ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          className={`border rounded-lg px-3 py-2 min-w-[120px] transition-colors ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isDark 
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800' 
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          Add transaction
        </button>
      </div>
    </form>
  );
}
