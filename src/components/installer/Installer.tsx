
import React, { useEffect, useState, useRef } from 'react';
import { useInstaller } from '@/context/InstallerContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, Check, Download, HardDrive, Folder, FileCode, Settings, Shield, Monitor } from 'lucide-react';

const installationSteps = [
  { phase: 'Preparing installation', items: ['Checking system requirements...', 'Allocating disk space...', 'Creating partition table...'] },
  { phase: 'Copying system files', items: ['Copying kernel files...', 'Installing boot loader...', 'Setting up system directories...', 'Copying /system/core/*...', 'Copying /system/drivers/*...'] },
  { phase: 'Installing core components', items: ['Installing Desktop Environment...', 'Installing Window Manager...', 'Installing Task Bar...', 'Installing Start Menu...', 'Installing File System...'] },
  { phase: 'Installing applications', items: ['Installing Browser...', 'Installing File Explorer...', 'Installing Notepad...', 'Installing Calculator...', 'Installing Calendar...', 'Installing Weather...', 'Installing Terminal...', 'Installing Settings...', 'Installing RefGames...', 'Installing RefMovies...', 'Installing RefMail...', 'Installing Ref Store...', 'Installing Task Manager...', 'Installing Refy Assistant...'] },
  { phase: 'Configuring system', items: ['Setting up user profiles...', 'Configuring network settings...', 'Applying default theme...', 'Registering components...', 'Building app cache...'] },
  { phase: 'Finalizing installation', items: ['Cleaning up temporary files...', 'Optimizing system performance...', 'Verifying installation integrity...', 'Completing setup...'] }
];

const Installer: React.FC = () => {
  const { isInstalling, installProgress, installComplete, startInstallation, completeInstallation, setProgress } = useInstaller();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [installLog, setInstallLog] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  
  const totalItems = installationSteps.reduce((acc, step) => acc + step.items.length, 0);
  
  useEffect(() => {
    if (isInstalling && installProgress < 100) {
      const interval = setInterval(() => {
        // Calculate which phase and item we're on based on progress
        let itemIndex = Math.floor((installProgress / 100) * totalItems);
        let phase = 0;
        let item = 0;
        let count = 0;
        
        for (let p = 0; p < installationSteps.length; p++) {
          if (count + installationSteps[p].items.length > itemIndex) {
            phase = p;
            item = itemIndex - count;
            break;
          }
          count += installationSteps[p].items.length;
        }
        
        setCurrentPhase(phase);
        setCurrentItem(item);
        
        // Add to log
        const step = installationSteps[phase];
        if (step && step.items[item]) {
          const logEntry = `[${step.phase}] ${step.items[item]}`;
          setInstallLog(prev => {
            if (prev[prev.length - 1] !== logEntry) {
              return [...prev, logEntry];
            }
            return prev;
          });
        }
        
        if (installProgress < 100) {
          setProgress(installProgress + 1);
        } else {
          clearInterval(interval);
          setInstallLog(prev => [...prev, '[COMPLETE] Ref OS installed successfully!']);
          setTimeout(() => {
            completeInstallation();
          }, 500);
        }
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [isInstalling, installProgress, setProgress, completeInstallation, totalItems]);

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [installLog]);

  if (installComplete) {
    return null;
  }

  const getPhaseIcon = (phase: number) => {
    const icons = [HardDrive, Folder, Monitor, FileCode, Settings, Shield];
    const Icon = icons[phase] || HardDrive;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <Dialog open={!installComplete} modal>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-refos-window border-refos-primary/20 text-white">
        <div className="flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-refos-primary p-4">
            <h2 className="text-xl font-semibold">Ref OS Installer</h2>
            <p className="text-sm text-white/80">
              {isInstalling ? 'Installation in progress...' : 'Welcome to the Ref OS installation process'}
            </p>
          </div>
          
          {/* Content with ScrollArea */}
          <ScrollArea className="flex-1 p-6">
            {!isInstalling ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center">
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
                    <p className="text-white/90">Components to install:</p>
                    <ul className="list-disc list-inside mt-1 text-white/70 space-y-1">
                      <li>Ref OS Core System (2.4 GB)</li>
                      <li>Desktop Environment (512 MB)</li>
                      <li>Built-in Applications (1.1 GB)</li>
                      <li>Drivers & Utilities (384 MB)</li>
                      <li>System Configuration (128 MB)</li>
                    </ul>
                    <p className="mt-2 text-white/60">Total: ~4.5 GB</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Phase indicators */}
                <div className="grid grid-cols-6 gap-1">
                  {installationSteps.map((step, idx) => (
                    <div 
                      key={idx}
                      className={`flex flex-col items-center p-2 rounded text-xs ${
                        idx < currentPhase ? 'bg-green-500/20 text-green-400' :
                        idx === currentPhase ? 'bg-refos-primary/30 text-refos-primary' :
                        'bg-white/5 text-white/40'
                      }`}
                    >
                      {getPhaseIcon(idx)}
                      <span className="mt-1 text-center leading-tight">{step.phase.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>

                {/* Current action */}
                <div className="flex items-center gap-3 p-3 bg-refos-primary/20 rounded border border-refos-primary/30">
                  <Download className={`h-5 w-5 text-refos-primary ${installProgress < 100 ? 'animate-pulse' : ''}`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {installProgress < 100 ? installationSteps[currentPhase]?.phase : 'Installation Complete!'}
                    </p>
                    <p className="text-xs text-white/60">
                      {installProgress < 100 
                        ? installationSteps[currentPhase]?.items[currentItem] 
                        : 'Ref OS has been successfully installed.'}
                    </p>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div>
                  <Progress value={installProgress} className="h-3 bg-white/10" />
                  <div className="flex justify-between text-xs text-white/60 mt-1">
                    <span>Installing files...</span>
                    <span>{installProgress}%</span>
                  </div>
                </div>

                {/* Installation log */}
                <div className="mt-2">
                  <p className="text-xs text-white/60 mb-1">Installation Log:</p>
                  <div 
                    ref={logRef}
                    className="h-32 bg-black/40 rounded p-2 font-mono text-xs overflow-y-auto border border-white/10"
                  >
                    {installLog.map((log, idx) => (
                      <div 
                        key={idx} 
                        className={`${
                          log.includes('[COMPLETE]') ? 'text-green-400' :
                          log.includes('Installing') ? 'text-blue-400' :
                          log.includes('Copying') ? 'text-yellow-400' :
                          'text-white/70'
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                    {installProgress < 100 && (
                      <span className="animate-pulse">█</span>
                    )}
                  </div>
                </div>
                
                {installProgress === 100 && (
                  <div className="flex items-center justify-center gap-2 p-3 bg-green-500/20 rounded border border-green-500/30">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="text-green-400 font-medium">All components installed successfully!</span>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
          
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
                    ? `Installing... Phase ${currentPhase + 1} of ${installationSteps.length}` 
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
