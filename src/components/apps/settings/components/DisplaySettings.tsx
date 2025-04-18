
import React from 'react';
import { Button } from '@/components/ui/button';

const DisplaySettings = () => {
  return (
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
  );
};

export default DisplaySettings;
