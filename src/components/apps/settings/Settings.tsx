import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, User, Bell, Shield, Monitor, Wifi, Clock, Info, RotateCcw } from 'lucide-react';
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

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const [display, setDisplay] = useState('auto');
  const [wifi, setWifi] = useState(true);
  const [language, setLanguage] = useState('en');
  const [timeZone, setTimeZone] = useState('auto');
  const [version] = useState('1.0.0');
  const [volume, setVolume] = useState(50);
  const [username, setUsername] = useState('User');

  return (
    <div className="h-full flex flex-col bg-refos-window text-white">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center">
          <SettingsIcon className="mr-2 h-5 w-5" />
          <h1 className="text-lg font-semibold">Settings</h1>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <Tabs defaultValue="personalization" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6 bg-refos-window/50">
            <TabsTrigger value="personalization" className="flex flex-col items-center p-2 text-xs">
              <Monitor size={16} />
              <span className="mt-1">Display</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex flex-col items-center p-2 text-xs">
              <User size={16} />
              <span className="mt-1">Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex flex-col items-center p-2 text-xs">
              <Bell size={16} />
              <span className="mt-1">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex flex-col items-center p-2 text-xs">
              <Shield size={16} />
              <span className="mt-1">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex flex-col items-center p-2 text-xs">
              <Clock size={16} />
              <span className="mt-1">System</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex flex-col items-center p-2 text-xs">
              <Info size={16} />
              <span className="mt-1">About</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personalization">
            <Card className="bg-refos-window/30 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Personalization</CardTitle>
                <CardDescription className="text-white/70">
                  Customize the look and feel of your desktop
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PersonalizationSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card className="bg-refos-window/30 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Account Settings</CardTitle>
                <CardDescription className="text-white/70">
                  Manage your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AccountSettings 
                  username={username}
                  onUsernameChange={setUsername}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-refos-window/30 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Notification Settings</CardTitle>
                <CardDescription className="text-white/70">
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationSettings 
                  notifications={notifications}
                  volume={volume}
                  onNotificationsChange={setNotifications}
                  onVolumeChange={setVolume}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="bg-refos-window/30 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Privacy & Security</CardTitle>
                <CardDescription className="text-white/70">
                  Manage your privacy settings and security options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PrivacySettings 
                  privacy={privacy}
                  onPrivacyChange={setPrivacy}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card className="bg-refos-window/30 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">System Settings</CardTitle>
                <CardDescription className="text-white/70">
                  Configure system-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <DisplaySettings />
                  <NetworkSettings 
                    wifi={wifi}
                    onWifiChange={setWifi}
                  />
                  <TimeLanguageSettings 
                    language={language}
                    onLanguageChange={setLanguage}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card className="bg-refos-window/30 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">About Ref OS</CardTitle>
                <CardDescription className="text-white/70">
                  System information and version details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AboutSettings />
                <div className="mt-6 pt-6 border-t border-white/10">
                  <ResetSettings />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
