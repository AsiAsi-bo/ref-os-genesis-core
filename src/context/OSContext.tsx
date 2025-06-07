import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AppName = 'fileExplorer' | 'notepad' | 'calculator' | 'settings' | 'weather' | 'calendar' | 'browser' | 'terminal' | 'refy' | 'movie';

export interface App {
  id: string;
  name: AppName;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface OSContextType {
  apps: App[];
  activeAppId: string | null;
  maxZIndex: number;
  startMenuOpen: boolean;
  openApp: (appName: AppName) => void;
  closeApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  restoreApp: (id: string) => void;
  focusApp: (id: string) => void;
  moveApp: (id: string, position: { x: number; y: number }) => void;
  resizeApp: (id: string, size: { width: number; height: number }) => void;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Default app configurations
const defaultAppConfigs: Record<AppName, Omit<App, 'id' | 'isOpen' | 'isMinimized' | 'zIndex'>> = {
  fileExplorer: {
    name: 'fileExplorer',
    title: 'File Explorer',
    icon: 'folder',
    position: { x: 100, y: 100 },
    size: { width: 600, height: 400 }
  },
  notepad: {
    name: 'notepad',
    title: 'Notepad',
    icon: 'file-text',
    position: { x: 150, y: 150 },
    size: { width: 500, height: 400 }
  },
  calculator: {
    name: 'calculator',
    title: 'Calculator',
    icon: 'calculator',
    position: { x: 200, y: 200 },
    size: { width: 350, height: 450 }
  },
  settings: {
    name: 'settings',
    title: 'Settings',
    icon: 'settings',
    position: { x: 250, y: 250 },
    size: { width: 550, height: 500 }
  },
  weather: {
    name: 'weather',
    title: 'Weather',
    icon: 'cloud',
    position: { x: 300, y: 150 },
    size: { width: 450, height: 400 }
  },
  calendar: {
    name: 'calendar',
    title: 'Calendar',
    icon: 'calendar',
    position: { x: 350, y: 200 },
    size: { width: 550, height: 500 }
  },
  browser: {
    name: 'browser',
    title: 'Web Browser',
    icon: 'globe',
    position: { x: 400, y: 150 },
    size: { width: 700, height: 500 }
  },
  terminal: {
    name: 'terminal',
    title: 'Terminal',
    icon: 'terminal',
    position: { x: 250, y: 300 },
    size: { width: 600, height: 400 }
  },
  refy: {
    name: 'refy',
    title: 'Refy Assistant',
    icon: 'bot',
    position: { x: 450, y: 250 },
    size: { width: 400, height: 550 }
  },
  movie: {
    name: 'movie',
    title: 'RefMovies',
    icon: 'youtube',
    position: { x: 500, y: 200 },
    size: { width: 800, height: 600 }
  }
};

export const OSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apps, setApps] = useState<App[]>([]);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(0);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const openApp = (appName: AppName) => {
    // Check if app is already open
    const existingAppIndex = apps.findIndex(app => app.name === appName && !app.isMinimized);
    if (existingAppIndex >= 0) {
      // Just focus it
      focusApp(apps[existingAppIndex].id);
      return;
    }

    // Check if the app is minimized
    const minimizedAppIndex = apps.findIndex(app => app.name === appName && app.isMinimized);
    if (minimizedAppIndex >= 0) {
      // Restore it
      restoreApp(apps[minimizedAppIndex].id);
      return;
    }

    // Create a new app instance
    const newZIndex = maxZIndex + 1;
    const appConfig = defaultAppConfigs[appName];
    const newApp: App = {
      ...appConfig,
      id: generateId(),
      isOpen: true,
      isMinimized: false,
      zIndex: newZIndex
    };

    setApps([...apps, newApp]);
    setActiveAppId(newApp.id);
    setMaxZIndex(newZIndex);
    closeStartMenu();
  };

  const closeApp = (id: string) => {
    setApps(apps.filter(app => app.id !== id));
    if (activeAppId === id) {
      // Find the next highest z-index app to focus
      const remainingApps = apps.filter(app => app.id !== id && !app.isMinimized);
      if (remainingApps.length > 0) {
        const nextActiveApp = remainingApps.reduce((highest, app) => 
          app.zIndex > highest.zIndex ? app : highest, remainingApps[0]);
        setActiveAppId(nextActiveApp.id);
      } else {
        setActiveAppId(null);
      }
    }
  };

  const minimizeApp = (id: string) => {
    setApps(apps.map(app => 
      app.id === id ? { ...app, isMinimized: true } : app
    ));
    
    // Focus the next app if needed
    if (activeAppId === id) {
      const visibleApps = apps.filter(app => app.id !== id && !app.isMinimized);
      if (visibleApps.length > 0) {
        const nextActiveApp = visibleApps.reduce((highest, app) => 
          app.zIndex > highest.zIndex ? app : highest, visibleApps[0]);
        setActiveAppId(nextActiveApp.id);
      } else {
        setActiveAppId(null);
      }
    }
  };

  const restoreApp = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setApps(apps.map(app => 
      app.id === id 
        ? { ...app, isMinimized: false, zIndex: newZIndex } 
        : app
    ));
    setActiveAppId(id);
    setMaxZIndex(newZIndex);
  };

  const focusApp = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setApps(apps.map(app => 
      app.id === id 
        ? { ...app, zIndex: newZIndex } 
        : app
    ));
    setActiveAppId(id);
    setMaxZIndex(newZIndex);
  };

  const moveApp = (id: string, position: { x: number; y: number }) => {
    setApps(apps.map(app => 
      app.id === id ? { ...app, position } : app
    ));
  };

  const resizeApp = (id: string, size: { width: number; height: number }) => {
    setApps(apps.map(app => 
      app.id === id ? { ...app, size } : app
    ));
  };

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  const closeStartMenu = () => {
    setStartMenuOpen(false);
  };

  return (
    <OSContext.Provider value={{
      apps,
      activeAppId,
      maxZIndex,
      startMenuOpen,
      openApp,
      closeApp,
      minimizeApp,
      restoreApp,
      focusApp,
      moveApp,
      resizeApp,
      toggleStartMenu,
      closeStartMenu
    }}>
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (context === undefined) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};
