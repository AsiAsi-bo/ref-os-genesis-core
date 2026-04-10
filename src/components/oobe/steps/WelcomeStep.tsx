
import React, { useEffect, useState } from 'react';
import { Bot, Sparkles, Shield, Palette } from 'lucide-react';

const WelcomeStep: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <div className={`space-y-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono tracking-wider">
          <Sparkles size={12} /> REF OS SETUP
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent leading-tight">
          Welcome to<br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Ref OS
          </span>
        </h2>
        <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">
          Your new operating system is almost ready. Let's personalize your experience in just a few quick steps.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        {[
          { icon: Palette, label: 'Personalize', desc: 'Make it yours' },
          { icon: Shield, label: 'Privacy', desc: 'Stay in control' },
          { icon: Bot, label: 'Refy AI', desc: 'Your assistant' },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="group p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300 text-center">
            <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Icon size={18} className="text-purple-300" />
            </div>
            <div className="text-sm font-medium text-white/90">{label}</div>
            <div className="text-xs text-white/40 mt-1">{desc}</div>
          </div>
        ))}
      </div>

      <p className="text-center text-white/30 text-xs pt-2">
        Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 font-mono text-[10px]">Continue</kbd> to begin setup
      </p>
    </div>
  );
};

export default WelcomeStep;
