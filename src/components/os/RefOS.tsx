
import React from 'react';
import { OSProvider, useOS, AppName } from '@/context/OSContext';
import Desktop from './Desktop';
import TaskBar from './TaskBar';
import StartMenu from './StartMenu';
import DraggableWindow from './DraggableWindow';
import FileExplorer from '../apps/FileExplorer';
import Notepad from '../apps/Notepad';
import Calculator from '../apps/Calculator';
import Settings from '../apps/Settings';

const RefOSContent: React.FC = () => {
  const { apps } = useOS();

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
      default:
        return <div className="p-4">App not found</div>;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-refos-desktop to-refos-desktop/90 select-none">
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
    </div>
  );
};

const RefOS: React.FC = () => {
  return (
    <OSProvider>
      <RefOSContent />
    </OSProvider>
  );
};

export default RefOS;
