import React from 'react';
import { useOS, AppName } from '@/context/OSContext';
import { 
  Folder, 
  FileText, 
  Calculator, 
  Settings,
  Cloud,
  Calendar,
  Globe,
  Terminal,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Desktop: React.FC = () => {
  const { openApp } = useOS();

  // Define desktop shortcuts
  const shortcuts: { name: AppName; title: string; icon: React.ReactNode }[] = [
    { name: 'fileExplorer', title: 'File Explorer', icon: <Folder size={24} /> },
    { name: 'notepad', title: 'Notepad', icon: <FileText size={24} /> },
    { name: 'calculator', title: 'Calculator', icon: <Calculator size={24} /> },
    { name: 'weather', title: 'Weather', icon: <Cloud size={24} /> },
    { name: 'calendar', title: 'Calendar', icon: <Calendar size={24} /> },
    { name: 'browser', title: 'Web Browser', icon: <Globe size={24} /> },
    { name: 'terminal', title: 'Terminal', icon: <Terminal size={24} /> },
    { name: 'movie', title: 'RefMovies', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
    { name: 'refy', title: 'Refy Assistant', icon: <Bot size={24} /> },
    { name: 'game', title: 'RefGames', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> },
    { name: 'settings', title: 'Settings', icon: <Settings size={24} /> }
  ];

  const handleShortcutClick = (appName: AppName) => {
    openApp(appName);
  };

  return (
    <div className="h-full p-4 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] auto-rows-[80px] gap-4 content-start">
      {shortcuts.map((shortcut) => (
        <button
          key={shortcut.name}
          className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-white/10 focus:bg-white/10 focus:outline-none transition-colors group"
          onClick={() => handleShortcutClick(shortcut.name)}
        >
          <div className="w-10 h-10 flex items-center justify-center text-white group-hover:text-refos-primary transition-colors">
            {shortcut.icon}
          </div>
          <div className="mt-1 text-white text-xs text-center w-full truncate">
            {shortcut.title}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Desktop;
