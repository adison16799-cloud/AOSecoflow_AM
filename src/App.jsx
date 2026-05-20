import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { useTheme } from './contexts/ThemeContext';
import { useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const { isDark, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-aeco-light-bg dark:bg-aeco-dark-bg text-aeco-light-text dark:text-aeco-dark-text">
      {/* Header */}
      <header className="bg-aeco-light-card dark:bg-aeco-dark-card border-b border-aeco-light-border dark:border-aeco-dark-border p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🌍 AOSecoflow</h1>
        
        <div className="flex gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-aeco-cyan text-white hover:bg-aeco-cyan-dark transition-colors font-medium"
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>

          {/* Language Toggle */}
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="px-4 py-2 rounded-lg bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border cursor-pointer font-medium"
          >
            <option value="en">English</option>
            <option value="th">ไทย</option>
          </select>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">{t('dashboard.title')}</h1>
        <p className="text-lg text-aeco-light-text/70 dark:text-aeco-dark-text/70 mb-8">
          {t('dashboard.subtitle')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Welcome Card */}
          <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-4">✨ Welcome to AOSecoflow</h2>
            <p className="text-aeco-light-text/70 dark:text-aeco-dark-text/70 text-lg">
              Enterprise Waste Management & ESG Tracking Platform
            </p>
            <p className="text-sm text-aeco-cyan mt-4">✅ Foundation Phase Complete</p>
          </div>

          {/* Status Card */}
          <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-4">🚀 System Status</h2>
            <div className="space-y-3">
              <p className="text-aeco-cyan font-semibold text-lg">✅ System Running</p>
              <p className="text-sm text-aeco-light-text/70 dark:text-aeco-dark-text/70">
                🎨 Theme: {isDark ? 'Dark Mode' : 'Light Mode'}
              </p>
              <p className="text-sm text-aeco-light-text/70 dark:text-aeco-dark-text/70">
                🌍 Language: {language === 'en' ? 'English' : 'ไทย'}
              </p>
              <p className="text-sm text-aeco-cyan font-medium mt-4">Ready for Phase 2</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
