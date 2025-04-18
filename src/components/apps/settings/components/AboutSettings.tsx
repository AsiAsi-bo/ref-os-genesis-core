
import React from 'react';

const AboutSettings = () => {
  return (
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
  );
};

export default AboutSettings;
