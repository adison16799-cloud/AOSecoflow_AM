import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePermission } from '../../hooks/usePermission';
import { PERMISSIONS } from '../../utils/roles';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: '📊', permission: null },
  { id: 'waste', label: 'Waste Orders', path: '/waste-orders', icon: '♻️', permission: null },
  { id: 'vendor', label: 'Vendors', path: '/vendors', icon: '🏢', permission: null },
  { id: 'billing', label: 'Billing', path: '/billing', icon: '💳', permission: null },
  { id: 'pricing', label: 'Pricing', path: '/pricing', icon: '💰', permission: null },
  { id: 'esg', label: 'ESG & Reports', path: '/esg', icon: '🌍', permission: null },
  { id: 'settings', label: 'Settings', path: '/settings', icon: '⚙️', permission: null },
];

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-aeco-dark-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-aeco-cyan rounded-lg flex items-center justify-center text-white font-bold text-sm">
            🌍
          </div>
          <span className="font-bold text-white text-sm">AOSecoflow</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-colors duration-200 text-sm font-medium
                  ${
                    active
                      ? 'bg-aeco-cyan text-white'
                      : 'text-aeco-cyan/70 hover:text-aeco-cyan hover:bg-aeco-dark-border'
                  }
                `}
              >
                <span className="text-lg w-5">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-aeco-dark-border px-4 py-3">
        <p className="text-xs text-aeco-cyan/50">AOSecoflow v1.0</p>
      </div>
    </div>
  );
};

export default Sidebar;
