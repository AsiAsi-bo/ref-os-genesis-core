
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const PrivacyStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-refos-primary">Privacy Settings</h3>
      <p className="text-white/80">
        Control your data and privacy settings. Customize what information Ref OS can collect and use.
      </p>
      
      <div className="space-y-4 mt-4">
        <div className="flex items-start space-x-2">
          <Checkbox id="diagnostic" className="mt-1" defaultChecked />
          <div>
            <Label htmlFor="diagnostic" className="cursor-pointer">Send diagnostic data</Label>
            <p className="text-sm text-white/60 mt-1">
              Help improve Ref OS by sending anonymous usage and crash data. This information helps us fix issues and improve performance.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox id="personalized" className="mt-1" />
          <div>
            <Label htmlFor="personalized" className="cursor-pointer">Personalized experience</Label>
            <p className="text-sm text-white/60 mt-1">
              Allow Ref OS to use your usage data to personalize your experience with tailored suggestions and features.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox id="location" className="mt-1" />
          <div>
            <Label htmlFor="location" className="cursor-pointer">Location services</Label>
            <p className="text-sm text-white/60 mt-1">
              Allow apps to request access to your location information. You can change this for individual apps later.
            </p>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-white/70 border-t border-white/10 pt-4 mt-6">
        You can change any of these settings later in the Settings app. For more information, see our Privacy Policy.
      </p>
    </div>
  );
};

export default PrivacyStep;
