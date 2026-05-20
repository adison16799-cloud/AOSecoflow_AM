import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const menuItems = [
  { id: 'dashboard', label: 'navigation.dashboard', path: '/', icon: '📊' },
  { id: 'waste', label: 'navigation.wasteOrder', path: '/waste-orders', icon: '♻️' },
  { id: 'vendor', label: 'navigation.vendor', path: '/vendors', icon: '🏢' },
  { id: 'billing', label: 'navigation.billing', path: '/billing', icon: '💳' },
  { id: 'esg', label: 'navigation.esg', path: '/esg', icon: '🌍' },
  { id: 'settings', label: 'navigation.settings', path: '/settings', icon: '⚙️' },
];

export const Sidebar = ({ isOpen = true, onClose = () => {} }) => {
  const { t } = useLanguage();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 bg-aeco-dark-card dark:bg-aeco-dark-card
          border-r border-aeco-dark-border
          flex flex-col z-50 transition-all duration-300
          lg:relative lg:translate-x-0 lg:z-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-aeco-dark-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-aeco-cyan rounded-lg flex items-center justify-center text-white font-bold">
              🌍
            </div>
            <span className="font-bold text-white">AOSecoflow</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-aeco-cyan hover:bg-aeco-dark-border rounded-md p-1"
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => onClose()}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200 text-sm font-medium
                    ${
                      active
                        ? 'bg-aeco-cyan text-white shadow-md'
                        : 'text-aeco-cyan/70 hover:text-aeco-cyan hover:bg-aeco-dark-border/50'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{t(item.label)}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-aeco-dark-border px-4 py-3 text-xs text-aeco-cyan/50">
          <p>AOSecoflow v1.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
