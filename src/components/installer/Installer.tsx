
import React, { useEffect } from 'react';
import { useInstaller } from '@/context/InstallerContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, Download, HardDrive } from 'lucide-react';

const Installer: React.FC = () => {
  const { isInstalling, installProgress, installComplete, startInstallation, completeInstallation, setProgress } = useInstaller();
  
  useEffect(() => {
    if (isInstalling && installProgress < 100) {
      const interval = setInterval(() => {
        if (installProgress < 100) {
          setProgress(installProgress + 1);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            completeInstallation();
          }, 500);
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isInstalling, installProgress, setProgress, completeInstallation]);

  if (installComplete) {
    return null;
  }

  return (
    <Dialog open={!installComplete} modal>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-refos-window border-refos-primary/20 text-white">
        <div className="flex flex-col h-[400px]">
          {/* Header */}
          <div className="bg-refos-primary p-4">
            <h2 className="text-xl font-semibold">Ref OS Installer</h2>
            <p className="text-sm text-white/80">
              Welcome to the Ref OS installation process
            </p>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            {!isInstalling ? (
              <div className="space-y-6 flex-1 flex flex-col">
                <div className="flex items-center justify-center flex-1">
                  <div className="w-24 h-24 bg-refos-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-refos-primary/40 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 bg-refos-primary rounded-full flex items-center justify-center">
                        <HardDrive className="text-white h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Ready to Install Ref OS</h3>
                  <p className="text-white/80">
                    Ref OS will now be installed on your virtual device. This process will set up all necessary components and prepare your system for first use.
                  </p>
                  <div className="p-3 bg-refos-primary/10 rounded border border-refos-primary/20 text-sm">
                    <p className="text-white/90">System Requirements:</p>
                    <ul className="list-disc list-inside mt-1 text-white/70 space-y-1">
                      <li>Modern web browser</li>
                      <li>Internet connection</li>
                      <li>No additional hardware required</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 flex-1 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <Download className={`h-16 w-16 text-refos-primary ${installProgress < 100 ? 'animate-bounce' : ''}`} />
                  <h3 className="text-lg font-medium mt-4">
                    {installProgress < 100 ? 'Installing Ref OS...' : 'Installation Complete!'}
                  </h3>
                  <p className="text-white/70 text-sm mt-2">
                    {installProgress < 100 
                      ? 'Please do not close this window during installation.' 
                      : 'Ref OS has been successfully installed.'}
                  </p>
                  
                  <div className="w-full mt-8">
                    <Progress value={installProgress} className="h-2 bg-white/10" />
                    <p className="text-right text-sm text-white/60 mt-1">{installProgress}%</p>
                  </div>
                  
                  {installProgress === 100 && (
                    <div className="mt-4 flex items-center justify-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-white/10 flex justify-between items-center bg-refos-window/80">
            {!isInstalling ? (
              <>
                <div className="text-sm text-white/70">
                  Click Install to begin
                </div>
                <Button 
                  onClick={startInstallation} 
                  className="bg-refos-primary hover:bg-refos-primary/80"
                >
                  Install <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <div className="text-sm text-white/70">
                  {installProgress < 100 
                    ? 'Installation in progress...' 
                    : 'Ready to launch Ref OS'}
                </div>
                {installProgress === 100 && (
                  <Button 
                    onClick={completeInstallation} 
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Launch Ref OS
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Installer;
