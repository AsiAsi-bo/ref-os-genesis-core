
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const PersonalizationStep: React.FC = () => {
  const [theme, setTheme] = useState("dark");
  const [showIcons, setShowIcons] = useState(true);
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-refos-primary">Personalize Your Experience</h3>
      <p className="text-white/80">
        Customize how Ref OS looks and behaves to make it your own.
      </p>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-medium mb-2">Select a theme</h4>
          <RadioGroup defaultValue={theme} onValueChange={setTheme} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="cursor-pointer">Dark theme (recommended)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="cursor-pointer">Light theme</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system" className="cursor-pointer">Use system theme</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="pt-4">
          <h4 className="text-lg font-medium mb-2">Desktop options</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="show-icons" 
                checked={showIcons}
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setShowIcons(checked);
                  }
                }}
              />
              <Label htmlFor="show-icons" className="cursor-pointer">Show desktop icons</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="show-recent" />
              <Label htmlFor="show-recent" className="cursor-pointer">Show recently used files</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="show-notifications" defaultChecked />
              <Label htmlFor="show-notifications" className="cursor-pointer">Show notifications</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationStep;
