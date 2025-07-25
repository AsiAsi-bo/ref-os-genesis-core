import React from 'react';
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
import OOBE from '../oobe/OOBE';
import Installer from '../installer/Installer';
import BootScreen from '../boot/BootScreen';

const RefOSContent: React.FC = () => {
  const { apps } = useOS();
  const { isCompleted } = useOOBE();
  const { installComplete } = useInstaller();
  const { bootComplete, completeBootSequence } = useBoot();

  // Don't render anything until boot is completed
  if (!bootComplete) {
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
      default:
        return <div className="p-4">App not found</div>;
    }
  };

  if (!installComplete) {
    return <Installer />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-refos-desktop to-refos-desktop/90 select-none">
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
