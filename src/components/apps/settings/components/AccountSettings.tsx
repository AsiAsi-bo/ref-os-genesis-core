
import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { SettingsState } from '../hooks/useSettings';

interface AccountSettingsProps {
  username: SettingsState['username'];
  onUsernameChange: (value: string) => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  username,
  onUsernameChange,
}) => {
  return (
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
                onChange={(e) => onUsernameChange(e.target.value)}
                className="bg-refos-window/70 px-3 py-2 rounded-md outline-none focus:ring-2 ring-refos-primary"
              />
              <p className="text-sm text-white/60 mt-1">Local Account</p>
            </div>
          </div>
        </div>
      </div>
      <Button className="bg-refos-primary hover:bg-refos-primary/80">Save Changes</Button>
    </div>
  );
};

export default AccountSettings;
