import logo from '../assets/logo.png';
import { useTheme } from '../hooks/useTheme';

type Props = { children: React.ReactNode };

export function Layout({ children }: Props) {
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
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
      <main className="w-full flex justify-center flex-1">
        <div className="max-w-6xl w-full px-6 py-6">{children}</div>
      </main>
      
      {/* Footer */}
      <footer className={`border-t transition-colors duration-300 ${
        isDark 
          ? 'bg-gray-800 border-gray-700 text-gray-300' 
          : 'bg-white border-gray-200 text-gray-600'
      }`}>
        <div className="w-full flex justify-center">
          <div className="max-w-6xl w-full px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left side - App info */}
              <div className="text-center md:text-left">
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Built with React, TypeScript, Tailwind CSS, and Chart.js
                </p>
              </div>
              
              {/* Right side - Links */}
              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/ymykhal/expense-tracker-demo-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline ${
                    isDark 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
                
                <span className={`text-sm ${
                  isDark ? 'text-gray-600' : 'text-gray-400'
                }`}>|</span>
                
                <a
                  href="https://alturacodeworks.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline ${
                    isDark 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Altura Codeworks
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
