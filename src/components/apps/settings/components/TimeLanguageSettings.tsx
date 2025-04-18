
import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages, Globe } from 'lucide-react';
import { SettingsState } from '../hooks/useSettings';

interface TimeLanguageSettingsProps {
  language: SettingsState['language'];
  onLanguageChange: (value: string) => void;
}

const TimeLanguageSettings: React.FC<TimeLanguageSettingsProps> = ({
  language,
  onLanguageChange,
}) => {
  return (
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
              onChange={(e) => onLanguageChange(e.target.value)}
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
  );
};

export default TimeLanguageSettings;
