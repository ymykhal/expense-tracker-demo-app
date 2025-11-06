import logo from '../assets/logo.png';
import { useTheme } from '../hooks/useTheme';

type Props = { children: React.ReactNode };

export function Layout({ children }: Props) {
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-slate-100 text-gray-900'
    }`}>
      <header className={`text-white py-6 transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-slate-900'
      }`}>
        <div className="w-full flex justify-center">
          <div className="max-w-6xl w-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Expense Tracker Logo" className="w-16 h-16" />
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold">Income and Expense Tracker</h1>
                <p className="text-sm opacity-75">React + Tailwind + Chart.js demo</p>
              </div>
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-slate-700 hover:bg-slate-600 text-blue-400'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                // Sun icon for switching to light mode
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                // Moon icon for switching to dark mode
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      <main className="w-full flex justify-center">
        <div className="max-w-6xl w-full px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
