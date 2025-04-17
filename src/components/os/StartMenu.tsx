
import React, { useEffect, useRef } from 'react';
import { useOS, AppName } from '@/context/OSContext';
import { 
  Folder, 
  FileText, 
  Calculator, 
  Settings,
  User,
  Power
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
