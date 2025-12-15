import { AppName, App } from '@/types/app';

export const defaultAppConfigs: Record<AppName, Omit<App, 'id' | 'isOpen' | 'isMinimized' | 'zIndex'>> = {
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
  },
  game: {
    name: 'game',
    title: 'RefGames',
    icon: 'gamepad',
    position: { x: 300, y: 100 },
    size: { width: 900, height: 650 }
  },
  email: {
    name: 'email',
    title: 'RefMail',
    icon: 'mail',
    position: { x: 150, y: 300 },
    size: { width: 800, height: 600 }
  },
  store: {
    name: 'store',
    title: 'Ref Store',
    icon: 'store',
    position: { x: 200, y: 100 },
    size: { width: 850, height: 600 }
  }
};
