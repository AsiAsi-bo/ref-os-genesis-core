
import React, { useState, useEffect, useMemo } from 'react';
import { Zap } from 'lucide-react';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [logLines, setLogLines] = useState<string[]>([]);

  const particles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 3}s`,
    })), []);

  const steps = [
    { label: 'Initializing hardware', log: 'hw_init: CPU, RAM, NVMe — OK' },
    { label: 'Loading kernel', log: 'kernel: ref-kernel 2.0.4 loaded' },
    { label: 'Starting services', log: 'svc: 12 services started' },
    { label: 'Mounting volumes', log: 'fs: /system /user /apps mounted' },
    { label: 'Configuring network', log: 'net: link up — 1 Gbps' },
    { label: 'Loading desktop', log: 'desktop: compositor ready' },
    { label: 'Preparing workspace', log: 'workspace: profile loaded' },
    { label: 'Almost ready', log: 'boot: sequence complete' },
  ];

  useEffect(() => {
    const t = setTimeout(() => setShowLogo(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const run = async () => {
      for (let i = 0; i < steps.length; i++) {
        setStep(steps[i].label);
        setLogLines(prev => [...prev, steps[i].log]);
        const dur = 450 + Math.random() * 400;
        await new Promise(r => setTimeout(r, dur));
        setProgress(((i + 1) / steps.length) * 100);
      }
      setFadeOut(true);
      await new Promise(r => setTimeout(r, 700));
      onBootComplete();
    };
    run();
  }, [onBootComplete]);

  return (
    <div className={`h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Grid background — matches installer */}
      <div className="absolute inset-0 installer-grid opacity-15" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration }}
          />
        ))}
      </div>

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Logo + branding */}
      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4'}`}>
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-blue-500/30">
            <Zap className="h-12 w-12 text-white" />
          </div>
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 opacity-20 blur-xl -z-10 animate-pulse" />
        </div>

        <h1 className="text-4xl font-bold text-white tracking-tight mb-1">
          Ref OS
        </h1>
        <span className="text-xs text-white/30 tracking-[0.4em] uppercase font-light">
          Version 2.0 — Genesis Core
        </span>
      </div>

      {/* Progress section */}
      <div className="relative z-10 mt-14 w-80 space-y-4">
        {/* Step label with spinner */}
        <div className="flex items-center justify-center gap-2.5">
          <div className="w-3.5 h-3.5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
          <span className="text-sm text-white/50 font-light">{step}</span>
        </div>

        {/* Progress bar — installer style */}
        <div className="relative h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
          {progress < 100 && (
            <div
              className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-shimmer"
              style={{ left: `${Math.max(0, progress - 8)}%` }}
            />
          )}
        </div>

        <div className="text-center text-xs text-white/25 font-mono">{Math.round(progress)}%</div>
      </div>

      {/* Mini boot log */}
      <div className="relative z-10 mt-8 w-80">
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg overflow-hidden">
          <div className="px-3 py-1.5 border-b border-white/[0.04] flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
            <span className="text-[9px] text-white/20 font-mono">boot.log</span>
          </div>
          <div className="px-3 py-2 h-20 overflow-hidden flex flex-col justify-end">
            {logLines.slice(-4).map((line, i) => (
              <div
                key={i}
                className={`text-[10px] font-mono leading-relaxed transition-opacity duration-300 ${
                  i === logLines.slice(-4).length - 1 ? 'text-blue-400/70' : 'text-white/15'
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-6 flex flex-col items-center gap-0.5">
        <span className="text-[9px] text-white/15 tracking-[0.3em] uppercase">Brin Corporation</span>
        <span className="text-[9px] text-white/10">© 2026</span>
      </div>
    </div>
  );
};

export default BootScreen;
