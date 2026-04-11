
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
    { icon: wifi ? <Wifi size={16} /> : <WifiOff size={16} />, label: 'Wi-Fi', active: wifi, toggle: () => setWifi(!wifi) },
    { icon: <Bluetooth size={16} />, label: 'Bluetooth', active: bluetooth, toggle: () => setBluetooth(!bluetooth) },
    { icon: <Plane size={16} />, label: 'Airplane', active: airplane, toggle: () => setAirplane(!airplane) },
    { icon: nightMode ? <Moon size={16} /> : <Sun size={16} />, label: 'Night Light', active: nightMode, toggle: () => setNightMode(!nightMode) },
    { icon: mute ? <VolumeX size={16} /> : <Volume2 size={16} />, label: mute ? 'Unmute' : 'Mute', active: mute, toggle: () => setMute(!mute) },
    { icon: <Monitor size={16} />, label: 'Projection', active: false, toggle: () => {} },
  ];

  if (!isOpen) return null;

  const visibleNotifs = notifications.filter(n => !dismissed.includes(n.id));

  return (
    <div className="fixed top-3 right-3 bottom-20 w-[340px] glass rounded-2xl z-[9999] flex flex-col animate-slide-up overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-refos-primary" />
          <span className="font-semibold text-white/90 text-sm">Notifications</span>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <X size={16} className="text-white/50" />
        </button>
      </div>

      {/* Quick Settings */}
      <div className="p-4 border-b border-white/[0.06]">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {toggles.map((t, i) => (
            <button
              key={i}
              onClick={t.toggle}
              className={`flex flex-col items-center gap-1 p-2.5 rounded-xl text-[10px] font-medium transition-all ${
                t.active 
                  ? 'bg-refos-primary/20 text-refos-primary' 
                  : 'bg-white/[0.04] text-white/50 hover:bg-white/[0.08]'
              }`}
            >
              {t.icon}
              <span className="truncate w-full text-center">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Sun size={13} className="text-white/40" />
            <Slider value={brightness} onValueChange={setBrightness} max={100} className="flex-1" />
          </div>
          <div className="flex items-center gap-3">
            <Volume2 size={13} className="text-white/40" />
            <Slider value={volume} onValueChange={setVolume} max={100} className="flex-1" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="flex-1 overflow-y-auto p-3">
        {visibleNotifs.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Recent</span>
              <button onClick={clearAll} className="text-[10px] text-refos-primary hover:underline">Clear all</button>
            </div>
            {visibleNotifs.map(n => (
              <div key={n.id} className="bg-white/[0.04] rounded-xl p-3 mb-2 group relative hover:bg-white/[0.06] transition-colors">
                <button onClick={() => dismiss(n.id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={11} className="text-white/30" />
                </button>
                <div className="text-[10px] text-refos-primary font-medium">{n.app}</div>
                <div className="text-sm text-white/90 font-medium">{n.title}</div>
                <div className="text-xs text-white/40">{n.message}</div>
                <div className="text-[9px] text-white/20 mt-1">{n.time}</div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/20">
            <Bell size={28} className="mb-2" />
            <span className="text-xs font-light">No notifications</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
