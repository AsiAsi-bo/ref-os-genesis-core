
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Moon, Sun, Monitor, Palette } from 'lucide-react';

const themes = [
  { value: 'dark', label: 'Dark', icon: Moon, desc: 'Easy on the eyes' },
  { value: 'light', label: 'Light', icon: Sun, desc: 'Clean and bright' },
  { value: 'system', label: 'Auto', icon: Monitor, desc: 'Match system' },
];

const PersonalizationStep: React.FC = () => {
  const [theme, setTheme] = useState('dark');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-purple-300">
          <Palette size={18} />
          <span className="text-xs font-mono tracking-wider uppercase">Personalization</span>
        </div>
        <h3 className="text-2xl font-bold text-white">Make it yours</h3>
        <p className="text-white/50 text-sm">Choose your visual preferences and desktop behavior.</p>
      </div>

      {/* Theme selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white/70">Appearance</label>
        <div className="grid grid-cols-3 gap-3">
          {themes.map(({ value, label, icon: Icon, desc }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`
                relative p-4 rounded-xl border text-left transition-all duration-300 group
                ${theme === value
                  ? 'bg-purple-500/10 border-purple-500/40 shadow-lg shadow-purple-500/5'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                }
              `}
            >
              {theme === value && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              )}
              <Icon size={20} className={theme === value ? 'text-purple-300' : 'text-white/40'} />
              <div className="mt-2 text-sm font-medium text-white/90">{label}</div>
              <div className="text-xs text-white/40">{desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop options */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white/70">Desktop</label>
        <div className="space-y-2">
          {[
            { id: 'show-icons', label: 'Show desktop icons', defaultChecked: true },
            { id: 'show-recent', label: 'Show recent files', defaultChecked: false },
            { id: 'show-notifications', label: 'Enable notifications', defaultChecked: true },
          ].map(({ id, label, defaultChecked }) => (
            <div key={id} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
              <Checkbox id={id} defaultChecked={defaultChecked} />
              <Label htmlFor={id} className="cursor-pointer text-sm text-white/80">{label}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalizationStep;
