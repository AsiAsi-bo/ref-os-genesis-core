
import React, { useEffect, useState } from 'react';
import { Rocket, FolderOpen, FileText, Settings, Sparkles } from 'lucide-react';

const tips = [
  { icon: FolderOpen, text: 'Browse files with File Explorer' },
  { icon: FileText, text: 'Create documents in Notepad' },
  { icon: Settings, text: 'Fine-tune your setup in Settings' },
  { icon: Sparkles, text: 'Ask Refy AI for help anytime' },
];

const FinalStep: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <div className={`space-y-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-center space-y-4">
        {/* Animated check */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-green-500/10 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
            <Rocket size={32} className="text-white" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white pt-2">You're all set!</h3>
        <p className="text-white/50 text-sm max-w-sm mx-auto">
          Ref OS is configured and ready to launch. Here's what you can do next:
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {tips.map(({ icon: Icon, text }, i) => (
          <div
            key={text}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
              <Icon size={14} className="text-purple-300" />
            </div>
            <span className="text-sm text-white/80">{text}</span>
          </div>
        ))}
      </div>

      <div className="text-center pt-2">
        <p className="text-white/30 text-xs">
          Click <span className="text-purple-300 font-medium">Launch Ref OS</span> to enter your desktop
        </p>
      </div>
    </div>
  );
};

export default FinalStep;
