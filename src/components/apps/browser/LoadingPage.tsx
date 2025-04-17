
import React from 'react';
import { Globe } from 'lucide-react';

const LoadingPage: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center bg-refos-window">
      <div className="flex flex-col items-center">
        <div className="animate-spin mb-4">
          <Globe size={32} className="text-refos-primary" />
        </div>
        <p className="text-white/60">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
