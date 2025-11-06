import './App.css';
import { Layout } from './components/Layout';
import SummaryCards from './components/SummaryCards';
import SpendingChart from './components/SpendingChart';
import TransactionArea from './components/TransactionArea';
import { ThemeProvider } from './contexts/ThemeContext';
import { TransactionsProvider } from './contexts/TransactionsContext';

function App() {
  return (
    <ThemeProvider>
      <TransactionsProvider>
        <Layout>
          <div className="space-y-6">        
            {/* Summary Cards */}
            <SummaryCards />
            
            {/* Spending Chart */}
            <SpendingChart />
            
            {/* Transaction Area */}
            <TransactionArea />
          </div>
        </Layout>
      </TransactionsProvider>
    </ThemeProvider>
  );
}

export default App;
