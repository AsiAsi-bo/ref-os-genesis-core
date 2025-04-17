
import React from 'react';

const FinalStep: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-refos-primary">Ready to Go!</h3>
      <p>
        Setup is complete, and Ref OS is now ready to use. Your personal settings have been configured according to your preferences.
      </p>
      
      <div className="flex justify-center py-8">
        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-green-500/40 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-white/80">
        Here's a quick overview of what you can do next:
      </p>
      <ul className="list-disc list-inside space-y-1 text-white/80">
        <li>Explore the desktop and available applications</li>
        <li>Open File Explorer to browse your virtual files</li>
        <li>Use Notepad to create and edit documents</li>
        <li>Access Settings to further customize your experience</li>
      </ul>
      
      <p className="text-white/80 pt-2">
        Click "Finish" to start using Ref OS and gain access to all features.
      </p>
    </div>
  );
};

export default FinalStep;
