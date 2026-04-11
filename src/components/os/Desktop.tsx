
import React from 'react';
import { useOS, AppName } from '@/context/OSContext';
import { 
  Folder, FileText, Calculator, Settings, Cloud, Calendar, Globe, Terminal, Bot, Mail, Music, Image, Paintbrush
} from 'lucide-react';

const Desktop: React.FC = () => {
  const { openApp } = useOS();

  const shortcuts: { name: AppName; title: string; icon: React.ReactNode; color: string }[] = [
    { name: 'fileExplorer', title: 'Files', icon: <Folder size={28} />, color: 'from-blue-400 to-blue-600' },
    { name: 'notepad', title: 'Notepad', icon: <FileText size={28} />, color: 'from-amber-400 to-orange-500' },
    { name: 'calculator', title: 'Calculator', icon: <Calculator size={28} />, color: 'from-gray-500 to-gray-700' },
    { name: 'weather', title: 'Weather', icon: <Cloud size={28} />, color: 'from-sky-400 to-blue-500' },
    { name: 'calendar', title: 'Calendar', icon: <Calendar size={28} />, color: 'from-red-400 to-red-600' },
    { name: 'browser', title: 'Browser', icon: <Globe size={28} />, color: 'from-blue-500 to-indigo-600' },
    { name: 'terminal', title: 'Terminal', icon: <Terminal size={28} />, color: 'from-gray-700 to-gray-900' },
    { name: 'email', title: 'Mail', icon: <Mail size={28} />, color: 'from-blue-400 to-cyan-500' },
    { name: 'movie', title: 'Movies', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>, color: 'from-red-500 to-rose-600' },
    { name: 'refy', title: 'Refy', icon: <Bot size={28} />, color: 'from-violet-500 to-purple-600' },
    { name: 'game', title: 'Games', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>, color: 'from-green-500 to-emerald-600' },
    { name: 'music', title: 'Music', icon: <Music size={28} />, color: 'from-pink-500 to-rose-600' },
    { name: 'photos', title: 'Photos', icon: <Image size={28} />, color: 'from-orange-400 to-pink-500' },
    { name: 'paint', title: 'Paint', icon: <Paintbrush size={28} />, color: 'from-yellow-400 to-amber-500' },
    { name: 'settings', title: 'Settings', icon: <Settings size={28} />, color: 'from-gray-400 to-gray-600' },
  ];

  return (
    <div className="h-full p-6 grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] auto-rows-[96px] gap-2 content-start">
      {shortcuts.map((shortcut) => (
        <button
          key={shortcut.name}
          className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 focus:bg-white/10 focus:outline-none transition-all duration-150 group touch-manipulation active:scale-95"
          onClick={() => openApp(shortcut.name)}
          onTouchEnd={(e) => { e.preventDefault(); openApp(shortcut.name); }}
        >
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${shortcut.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200`}>
            {shortcut.icon}
          </div>
          <span className="mt-1.5 text-[11px] font-medium text-white/90 text-center w-full truncate drop-shadow-sm">
            {shortcut.title}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Desktop;
