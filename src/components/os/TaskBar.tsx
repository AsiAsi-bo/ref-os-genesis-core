
import React from 'react';
import { useOS } from '@/context/OSContext';
import { Button } from '@/components/ui/button';
import { Menu, Clock, Wifi, Battery, Volume2 } from 'lucide-react';
import VRControls from '../vr/VRControls';

const TaskBar: React.FC = () => {
  const { apps, toggleStartMenu, focusApp, restoreApp } = useOS();
  
  const visibleApps = apps.filter(app => app.isOpen);
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleAppClick = (app: any) => {
    if (app.isMinimized) {
      restoreApp(app.id);
    } else {
      focusApp(app.id);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-refos-taskbar border-t border-white/10 flex items-center px-2 z-50">
      {/* Start Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleStartMenu}
        className="text-white hover:bg-white/20 mr-2"
      >
        <Menu size={20} />
      </Button>

      {/* Running Apps */}
      <div className="flex-1 flex items-center space-x-1 overflow-x-auto">
        {visibleApps.map(app => (
          <Button
            key={app.id}
            variant="ghost"
            size="sm"
            onClick={() => handleAppClick(app)}
            className={`text-white hover:bg-white/20 min-w-0 max-w-40 ${
              app.isMinimized ? 'opacity-50' : ''
            }`}
          >
            <span className="truncate">{app.title}</span>
          </Button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-2 text-white">
        {/* VR Controls */}
        <VRControls />
        
        {/* System Icons */}
        <Wifi size={16} />
        <Volume2 size={16} />
        <Battery size={16} />
        
        {/* Clock */}
        <div className="flex items-center space-x-1">
          <Clock size={16} />
          <span className="text-sm">{currentTime}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskBar;
