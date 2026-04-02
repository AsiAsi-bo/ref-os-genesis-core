import React, { useState } from 'react';
import { X, Bell, Wifi, WifiOff, Volume2, VolumeX, Moon, Sun, Bluetooth, Plane, Monitor, Battery } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface Notification {
  id: number;
  app: string;
  title: string;
  message: string;
  time: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [brightness, setBrightness] = useState([80]);
  const [volume, setVolume] = useState([70]);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [airplane, setAirplane] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [mute, setMute] = useState(false);

  const [notifications] = useState<Notification[]>([
    { id: 1, app: 'Update Center', title: 'Updates Available', message: 'Ref OS 2 is ready to install.', time: '2m ago' },
    { id: 2, app: 'RefMail', title: 'New Email', message: 'You have 3 unread messages.', time: '15m ago' },
    { id: 3, app: 'Ref Store', title: 'App Updated', message: 'RefMovies has been updated to v2.0.', time: '1h ago' },
  ]);

  const [dismissed, setDismissed] = useState<number[]>([]);

  const dismiss = (id: number) => setDismissed(prev => [...prev, id]);
  const clearAll = () => setDismissed(notifications.map(n => n.id));

  const toggles = [
    { icon: wifi ? <Wifi size={18} /> : <WifiOff size={18} />, label: 'Wi-Fi', active: wifi, toggle: () => setWifi(!wifi) },
    { icon: <Bluetooth size={18} />, label: 'Bluetooth', active: bluetooth, toggle: () => setBluetooth(!bluetooth) },
    { icon: <Plane size={18} />, label: 'Airplane', active: airplane, toggle: () => setAirplane(!airplane) },
    { icon: nightMode ? <Moon size={18} /> : <Sun size={18} />, label: 'Night Light', active: nightMode, toggle: () => setNightMode(!nightMode) },
    { icon: mute ? <VolumeX size={18} /> : <Volume2 size={18} />, label: mute ? 'Unmute' : 'Mute', active: mute, toggle: () => setMute(!mute) },
    { icon: <Monitor size={18} />, label: 'Projection', active: false, toggle: () => {} },
  ];

  if (!isOpen) return null;

  const visibleNotifs = notifications.filter(n => !dismissed.includes(n.id));

  return (
    <div className="fixed top-0 right-0 bottom-12 w-[340px] bg-refos-taskbar/95 backdrop-blur-md border-l border-white/10 z-[9999] flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-refos-primary" />
          <span className="font-semibold text-white">Notifications</span>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-white/10"><X size={18} className="text-white/60" /></button>
      </div>

      {/* Quick Settings */}
      <div className="p-4 border-b border-white/10">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {toggles.map((t, i) => (
            <button
              key={i}
              onClick={t.toggle}
              className={`flex flex-col items-center gap-1 p-2.5 rounded-lg text-xs transition-colors ${
                t.active ? 'bg-refos-primary/20 text-refos-primary' : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {t.icon}
              <span className="truncate w-full text-center">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Sliders */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Sun size={14} className="text-white/50" />
            <Slider value={brightness} onValueChange={setBrightness} max={100} className="flex-1" />
          </div>
          <div className="flex items-center gap-3">
            <Volume2 size={14} className="text-white/50" />
            <Slider value={volume} onValueChange={setVolume} max={100} className="flex-1" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="flex-1 overflow-y-auto p-3">
        {visibleNotifs.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-xs text-white/40">Recent</span>
              <button onClick={clearAll} className="text-[10px] text-refos-primary hover:underline">Clear all</button>
            </div>
            {visibleNotifs.map(n => (
              <div key={n.id} className="bg-white/5 rounded-lg p-3 mb-2 group relative">
                <button onClick={() => dismiss(n.id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={12} className="text-white/40" />
                </button>
                <div className="text-[10px] text-refos-primary font-medium">{n.app}</div>
                <div className="text-sm text-white font-medium">{n.title}</div>
                <div className="text-xs text-white/50">{n.message}</div>
                <div className="text-[10px] text-white/30 mt-1">{n.time}</div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/30">
            <Bell size={32} className="mb-2" />
            <span className="text-sm">No notifications</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
