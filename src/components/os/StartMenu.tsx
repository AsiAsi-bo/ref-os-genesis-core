
import React, { useEffect, useRef, useState } from 'react';
import { useOS, AppName } from '@/context/OSContext';
import { 
  Folder, FileText, Calculator, Settings, User, Power, Cloud, Calendar, Globe, Terminal, Bot, Store, Activity, Download, Music, Image, Paintbrush, Search
} from 'lucide-react';

const StartMenu: React.FC = () => {
  const { startMenuOpen, openApp, closeStartMenu } = useOS();
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const apps: { name: AppName; title: string; icon: React.ReactNode; color: string }[] = [
    { name: 'fileExplorer', title: 'Files', icon: <Folder size={28} />, color: 'from-blue-400 to-blue-600' },
    { name: 'notepad', title: 'Notepad', icon: <FileText size={28} />, color: 'from-amber-400 to-orange-500' },
    { name: 'calculator', title: 'Calculator', icon: <Calculator size={28} />, color: 'from-gray-500 to-gray-700' },
    { name: 'weather', title: 'Weather', icon: <Cloud size={28} />, color: 'from-sky-400 to-blue-500' },
    { name: 'calendar', title: 'Calendar', icon: <Calendar size={28} />, color: 'from-red-400 to-red-600' },
    { name: 'browser', title: 'Browser', icon: <Globe size={28} />, color: 'from-blue-500 to-indigo-600' },
    { name: 'terminal', title: 'Terminal', icon: <Terminal size={28} />, color: 'from-gray-700 to-gray-900' },
    { name: 'movie', title: 'Movies', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>, color: 'from-red-500 to-rose-600' },
    { name: 'refy', title: 'Refy', icon: <Bot size={28} />, color: 'from-violet-500 to-purple-600' },
    { name: 'game', title: 'Games', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>, color: 'from-green-500 to-emerald-600' },
    { name: 'email', title: 'Mail', icon: <Mail size={28} />, color: 'from-blue-400 to-cyan-500' },
    { name: 'store', title: 'Store', icon: <Store size={28} />, color: 'from-cyan-400 to-blue-500' },
    { name: 'music', title: 'Music', icon: <Music size={28} />, color: 'from-pink-500 to-rose-600' },
    { name: 'photos', title: 'Photos', icon: <Image size={28} />, color: 'from-orange-400 to-pink-500' },
    { name: 'paint', title: 'Paint', icon: <Paintbrush size={28} />, color: 'from-yellow-400 to-amber-500' },
    { name: 'taskmanager', title: 'Task Manager', icon: <Activity size={28} />, color: 'from-orange-500 to-red-500' },
    { name: 'updatecenter', title: 'Updates', icon: <Download size={28} />, color: 'from-teal-400 to-cyan-500' },
    { name: 'settings', title: 'Settings', icon: <Settings size={28} />, color: 'from-gray-400 to-gray-600' },
  ];

  const filteredApps = apps.filter(app =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeStartMenu();
      }
    };
    if (startMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [startMenuOpen, closeStartMenu]);

  if (!startMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={closeStartMenu} />
      
      {/* Content */}
      <div ref={menuRef} className="relative w-full max-w-2xl mx-4 animate-fade-in">
        {/* Search bar */}
        <div className="glass rounded-2xl px-5 py-3 mb-6 flex items-center gap-3">
          <Search size={18} className="text-white/40" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search apps..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-transparent text-white text-base outline-none w-full placeholder:text-white/30 font-light"
          />
        </div>

        {/* App grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-4 max-h-[60vh] overflow-y-auto px-2 py-4">
          {filteredApps.map((app) => (
            <button
              key={app.name}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/10 active:scale-95 transition-all duration-150"
              onClick={() => openApp(app.name)}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-lg`}>
                {app.icon}
              </div>
              <span className="text-[11px] font-medium text-white/80 text-center truncate w-full">
                {app.title}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-6 px-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-refos-primary to-refos-secondary flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-white/60 text-sm font-light">User</span>
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all text-sm"
            onClick={closeStartMenu}
          >
            <Power size={14} />
            Power
          </button>
        </div>
      </div>
    </div>
  );
};

// Need to import Mail
import { Mail } from 'lucide-react';

export default StartMenu;
