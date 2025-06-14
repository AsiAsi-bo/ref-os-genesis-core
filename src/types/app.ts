export type AppName = 'fileExplorer' | 'notepad' | 'calculator' | 'settings' | 'weather' | 'calendar' | 'browser' | 'terminal' | 'refy' | 'movie' | 'game' | 'email';

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

export interface OSContextType {
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
