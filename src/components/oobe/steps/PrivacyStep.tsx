
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Shield, Activity, MapPin, Eye } from 'lucide-react';

const privacyOptions = [
  {
    id: 'diagnostic',
    icon: Activity,
    label: 'Diagnostic data',
    desc: 'Send anonymous usage & crash data to help improve Ref OS.',
    defaultChecked: true,
  },
  {
    id: 'personalized',
    icon: Eye,
    label: 'Personalized experience',
    desc: 'Use your activity to tailor suggestions and features.',
    defaultChecked: false,
  },
  {
    id: 'location',
    icon: MapPin,
    label: 'Location services',
    desc: 'Allow apps to request your location. Configurable per-app later.',
    defaultChecked: false,
  },
];

const PrivacyStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-cyan-300">
          <Shield size={18} />
          <span className="text-xs font-mono tracking-wider uppercase">Privacy</span>
        </div>
        <h3 className="text-2xl font-bold text-white">Your data, your rules</h3>
        <p className="text-white/50 text-sm">Control what information Ref OS can collect. Change anytime in Settings.</p>
      </div>

      <div className="space-y-3">
        {privacyOptions.map(({ id, icon: Icon, label, desc, defaultChecked }) => (
          <div key={id} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-200 group">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-cyan-500/15 transition-colors">
              <Icon size={16} className="text-cyan-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <Label htmlFor={id} className="cursor-pointer text-sm font-medium text-white/90">{label}</Label>
                <Checkbox id={id} defaultChecked={defaultChecked} className="ml-3" />
              </div>
              <p className="text-xs text-white/40 mt-1 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
        <p className="text-xs text-white/30 text-center">
          🔒 All settings can be changed later in <span className="text-white/50">Settings → Privacy</span>
        </p>
      </div>
    </div>
  );
};

export default PrivacyStep;
