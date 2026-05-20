import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const Header = ({ onMenuClick = () => {} }) => {
  const { isDark, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const langLabels = { en: 'English', th: 'ไทย' };

  return (
    <header
      className={`
        h-16 bg-aeco-dark-card border-b border-aeco-dark-border
        flex items-center justify-between px-4 md:px-6 sticky top-0 z-40
        shadow-sm
      `}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-aeco-dark-border text-aeco-cyan"
        >
          ☰
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Language */}
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm bg-aeco-dark-border text-aeco-cyan border border-aeco-dark-border hover:border-aeco-cyan transition-colors cursor-pointer"
        >
          <option value="en">English</option>
          <option value="th">ไทย</option>
        </select>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-aeco-cyan hover:bg-aeco-dark-border border border-aeco-dark-border transition-colors"
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="p-2 rounded-lg text-aeco-cyan hover:bg-aeco-dark-border border border-aeco-dark-border transition-colors"
          >
            👤
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-aeco-dark-bg border border-aeco-dark-border rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 border-b border-aeco-dark-border">
                <p className="text-sm font-semibold text-white">Admin User</p>
                <p className="text-xs text-aeco-cyan/70">admin@aosecoflow.com</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-aeco-cyan hover:bg-aeco-dark-border transition-colors flex items-center gap-2">
                ⚙️ {t('navigation.settings')}
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-aeco-cyan hover:bg-aeco-dark-border transition-colors border-t border-aeco-dark-border flex items-center gap-2">
                🚪 {t('navigation.logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
