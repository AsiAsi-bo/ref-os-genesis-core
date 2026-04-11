
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, User, Bell, Shield, Monitor, Clock, Info } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import PersonalizationSettings from './components/PersonalizationSettings';
import AccountSettings from './components/AccountSettings';
import NotificationSettings from './components/NotificationSettings';
import PrivacySettings from './components/PrivacySettings';
import DisplaySettings from './components/DisplaySettings';
import NetworkSettings from './components/NetworkSettings';
import TimeLanguageSettings from './components/TimeLanguageSettings';
import AboutSettings from './components/AboutSettings';
import ResetSettings from './components/ResetSettings';

const settingsTabs = [
  { value: 'personalization', label: 'Display', icon: Monitor },
  { value: 'account', label: 'Account', icon: User },
  { value: 'notifications', label: 'Alerts', icon: Bell },
  { value: 'privacy', label: 'Privacy', icon: Shield },
  { value: 'system', label: 'System', icon: Clock },
  { value: 'about', label: 'About', icon: Info },
];

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const [wifi, setWifi] = useState(true);
  const [language, setLanguage] = useState('en');
  const [volume, setVolume] = useState(50);
  const [username, setUsername] = useState('User');

  return (
    <div className="h-full flex bg-refos-window text-white">
      {/* Sidebar nav */}
      <Tabs defaultValue="personalization" orientation="vertical" className="flex w-full h-full">
        <div className="w-52 border-r border-white/[0.06] p-3 bg-white/[0.02] flex flex-col">
          <div className="flex items-center gap-2 px-3 py-3 mb-4">
            <SettingsIcon size={18} className="text-white/40" />
            <span className="text-sm font-semibold text-white/80">Settings</span>
          </div>
          <TabsList className="flex flex-col gap-0.5 bg-transparent h-auto">
            {settingsTabs.map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="w-full justify-start gap-2.5 px-3 py-2 rounded-xl text-[13px] text-white/50 data-[state=active]:bg-white/[0.06] data-[state=active]:text-white/90 hover:bg-white/[0.03] transition-all"
              >
                <tab.icon size={16} />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <TabsContent value="personalization" className="mt-0 space-y-6">
            <div>
              <h2 className="text-lg font-medium text-white/90">Display & Personalization</h2>
              <p className="text-sm text-white/30">Customize the look and feel</p>
            </div>
            <PersonalizationSettings />
          </TabsContent>

          <TabsContent value="account" className="mt-0 space-y-6">
            <div>
              <h2 className="text-lg font-medium text-white/90">Account</h2>
              <p className="text-sm text-white/30">Manage your profile</p>
            </div>
            <AccountSettings username={username} onUsernameChange={setUsername} />
          </TabsContent>

          <TabsContent value="notifications" className="mt-0 space-y-6">
            <div>
              <h2 className="text-lg font-medium text-white/90">Notifications</h2>
              <p className="text-sm text-white/30">Control alerts and sounds</p>
            </div>
            <NotificationSettings notifications={notifications} volume={volume} onNotificationsChange={setNotifications} onVolumeChange={setVolume} />
          </TabsContent>

          <TabsContent value="privacy" className="mt-0 space-y-6">
            <div>
              <h2 className="text-lg font-medium text-white/90">Privacy & Security</h2>
              <p className="text-sm text-white/30">Manage your privacy</p>
            </div>
            <PrivacySettings privacy={privacy} onPrivacyChange={setPrivacy} />
          </TabsContent>

          <TabsContent value="system" className="mt-0 space-y-6">
            <div>
              <h2 className="text-lg font-medium text-white/90">System</h2>
              <p className="text-sm text-white/30">Configure system settings</p>
            </div>
            <DisplaySettings />
            <NetworkSettings wifi={wifi} onWifiChange={setWifi} />
            <TimeLanguageSettings language={language} onLanguageChange={setLanguage} />
          </TabsContent>

          <TabsContent value="about" className="mt-0 space-y-6">
            <div>
              <h2 className="text-lg font-medium text-white/90">About</h2>
              <p className="text-sm text-white/30">System information</p>
            </div>
            <AboutSettings />
            <div className="pt-6 border-t border-white/[0.06]">
              <ResetSettings />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
