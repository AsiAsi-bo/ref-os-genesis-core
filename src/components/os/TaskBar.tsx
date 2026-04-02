
import React, { useState } from 'react';
import { useOS } from '@/context/OSContext';
import { Button } from '@/components/ui/button';
import { Menu, Clock, Wifi, Battery, Volume2, Bell } from 'lucide-react';
import NotificationCenter from './NotificationCenter';

const TaskBar: React.FC = () => {
  const { apps, toggleStartMenu, focusApp, restoreApp } = useOS();
  const [notifOpen, setNotifOpen] = useState(false);
  
  const visibleApps = apps.filter(app => app.isOpen);
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString([], { month: 'short', day: 'numeric' });

  const handleAppClick = (app: any) => {
    if (app.isMinimized) {
      restoreApp(app.id);
    } else {
      focusApp(app.id);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-refos-taskbar/95 backdrop-blur-md border-t border-white/10 flex items-center px-2 z-50">
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
          <Wifi size={16} className="text-white/70" />
          <Volume2 size={16} className="text-white/70" />
          <Battery size={16} className="text-white/70" />
          
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-1.5 rounded hover:bg-white/10 relative"
          >
            <Bell size={16} className="text-white/70" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-refos-taskbar" />
          </button>

          {/* Clock */}
          <div className="flex flex-col items-end ml-1 leading-tight">
            <span className="text-xs font-medium">{currentTime}</span>
            <span className="text-[10px] text-white/50">{currentDate}</span>
          </div>
        </div>
      </div>

      <NotificationCenter isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
};

export default TaskBar;
