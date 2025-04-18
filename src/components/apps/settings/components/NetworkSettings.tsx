
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff } from 'lucide-react';
import { SettingsState } from '../hooks/useSettings';

interface NetworkSettingsProps {
  wifi: SettingsState['wifi'];
  onWifiChange: (checked: boolean) => void;
}

const NetworkSettings: React.FC<NetworkSettingsProps> = ({
  wifi,
  onWifiChange,
}) => {
  return (
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
              onCheckedChange={onWifiChange}
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
  );
};

export default NetworkSettings;
