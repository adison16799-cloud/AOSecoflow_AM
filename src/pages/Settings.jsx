import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const Settings = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const [profileData, setProfileData] = useState({
    displayName: 'Admin User',
    email: user?.email || '',
    company: 'AOSecoflow',
    phone: '02-xxx-xxxx',
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">⚙️ Settings</h1>
        <p className="text-aeco-light-text/60 dark:text-aeco-dark-text/60">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold">👤 Profile</h2>
        
        <Input
          label="Display Name"
          value={profileData.displayName}
          onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
        />
        
        <Input
          label="Email"
          type="email"
          value={profileData.email}
          disabled
        />
        
        <Input
          label="Company"
          value={profileData.company}
          onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
        />
        
        <Input
          label="Phone"
          value={profileData.phone}
          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
        />

        <Button className="w-full">💾 Save Profile</Button>
      </div>

      {/* Preferences Section */}
      <div className="bg-aeco-light-card dark:bg-aeco-dark-card border border-aeco-light-border dark:border-aeco-dark-border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold">🎨 Preferences</h2>
        
        <div className="flex justify-between items-center">
          <span>Theme: {isDark ? 'Dark Mode' : 'Light Mode'}</span>
          <Button variant="secondary" onClick={toggleTheme}>
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <span>Language: {language === 'en' ? 'English' : 'ไทย'}</span>
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="px-4 py-2 rounded-lg bg-aeco-light-bg dark:bg-aeco-dark-bg border border-aeco-light-border dark:border-aeco-dark-border"
          >
            <option value="en">English</option>
            <option value="th">ไทย</option>
          </select>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-aeco-danger/10 border border-aeco-danger/20 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-aeco-danger">🔴 Danger Zone</h2>
        
        <Button variant="danger" onClick={handleLogout} className="w-full">
          🚪 Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Settings;
