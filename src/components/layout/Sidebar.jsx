import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePermission } from '../../hooks/usePermission';
import {
  LayoutDashboard,
  Trash2,
  Building2,
  CreditCard,
  BarChart3,
  Settings,
  FileText,
  ChevronRight,
  X,
} from 'lucide-react';

export const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { canAccess } = usePermission();

  const translations = {
    en: {
      dashboard: 'Dashboard',
      wasteOrders: 'Waste Orders',
      vendors: 'Vendors',
      billing: 'Billing',
      pricing: 'Pricing',
      esgiReports: 'ESG & Reports',
      settings: 'Settings',
      version: 'v1.0',
    },
    th: {
      dashboard: 'แดชบอร์ด',
      wasteOrders: 'ใบสั่งซื้อขยะ',
      vendors: 'ผู้ขายขยะ',
      billing: 'การเรียกเก็บเงิน',
      pricing: 'ราคา',
      esgiReports: 'ESG และรายงาน',
      settings: 'ตั้งค่า',
      version: 'v1.0',
    },
  };

  const t = translations[language];

  const menuItems = [
    {
      id: 'dashboard',
      label: t.dashboard,
      path: '/',
      icon: LayoutDashboard,
      requiresAuth: true,
    },
    {
      id: 'waste-orders',
      label: t.wasteOrders,
      path: '/waste-orders',
      icon: Trash2,
      requiresAuth: true,
    },
    {
      id: 'vendors',
      label: t.vendors,
      path: '/vendors',
      icon: Building2,
      requiresAuth: true,
    },
    {
      id: 'billing',
      label: t.billing,
      path: '/billing',
      icon: CreditCard,
      requiresAuth: true,
      roles: ['admin', 'seller'],
    },
    {
      id: 'pricing',
      label: t.pricing,
      path: '/pricing',
      icon: BarChart3,
      requiresAuth: true,
      roles: ['admin'],
    },
    {
      id: 'esg',
      label: t.esgiReports,
      path: '/esg',
      icon: FileText,
      requiresAuth: true,
    },
    {
      id: 'settings',
      label: t.settings,
      path: '/settings',
      icon: Settings,
      requiresAuth: true,
    },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose?.();
  };

  // Filter menu items based on permissions
  const visibleMenuItems = menuItems.filter((item) => {
    if (!item.requiresAuth) return true;
    if (item.roles && !item.roles.includes(canAccess)) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-slate-900">
      {/* Close Button (Mobile) */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-lg text-slate-400"
      >
        <X size={24} />
      </button>

      {/* Logo Section */}
      <div className="px-6 py-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            A
          </div>
          <div>
            <h2 className="text-lg font-bold text-cyan-400">AOSecoflow</h2>
            <p className="text-xs text-slate-500">{t.version}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {visibleMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                active
                  ? 'bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 border border-cyan-400/30 text-cyan-400 shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
              title={item.label}
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  size={20}
                  className={`flex-shrink-0 ${
                    active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-400'
                  }`}
                />
                <span className="font-medium text-sm truncate">{item.label}</span>
              </div>

              {/* Active Indicator */}
              {active && (
                <ChevronRight
                  size={18}
                  className="flex-shrink-0 text-cyan-400 ml-2"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="px-4 py-6 border-t border-slate-700 space-y-3">
        {/* Quick Stats */}
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">
            {language === 'en' ? 'Status' : 'สถานะ'}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-300">
              {language === 'en' ? 'System Online' : 'ระบบออนไลน์'}
            </span>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center">
          <p className="text-xs text-slate-600">AOSecoflow {t.version}</p>
          <p className="text-xs text-slate-700 mt-1">© 2024 All Rights</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
