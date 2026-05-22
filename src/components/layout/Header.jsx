import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogOut, Settings, Sun, Moon, X } from 'lucide-react';

export const Header = ({ onMenuToggle }) => {
  const { isDark, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Breadcrumb generation
  const getBreadcrumbs = () => {
    const pathMap = {
      '/': { label: language === 'en' ? 'Dashboard' : 'แดชบอร์ด', icon: '📊' },
      '/waste-orders': { label: language === 'en' ? 'Waste Orders' : 'ใบสั่งซื้อขยะ', icon: '♻️' },
      '/vendors': { label: language === 'en' ? 'Vendors' : 'ผู้ขายขยะ', icon: '🏢' },
      '/billing': { label: language === 'en' ? 'Billing' : 'การเรียกเก็บเงิน', icon: '💳' },
      '/pricing': { label: language === 'en' ? 'Pricing' : 'ราคา', icon: '💵' },
      '/esg': { label: language === 'en' ? 'ESG & Reports' : 'ESG และรายงาน', icon: '🌍' },
      '/settings': { label: language === 'en' ? 'Settings' : 'ตั้งค่า', icon: '⚙️' },
    };

    const current = pathMap[location.pathname] || pathMap['/'];
    return [
      { label: 'AOSecoflow', path: '/', icon: '🌱' },
      current
    ];
  };

  const breadcrumbs = getBreadcrumbs();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-700 shadow-lg">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Hamburger + Breadcrumb */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Hamburger Menu Button */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors text-cyan-400"
              title="Toggle menu"
            >
              <Menu size={24} />
            </button>

            {/* Breadcrumb Navigation */}
            <nav className="hidden sm:flex items-center gap-2 text-sm min-w-0 overflow-hidden">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2 min-w-0">
                  {index > 0 && <span className="text-slate-600 flex-shrink-0">/</span>}
                  <button
                    onClick={() => crumb.path && navigate(crumb.path)}
                    className={`flex items-center gap-1 px-2 py-1 rounded transition-colors flex-shrink-0 ${
                      index === breadcrumbs.length - 1
                        ? 'text-cyan-400 font-semibold'
                        : 'text-slate-400 hover:text-cyan-400'
                    }`}
                  >
                    <span className="text-base">{crumb.icon}</span>
                    <span className="hidden md:inline whitespace-nowrap">{crumb.label}</span>
                  </button>
                </div>
              ))}
            </nav>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
            
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 rounded-lg overflow-hidden">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-cyan-500 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <div className="w-px h-6 bg-slate-700"></div>
              <button
                onClick={() => changeLanguage('th')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  language === 'th'
                    ? 'bg-cyan-500 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                TH
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-cyan-400"
              title="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Divider */}
            <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-200"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {user?.displayName?.charAt(0) || 'U'}
                </div>
                <span className="hidden sm:inline text-sm font-medium">{user?.displayName || 'User'}</span>
                <svg
                  className={`w-4 h-4 transition-transform flex-shrink-0 ${userMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-slate-700">
                    <p className="text-sm font-semibold text-slate-200">{user?.displayName || 'User'}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                    <p className="text-xs text-cyan-400 mt-1 font-medium uppercase">
                      {user?.role || 'User'}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-cyan-400 flex items-center gap-2 transition-colors"
                  >
                    <Settings size={16} />
                    {language === 'en' ? 'Settings' : 'ตั้งค่า'}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 flex items-center gap-2 transition-colors border-t border-slate-700"
                  >
                    <LogOut size={16} />
                    {language === 'en' ? 'Logout' : 'ออกจากระบบ'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;