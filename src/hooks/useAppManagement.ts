
import { useState } from 'react';
import { App, AppName } from '@/types/app';
import { defaultAppConfigs } from '@/constants/appConfigs';
import { generateId } from '@/utils/appUtils';

export const useAppManagement = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(0);

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

  return {
    apps,
    activeAppId,
    maxZIndex,
    openApp,
    closeApp,
    minimizeApp,
    restoreApp,
    focusApp,
    moveApp,
    resizeApp
  };
};
