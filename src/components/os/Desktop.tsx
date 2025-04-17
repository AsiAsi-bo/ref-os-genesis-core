
import React from 'react';
import { useOS, AppName } from '@/context/OSContext';
import { 
  Folder, 
  FileText, 
  Calculator, 
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Desktop: React.FC = () => {
  const { openApp } = useOS();

  // Define desktop shortcuts
  const shortcuts: { name: AppName; title: string; icon: React.ReactNode }[] = [
    { name: 'fileExplorer', title: 'File Explorer', icon: <Folder size={24} /> },
    { name: 'notepad', title: 'Notepad', icon: <FileText size={24} /> },
    { name: 'calculator', title: 'Calculator', icon: <Calculator size={24} /> },
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
