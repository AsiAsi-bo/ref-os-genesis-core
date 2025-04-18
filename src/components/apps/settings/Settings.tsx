
import React, { useState } from 'react';
import { Monitor, User, Bell, Wifi, Shield, Clock, Info, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings } from './hooks/useSettings';

import DisplaySettings from './components/DisplaySettings';
import PersonalizationSettings from './components/PersonalizationSettings';
import AccountSettings from './components/AccountSettings';
import NotificationSettings from './components/NotificationSettings';
import NetworkSettings from './components/NetworkSettings';
import PrivacySettings from './components/PrivacySettings';
import TimeLanguageSettings from './components/TimeLanguageSettings';
import AboutSettings from './components/AboutSettings';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('display');
  const settings = useSettings();

  const tabs = [
    { id: 'display', name: 'Display', icon: <Monitor size={18} /> },
    { id: 'personalization', name: 'Personalization', icon: <Palette size={18} /> },
    { id: 'accounts', name: 'Accounts', icon: <User size={18} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={18} /> },
    { id: 'network', name: 'Network', icon: <Wifi size={18} /> },
    { id: 'privacy', name: 'Privacy', icon: <Shield size={18} /> },
    { id: 'time', name: 'Time & Language', icon: <Clock size={18} /> },
    { id: 'about', name: 'About', icon: <Info size={18} /> }
  ];

  return (
    <div className="h-full flex bg-refos-window">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 overflow-y-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={cn(
              "w-full flex items-center text-left px-4 py-3 hover:bg-white/10 transition-colors",
              activeTab === tab.id && "bg-white/10 border-l-2 border-refos-primary"
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="mr-3 text-white/80">{tab.icon}</span>
            <span className="text-sm font-medium">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-6">{tabs.find(t => t.id === activeTab)?.name}</h2>
        
        {activeTab === 'display' && <DisplaySettings />}
        {activeTab === 'personalization' && (
          <PersonalizationSettings 
            theme={settings.theme}
            onThemeChange={(checked) => settings.setTheme(checked ? 'dark' : 'light')}
          />
        )}
        {activeTab === 'accounts' && (
          <AccountSettings 
            username={settings.username}
            onUsernameChange={settings.setUsername}
          />
        )}
        {activeTab === 'notifications' && (
          <NotificationSettings 
            notifications={settings.notifications}
            volume={settings.volume}
            onNotificationsChange={settings.setNotifications}
            onVolumeChange={settings.setVolume}
          />
        )}
        {activeTab === 'network' && (
          <NetworkSettings 
            wifi={settings.wifi}
            onWifiChange={settings.setWifi}
          />
        )}
        {activeTab === 'privacy' && (
          <PrivacySettings 
            privacy={settings.privacy}
            onPrivacyChange={settings.setPrivacy}
          />
        )}
        {activeTab === 'time' && (
          <TimeLanguageSettings 
            language={settings.language}
            onLanguageChange={settings.setLanguage}
          />
        )}
        {activeTab === 'about' && <AboutSettings />}
      </div>
    </div>
  );
};

export default Settings;
