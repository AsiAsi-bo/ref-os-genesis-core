
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { SettingsState } from '../hooks/useSettings';

interface PersonalizationSettingsProps {
  theme: SettingsState['theme'];
  onThemeChange: (checked: boolean) => void;
}

const PersonalizationSettings: React.FC<PersonalizationSettingsProps> = ({
  theme,
  onThemeChange,
}) => {
  return (
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
              onCheckedChange={onThemeChange}
            />
          </div>
        </div>
      </div>
      <Button className="bg-refos-primary hover:bg-refos-primary/80">Apply Changes</Button>
    </div>
  );
};

export default PersonalizationSettings;
