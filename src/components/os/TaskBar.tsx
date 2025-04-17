
import React from 'react';
import { useOS, AppName } from '@/context/OSContext';
import { Button } from '@/components/ui/button';
import { Folder, FileText, Calculator, Settings, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

const TaskBar: React.FC = () => {
  const { apps, startMenuOpen, activeAppId, openApp, focusApp, restoreApp, toggleStartMenu } = useOS();
  
  const getAppIcon = (iconName: string) => {
    switch (iconName) {
      case 'folder': return <Folder size={20} />;
      case 'file-text': return <FileText size={20} />;
      case 'calculator': return <Calculator size={20} />;
      case 'settings': return <Settings size={20} />;
      default: return <Monitor size={20} />;
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [time, setTime] = React.useState(getCurrentTime());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleAppClick = (appId: string, isMinimized: boolean) => {
    if (isMinimized) {
      restoreApp(appId);
    } else {
      focusApp(appId);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-refos-taskbar flex items-center px-2 shadow-lg z-[9999]">
      {/* Start button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className={cn(
          "h-10 w-10 rounded-full mr-2",
          startMenuOpen ? "bg-refos-primary text-white" : "hover:bg-white/10 text-white"
        )}
        onClick={toggleStartMenu}
      >
        <span className="sr-only">Start</span>
        <Monitor size={24} />
      </Button>

      {/* Divider */}
      <div className="h-8 w-px bg-white/10 mr-2"></div>

      {/* Running apps */}
      <div className="flex-1 flex items-center space-x-1 overflow-x-auto">
        {apps.map(app => (
          <Button
            key={app.id}
            variant="ghost"
            size="sm"
            className={cn(
              "h-10 rounded-md px-3 text-white",
              activeAppId === app.id ? "bg-white/20" : "hover:bg-white/10",
              app.isMinimized && "opacity-60"
            )}
            onClick={() => handleAppClick(app.id, app.isMinimized)}
          >
            {getAppIcon(app.icon)}
            <span className="ml-2 max-w-[100px] truncate">{app.title}</span>
          </Button>
        ))}
      </div>

      {/* System tray */}
      <div className="flex items-center space-x-3 ml-2 px-3 h-full border-l border-white/10">
        <div className="text-white/90 text-sm font-medium">{time}</div>
      </div>
    </div>
  );
};

export default TaskBar;
