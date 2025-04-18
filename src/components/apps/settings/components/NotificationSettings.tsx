
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Volume2 } from 'lucide-react';
import { SettingsState } from '../hooks/useSettings';

interface NotificationSettingsProps {
  notifications: SettingsState['notifications'];
  volume: SettingsState['volume'];
  onNotificationsChange: (checked: boolean) => void;
  onVolumeChange: (value: number) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  notifications,
  volume,
  onNotificationsChange,
  onVolumeChange,
}) => {
  return (
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
              onCheckedChange={onNotificationsChange}
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
  );
};

export default NotificationSettings;
