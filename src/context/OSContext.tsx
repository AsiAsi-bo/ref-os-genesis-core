
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OSContextType, AppName } from '@/types/app';
import { useAppManagement } from '@/hooks/useAppManagement';

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  
  const {
    apps,
    activeAppId,
    maxZIndex,
    openApp: baseOpenApp,
    closeApp,
    minimizeApp,
    restoreApp,
    focusApp,
    moveApp,
    resizeApp
  } = useAppManagement();

  const openApp = (appName: AppName) => {
    baseOpenApp(appName);
    closeStartMenu();
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

// Re-export types for backward compatibility
export type { AppName } from '@/types/app';
