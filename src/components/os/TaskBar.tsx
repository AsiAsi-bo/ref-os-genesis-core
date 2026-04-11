
import React, { useState, useEffect } from 'react';
import { useOS } from '@/context/OSContext';
import { Menu, Wifi, Battery, Volume2, Bell, Search } from 'lucide-react';
import NotificationCenter from './NotificationCenter';

const TaskBar: React.FC = () => {
  const { apps, toggleStartMenu, focusApp, restoreApp } = useOS();
  const [notifOpen, setNotifOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const visibleApps = apps.filter(app => app.isOpen);
  const currentTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  const handleAppClick = (app: any) => {
    if (app.isMinimized) restoreApp(app.id);
    else focusApp(app.id);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-2 px-4 pointer-events-none">
        {/* Dock container */}
        <div className="glass rounded-2xl flex items-center gap-1 px-2 py-1.5 pointer-events-auto">
          {/* Start / Launchpad */}
          <button
            onClick={toggleStartMenu}
            className="dock-item w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-refos-primary to-refos-secondary text-white hover:scale-110 active:scale-95 transition-transform"
          >
            <Menu size={20} />
          </button>

          {/* Search */}
          <button
            onClick={toggleStartMenu}
            className="dock-item w-11 h-11 rounded-xl flex items-center justify-center bg-white/10 dark:bg-white/5 text-white/70 hover:scale-110 hover:bg-white/20 active:scale-95 transition-all"
          >
            <Search size={18} />
          </button>

          {/* Divider */}
          {visibleApps.length > 0 && (
            <div className="w-px h-8 bg-white/15 mx-1" />
          )}

          {/* Running Apps */}
          {visibleApps.map(app => (
            <button
              key={app.id}
              onClick={() => handleAppClick(app)}
              className={`dock-item w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs font-medium hover:scale-110 active:scale-95 transition-all relative ${
                app.isMinimized ? 'opacity-50 bg-white/5' : 'bg-white/10'
              }`}
              title={app.title}
            >
              <span className="truncate px-1 text-[10px]">{app.title.slice(0, 3)}</span>
              {/* Active indicator dot */}
              <div className={`absolute -bottom-0.5 w-1 h-1 rounded-full ${app.isMinimized ? 'bg-white/30' : 'bg-white'}`} />
            </button>
          ))}

          {/* Divider */}
          <div className="w-px h-8 bg-white/15 mx-1" />

          {/* System Tray */}
          <div className="flex items-center gap-0.5">
            <button className="dock-item w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
              <Wifi size={15} />
            </button>
            <button className="dock-item w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
              <Volume2 size={15} />
            </button>
            <button className="dock-item w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
              <Battery size={15} />
            </button>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="dock-item w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all relative"
            >
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-white/15 mx-1" />

          {/* Clock */}
          <div className="flex flex-col items-center px-2 leading-tight select-none">
            <span className="text-[11px] font-semibold text-white/90">{currentTime}</span>
            <span className="text-[9px] text-white/50">{currentDate}</span>
          </div>
        </div>
      </div>

      <NotificationCenter isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
};

export default TaskBar;
