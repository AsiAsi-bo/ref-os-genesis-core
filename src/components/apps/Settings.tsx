import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Monitor, 
  User, 
  Bell, 
  Shield, 
  Wifi, 
  Palette,
  Clock, 
  Info,
  Globe,
  Sun,
  Moon,
  Volume2,
  BellOff,
  WifiOff,
  Lock,
  Unlock,
  Languages
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('display');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [wifi, setWifi] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const [language, setLanguage] = useState('en');
  const [username, setUsername] = useState('User');
  const [volume, setVolume] = useState(70);

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
        
        {activeTab === 'display' && (
          <div>
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Resolution</h3>
              <div className="bg-refos-window/50 p-4 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Screen Resolution</span>
                  <span className="text-sm font-medium">1920 x 1080</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Refresh Rate</span>
                  <span className="text-sm font-medium">60 Hz</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Brightness & Color</h3>
              <div className="bg-refos-window/50 p-4 rounded-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white/80">Night Light</span>
                  <div className="h-6 w-12 rounded-full bg-refos-window/70 flex items-center p-1">
                    <div className="h-4 w-4 rounded-full bg-white/80"></div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-white/80 block mb-2">Brightness</span>
                  <div className="w-full h-1 bg-refos-window/70 rounded-full relative">
                    <div className="absolute h-1 bg-refos-primary rounded-full" style={{ width: '70%' }}></div>
                    <div 
                      className="absolute h-4 w-4 bg-white rounded-full -mt-1.5" 
                      style={{ left: 'calc(70% - 8px)' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <Button className="bg-refos-primary hover:bg-refos-primary/80">Apply Changes</Button>
          </div>
        )}

        {activeTab === 'personalization' && (
          <div>
            <div className="mb-6">
              <h3 className="text-md font-medium mb-4">Theme</h3>
              <div className="bg-refos-window/50 p-4 rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {theme === 'light' ? <Sun size={18} className="mr-2" /> : <Moon size={18} className="mr-2" />}
                    <span>Theme Mode</span>
                  </div>
                  <Switch 
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  />
                </div>
              </div>
            </div>
            <Button className="bg-refos-primary hover:bg-refos-primary/80">Apply Changes</Button>
          </div>
        )}

        {activeTab === 'accounts' && (
          <div>
            <div className="mb-6">
              <h3 className="text-md font-medium mb-4">User Profile</h3>
              <div className="bg-refos-window/50 p-4 rounded-md space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-refos-primary/20 flex items-center justify-center">
                    <User size={32} />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-refos-window/70 px-3 py-2 rounded-md outline-none focus:ring-2 ring-refos-primary"
                    />
                    <p className="text-sm text-white/60 mt-1">Local Account</p>
                  </div>
                </div>
              </div>
            </div>
            <Button className="bg-refos-primary hover:bg-refos-primary/80">Save Changes</Button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <div className="mb-6">
              <h3 className="text-md font-medium mb-4">Notification Settings</h3>
              <div className="bg-refos-window/50 p-4 rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {notifications ? <Bell size={18} className="mr-2" /> : <BellOff size={18} className="mr-2" />}
                    <span>Enable Notifications</span>
                  </div>
                  <Switch 
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Volume2 size={18} className="mr-2" />
                    <span>Notification Sound</span>
                  </div>
                  <div className="w-32">
                    <div className="w-full h-1 bg-refos-window/70 rounded-full relative">
                      <div 
                        className="absolute h-1 bg-refos-primary rounded-full" 
                        style={{ width: `${volume}%` }}
                      ></div>
                      <div 
                        className="absolute h-4 w-4 bg-white rounded-full -mt-1.5" 
                        style={{ left: `calc(${volume}% - 8px)` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button className="bg-refos-primary hover:bg-refos-primary/80">Apply Changes</Button>
          </div>
        )}

        {activeTab === 'network' && (
          <div>
            <div className="mb-6">
              <h3 className="text-md font-medium mb-4">Network Settings</h3>
              <div className="bg-refos-window/50 p-4 rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {wifi ? <Wifi size={18} className="mr-2" /> : <WifiOff size={18} className="mr-2" />}
                    <span>Wi-Fi</span>
                  </div>
                  <Switch 
                    checked={wifi}
                    onCheckedChange={setWifi}
                  />
                </div>
                {wifi && (
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-sm text-white/60 mb-2">Available Networks</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-refos-window/30 rounded">
                        <div className="flex items-center">
                          <Wifi size={16} className="mr-2" />
                          <span>Network_1</span>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-refos-window/30 rounded">
                        <div className="flex items-center">
                          <Wifi size={16} className="mr-2" />
                          <span>Network_2</span>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Button className="bg-refos-primary hover:bg-refos-primary/80">Apply Changes</Button>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div>
            <div className="mb-6">
              <h3 className="text-md font-medium mb-4">Privacy Settings</h3>
              <div className="bg-refos-window/50 p-4 rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {privacy ? <Lock size={18} className="mr-2" /> : <Unlock size={18} className="mr-2" />}
                    <span>Enhanced Privacy Protection</span>
                  </div>
                  <Switch 
                    checked={privacy}
                    onCheckedChange={setPrivacy}
                  />
                </div>
                <div className="text-sm text-white/60">
                  {privacy ? 
                    "Your data is protected with enhanced privacy features" :
                    "Enable enhanced privacy protection to secure your data"
                  }
                </div>
              </div>
            </div>
            <Button className="bg-refos-primary hover:bg-refos-primary/80">Save Settings</Button>
          </div>
        )}

        {activeTab === 'time' && (
          <div>
            <div className="mb-6">
              <h3 className="text-md font-medium mb-4">Language Settings</h3>
              <div className="bg-refos-window/50 p-4 rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Languages size={18} className="mr-2" />
                    <span>System Language</span>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-refos-window/70 px-3 py-2 rounded-md outline-none focus:ring-2 ring-refos-primary"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe size={18} className="mr-2" />
                      <span>Time Zone</span>
                    </div>
                    <select
                      className="bg-refos-window/70 px-3 py-2 rounded-md outline-none focus:ring-2 ring-refos-primary"
                    >
                      <option>UTC-08:00 (PST)</option>
                      <option>UTC-05:00 (EST)</option>
                      <option>UTC+00:00 (GMT)</option>
                      <option>UTC+01:00 (CET)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <Button className="bg-refos-primary hover:bg-refos-primary/80">Apply Changes</Button>
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <div className="bg-refos-window/50 p-6 rounded-md mb-6">
              <h3 className="text-xl font-semibold mb-4">Ref OS</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Edition</span>
                  <span className="font-medium">Ref OS Professional</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Version</span>
                  <span className="font-medium">1.0.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Build</span>
                  <span className="font-medium">20XX.XXX.XX</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Installed On</span>
                  <span className="font-medium">4/17/2025</span>
                </div>
              </div>
            </div>

            <div className="bg-refos-window/50 p-6 rounded-md">
              <h3 className="text-md font-semibold mb-4">System Specifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Processor</span>
                  <span className="font-medium">Virtual CPU @ 3.2GHz</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">RAM</span>
                  <span className="font-medium">16GB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">System Type</span>
                  <span className="font-medium">64-bit operating system</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'display' && activeTab !== 'about' && (
          <div className="flex items-center justify-center h-64">
            <div className="text-white/60 text-center">
              <p className="mb-2">This settings section is not implemented yet.</p>
              <p>Coming soon in the next update!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
