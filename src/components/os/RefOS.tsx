import React, { useRef, useState, useCallback } from 'react';
import { useTouchGestures } from '@/hooks/useTouchGestures';
import { OSProvider, useOS, AppName } from '@/context/OSContext';
import { OOBEProvider, useOOBE } from '@/context/OOBEContext';
import { InstallerProvider, useInstaller } from '@/context/InstallerContext';
import { BootProvider, useBoot } from '@/context/BootContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Desktop from './Desktop';
import TaskBar from './TaskBar';
import StartMenu from './StartMenu';
import DraggableWindow from './DraggableWindow';
import FileExplorer from '../apps/FileExplorer';
import Notepad from '../apps/Notepad';
import Calculator from '../apps/Calculator';
import Settings from '../apps/settings/Settings';
import Weather from '../apps/Weather';
import Calendar from '../apps/Calendar';
import Browser from '../apps/Browser';
import Terminal from '../apps/Terminal';
import Refy from '../apps/Refy';
import Movie from '../apps/Movie';
import Game from '../apps/Game';
import Email from '../apps/Email';
import Store from '../apps/Store';
import TaskManager from '../apps/TaskManager';
import UpdateCenter from '../apps/UpdateCenter';
import MusicPlayer from '../apps/MusicPlayer';
import Photos from '../apps/Photos';
import Paint from '../apps/Paint';
import OOBE from '../oobe/OOBE';
import Installer from '../installer/Installer';
import BootScreen from '../boot/BootScreen';
import BIOSScreen from '../boot/BIOSScreen';

const RefOSContent: React.FC = () => {
  const { apps, toggleStartMenu } = useOS();
  const { isCompleted } = useOOBE();
  const { installComplete } = useInstaller();
  const { bootPhase, completeBIOS, completeBootSequence } = useBoot();
  const [notifFromGesture, setNotifFromGesture] = useState(false);
  const osRef = useRef<HTMLDivElement>(null);

  const handleSwipeUp = useCallback(() => toggleStartMenu(), [toggleStartMenu]);
  const handleSwipeDown = useCallback(() => setNotifFromGesture(prev => !prev), []);

  useTouchGestures(osRef, {
    onSwipeUp: handleSwipeUp,
    onSwipeDown: handleSwipeDown,
  });

  if (bootPhase === 'bios') {
    return <BIOSScreen onBIOSComplete={completeBIOS} />;
  }

  if (bootPhase === 'booting') {
    return <BootScreen onBootComplete={completeBootSequence} />;
  }

  // Don't render the OS until both installation and OOBE are completed
  const shouldShowOS = installComplete && isCompleted;

  const renderApp = (appName: AppName) => {
    switch (appName) {
      case 'fileExplorer':
        return <FileExplorer />;
      case 'notepad':
        return <Notepad />;
      case 'calculator':
        return <Calculator />;
      case 'settings':
        return <Settings />;
      case 'weather':
        return <Weather />;
      case 'calendar':
        return <Calendar />;
      case 'browser':
        return <Browser />;
      case 'terminal':
        return <Terminal />;
      case 'refy':
        return <Refy />;
      case 'movie':
        return <Movie />;
      case 'game':
        return <Game />;
      case 'email':
        return <Email />;
      case 'store':
        return <Store />;
      case 'taskmanager':
        return <TaskManager />;
      case 'updatecenter':
        return <UpdateCenter />;
      case 'music':
        return <MusicPlayer />;
      case 'photos':
        return <Photos />;
      case 'paint':
        return <Paint />;
      default:
        return <div className="p-4">App not found</div>;
    }
  };

  if (!installComplete) {
    return <Installer />;
  }

  return (
    <div ref={osRef} className="h-screen w-screen overflow-hidden bg-gradient-to-br from-refos-desktop to-refos-desktop/90 select-none touch-none">
      {/* OOBE */}
      <OOBE />

      {/* Only render desktop components if setup is complete */}
      {shouldShowOS && (
        <>
          {/* Desktop */}
          <div className="absolute inset-0 bottom-12">
            <Desktop />
          </div>

          {/* App Windows */}
          {apps.map(app => (
            <DraggableWindow key={app.id} app={app}>
              {renderApp(app.name)}
            </DraggableWindow>
          ))}

          {/* Start Menu */}
          <StartMenu />

          {/* TaskBar */}
          <TaskBar />
        </>
      )}
    </div>
  );
};

const RefOS: React.FC = () => {
  return (
    <ThemeProvider>
      <BootProvider>
        <InstallerProvider>
          <OOBEProvider>
            <OSProvider>
              <RefOSContent />
            </OSProvider>
          </OOBEProvider>
        </InstallerProvider>
      </BootProvider>
    </ThemeProvider>
  );
};

export default RefOS;
