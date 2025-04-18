
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Lock, Unlock } from 'lucide-react';
import { SettingsState } from '../hooks/useSettings';

interface PrivacySettingsProps {
  privacy: SettingsState['privacy'];
  onPrivacyChange: (checked: boolean) => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({
  privacy,
  onPrivacyChange,
}) => {
  return (
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
              onCheckedChange={onPrivacyChange}
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
  );
};

export default PrivacySettings;
