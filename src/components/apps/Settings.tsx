
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Monitor, 
  User, 
  Bell, 
  Shield, 
  Wifi, 
  Palette,
  Clock, 
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('display');

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

        {/* Placeholder content for other tabs */}
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
