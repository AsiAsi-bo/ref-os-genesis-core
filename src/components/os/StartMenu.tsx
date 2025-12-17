import React, { useEffect, useRef } from 'react';
import { useOS, AppName } from '@/context/OSContext';
import { 
  Folder, 
  FileText, 
  Calculator, 
  Settings,
  User,
  Power,
  Cloud,
  Calendar,
  Globe,
  Terminal,
  Bot,
  Store,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

const StartMenu: React.FC = () => {
  const { startMenuOpen, openApp, closeStartMenu } = useOS();
  const menuRef = useRef<HTMLDivElement>(null);

  // Define app shortcuts
  const apps: { name: AppName; title: string; icon: React.ReactNode; description: string }[] = [
    { 
      name: 'fileExplorer', 
      title: 'File Explorer', 
      icon: <Folder size={24} className="text-blue-400" />,
      description: 'Browse and manage your files'
    },
    { 
      name: 'notepad', 
      title: 'Notepad', 
      icon: <FileText size={24} className="text-yellow-400" />,
      description: 'Create and edit text documents'
    },
    { 
      name: 'calculator', 
      title: 'Calculator', 
      icon: <Calculator size={24} className="text-green-400" />,
      description: 'Perform calculations'
    },
    { 
      name: 'weather', 
      title: 'Weather', 
      icon: <Cloud size={24} className="text-blue-300" />,
      description: 'Check current weather conditions'
    },
    { 
      name: 'calendar', 
      title: 'Calendar', 
      icon: <Calendar size={24} className="text-orange-300" />,
      description: 'Manage your schedule and events'
    },
    { 
      name: 'browser', 
      title: 'Web Browser', 
      icon: <Globe size={24} className="text-blue-500" />,
      description: 'Browse the web'
    },
    { 
      name: 'terminal', 
      title: 'Terminal', 
      icon: <Terminal size={24} className="text-white" />,
      description: 'Command line interface'
    },
    { 
      name: 'movie', 
      title: 'RefMovies', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-red-500"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
      description: 'Watch movies and videos'
    },
    { 
      name: 'refy', 
      title: 'Refy Assistant', 
      icon: <Bot size={24} className="text-purple-400" />,
      description: 'Your virtual assistant'
    },
    { 
      name: 'game', 
      title: 'RefGames', 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
      description: 'Play games and build your own'
    },
    { 
      name: 'store', 
      title: 'Ref Store', 
      icon: <Store size={24} className="text-cyan-400" />,
      description: 'Download ready-made software'
    },
    { 
      name: 'taskmanager', 
      title: 'Task Manager', 
      icon: <Activity size={24} className="text-orange-400" />,
      description: 'Monitor running processes'
    },
    { 
      name: 'settings', 
      title: 'Settings', 
      icon: <Settings size={24} className="text-gray-400" />,
      description: 'Configure system settings'
    }
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeStartMenu();
      }
    };

    if (startMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [startMenuOpen, closeStartMenu]);

  if (!startMenuOpen) return null;

  return (
    <div 
      ref={menuRef}
      className={cn(
        "fixed bottom-12 left-0 w-[320px] bg-refos-taskbar/95 backdrop-blur-sm",
        "rounded-t-lg shadow-xl border border-white/10 z-[10000]",
        "flex flex-col animate-window-open origin-bottom-left"
      )}
    >
      {/* User area */}
      <div className="flex items-center p-4 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-refos-primary flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>
        <div className="ml-3">
          <div className="text-white font-medium">User</div>
          <div className="text-white/60 text-sm">user@refos</div>
        </div>
      </div>

      {/* Apps list */}
      <div className="flex-1 p-2 overflow-y-auto max-h-[400px]">
        <div className="text-white/60 text-xs font-medium px-2 py-1">APPLICATIONS</div>
        <div className="grid grid-cols-1 gap-1">
          {apps.map((app) => (
            <button
              key={app.name}
              className="flex items-center p-2 rounded-md hover:bg-white/10 text-left w-full transition-colors"
              onClick={() => openApp(app.name)}
            >
              <div className="w-8 h-8 flex items-center justify-center">{app.icon}</div>
              <div className="ml-2">
                <div className="text-white font-medium">{app.title}</div>
                <div className="text-white/60 text-xs">{app.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Power options */}
      <div className="p-2 border-t border-white/10">
        <button className="flex items-center p-2 rounded-md hover:bg-white/10 text-left w-full transition-colors">
          <div className="w-8 h-8 flex items-center justify-center">
            <Power size={20} className="text-red-400" />
          </div>
          <div className="ml-2 text-white font-medium">Power</div>
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
