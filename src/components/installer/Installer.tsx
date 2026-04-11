
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useInstaller } from '@/context/InstallerContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, ChevronRight, ChevronLeft, HardDrive, Cpu, Wifi, Shield, Zap, Monitor, Sparkles, Terminal, Box } from 'lucide-react';

interface OSEdition {
  id: string;
  name: string;
  tagline: string;
  description: string;
  size: string;
  features: string[];
  icon: React.ReactNode;
  recommended?: boolean;
  gradient: string;
}

const osEditions: OSEdition[] = [
  {
    id: 'ultimate',
    name: 'Ref OS Ultimate',
    tagline: 'The complete experience',
    description: 'Every app, every feature, zero compromises.',
    size: '4.5 GB',
    features: ['All built-in apps', 'Refy AI Assistant', 'RefGames + Game Builder', 'Ref Store', 'Full theme engine'],
    icon: <Sparkles className="h-6 w-6" />,
    recommended: true,
    gradient: 'from-blue-500 to-violet-600',
  },
  {
    id: 'home',
    name: 'Ref OS Home',
    tagline: 'Essentials, refined',
    description: 'Core apps for everyday productivity.',
    size: '2.8 GB',
    features: ['Browser, Files, Notepad', 'Weather & Calendar', 'Basic theme support'],
    icon: <Monitor className="h-6 w-6" />,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'lite',
    name: 'Ref OS Lite',
    tagline: 'Lean & fast',
    description: 'Minimal footprint, maximum speed.',
    size: '1.2 GB',
    features: ['File Explorer & Notepad', 'Terminal', 'Settings'],
    icon: <Terminal className="h-6 w-6" />,
    gradient: 'from-orange-500 to-red-600',
  },
];

const installPhases = [
  { name: 'Preparing', icon: HardDrive, items: ['Checking system requirements', 'Allocating disk space', 'Creating partition table', 'Validating checksums'] },
  { name: 'System Files', icon: Cpu, items: ['Copying kernel modules', 'Installing boot loader', 'Setting up /system/core', 'Deploying driver stack', 'Writing filesystem metadata'] },
  { name: 'Components', icon: Box, items: ['Desktop Environment', 'Window Manager', 'Task Bar & Start Menu', 'File System Layer', 'Notification Engine'] },
  { name: 'Applications', icon: Sparkles, items: ['Browser', 'File Explorer', 'Notepad', 'Calculator', 'Calendar', 'Weather', 'Terminal', 'Settings', 'RefGames', 'RefMovies', 'RefMail', 'Ref Store', 'Task Manager', 'Refy AI'] },
  { name: 'Configure', icon: Wifi, items: ['User profiles', 'Network stack', 'Default theme', 'Component registry', 'App cache'] },
  { name: 'Finalize', icon: Shield, items: ['Cleanup temp files', 'Optimize performance', 'Verify integrity', 'Complete setup'] },
];

const Installer: React.FC = () => {
  const { isInstalling, installProgress, installComplete, startInstallation, completeInstallation, setProgress } = useInstaller();
  const [selectedEdition, setSelectedEdition] = useState<string>('ultimate');
  const [step, setStep] = useState<'welcome' | 'select' | 'confirm' | 'installing'>('welcome');
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [installLog, setInstallLog] = useState<string[]>([]);
  const [glitchText, setGlitchText] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const totalItems = installPhases.reduce((acc, p) => acc + p.items.length, 0);

  // Installation tick
  useEffect(() => {
    if (!isInstalling || installProgress >= 100) return;

    const interval = setInterval(() => {
      let idx = Math.floor((installProgress / 100) * totalItems);
      let phase = 0, item = 0, count = 0;

      for (let p = 0; p < installPhases.length; p++) {
        if (count + installPhases[p].items.length > idx) {
          phase = p;
          item = idx - count;
          break;
        }
        count += installPhases[p].items.length;
      }

      setCurrentPhase(phase);
      setCurrentItem(item);

      const entry = `[${installPhases[phase].name.toUpperCase()}] ${installPhases[phase].items[item]}`;
      setInstallLog(prev => prev[prev.length - 1] !== entry ? [...prev, entry] : prev);

      if (installProgress < 99) {
        const speed = Math.random() > 0.85 ? 0.5 : (Math.random() > 0.5 ? 1.5 : 1);
        setProgress(Math.min(installProgress + speed, 100));
      } else {
        setProgress(100);
        clearInterval(interval);
        setInstallLog(prev => [...prev, '[DONE] Ref OS installed successfully.']);
        setTimeout(() => completeInstallation(), 800);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [isInstalling, installProgress, setProgress, completeInstallation, totalItems]);

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [installLog]);

  // Glitch effect on title
  useEffect(() => {
    const timer = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 150);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (installComplete) return null;

  const selectedData = osEditions.find(e => e.id === selectedEdition)!;

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 installer-grid opacity-20" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main container */}
      <div className="relative w-full max-w-3xl mx-4">
        {/* Welcome Screen */}
        {step === 'welcome' && (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
            {/* Logo */}
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-blue-500/30">
                <Zap className="h-14 w-14 text-white" />
              </div>
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 opacity-20 blur-xl -z-10" />
            </div>

            <div className="space-y-3">
              <h1 className={`text-5xl font-bold text-white tracking-tight ${glitchText ? 'installer-glitch' : ''}`}>
                Ref OS
              </h1>
              <p className="text-lg text-white/50 font-light tracking-wide">Version 2.0 — Genesis Core</p>
            </div>

            <p className="text-white/40 text-sm max-w-md leading-relaxed">
              Welcome to the Ref OS installer. This wizard will guide you through the setup process.
            </p>

            <Button
              onClick={() => setStep('select')}
              className="bg-white text-black hover:bg-white/90 px-8 py-6 text-base font-medium rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/10"
            >
              Begin Setup <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-white/20 text-xs">© 2026 Brin Corporation. All rights reserved.</p>
          </div>
        )}

        {/* Edition Selection */}
        {step === 'select' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-white">Choose Your Edition</h2>
              <p className="text-white/40 text-sm">Select the Ref OS edition that fits your workflow.</p>
            </div>

            <div className="grid gap-3">
              {osEditions.map(edition => {
                const isSelected = selectedEdition === edition.id;
                return (
                  <div
                    key={edition.id}
                    onClick={() => setSelectedEdition(edition.id)}
                    className={`relative group cursor-pointer rounded-xl border p-5 transition-all duration-300 ${
                      isSelected
                        ? 'border-white/30 bg-white/[0.08] scale-[1.01]'
                        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Selection glow */}
                    {isSelected && (
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${edition.gradient} opacity-5 pointer-events-none`} />
                    )}

                    <div className="relative flex items-start gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${edition.gradient} flex items-center justify-center text-white shadow-lg`}>
                        {edition.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{edition.name}</span>
                          {edition.recommended && (
                            <span className="text-[10px] font-medium bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Recommended
                            </span>
                          )}
                          <span className="ml-auto text-xs text-white/30 font-mono">{edition.size}</span>
                        </div>
                        <p className="text-xs text-white/50 mt-0.5">{edition.tagline} — {edition.description}</p>

                        {isSelected && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {edition.features.map((f, i) => (
                              <span key={i} className="text-[11px] bg-white/[0.06] text-white/60 px-2 py-1 rounded-md flex items-center gap-1">
                                <Check className="h-3 w-3 text-green-400" /> {f}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Radio */}
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 transition-colors ${
                        isSelected ? 'border-blue-400' : 'border-white/20'
                      }`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button
                variant="ghost"
                onClick={() => setStep('welcome')}
                className="text-white/40 hover:text-white hover:bg-white/5"
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={() => setStep('confirm')}
                className="bg-white text-black hover:bg-white/90 px-6 rounded-xl"
              >
                Continue <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {step === 'confirm' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedData.gradient} items-center justify-center text-white shadow-xl mb-4`}>
                {selectedData.icon}
              </div>
              <h2 className="text-2xl font-semibold text-white">Ready to Install</h2>
              <p className="text-white/40 text-sm">{selectedData.name} — {selectedData.size}</p>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-3">
              <p className="text-xs text-white/30 uppercase tracking-wider font-medium">Installation Summary</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ['Ref OS Core System', '2.4 GB'],
                  ['Desktop Environment', '512 MB'],
                  ['Built-in Applications', '1.1 GB'],
                  ['Drivers & Utilities', '384 MB'],
                  ['System Configuration', '128 MB'],
                ].map(([name, size]) => (
                  <div key={name} className="flex justify-between py-1.5 border-b border-white/[0.04]">
                    <span className="text-white/60">{name}</span>
                    <span className="text-white/30 font-mono text-xs">{size}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={() => setStep('select')}
                className="text-white/40 hover:text-white hover:bg-white/5"
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={() => { setStep('installing'); startInstallation(); }}
                className={`bg-gradient-to-r ${selectedData.gradient} text-white px-8 py-5 rounded-xl font-medium transition-all hover:scale-105 hover:shadow-lg`}
              >
                Install Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Installing */}
        {step === 'installing' && (
          <div className="space-y-5 animate-fade-in">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-semibold text-white">
                {installProgress >= 100 ? 'Installation Complete' : 'Installing Ref OS...'}
              </h2>
              <p className="text-white/40 text-sm">
                {installProgress >= 100
                  ? 'Your system is ready.'
                  : `Phase ${currentPhase + 1} of ${installPhases.length} — ${installPhases[currentPhase]?.name}`}
              </p>
            </div>

            {/* Phase indicators */}
            <div className="flex gap-1">
              {installPhases.map((phase, idx) => {
                const PhaseIcon = phase.icon;
                const isDone = idx < currentPhase || installProgress >= 100;
                const isActive = idx === currentPhase && installProgress < 100;
                return (
                  <div
                    key={idx}
                    className={`flex-1 flex flex-col items-center gap-1.5 py-2 rounded-lg transition-all text-[10px] ${
                      isDone ? 'bg-green-500/10 text-green-400' :
                      isActive ? 'bg-blue-500/15 text-blue-400' :
                      'bg-white/[0.02] text-white/20'
                    }`}
                  >
                    <PhaseIcon className={`h-4 w-4 ${isActive ? 'animate-pulse' : ''}`} />
                    <span className="font-medium">{phase.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="relative h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${installProgress}%` }}
                />
                {installProgress < 100 && (
                  <div
                    className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-shimmer"
                    style={{ left: `${installProgress - 10}%` }}
                  />
                )}
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/30 font-mono">
                  {installProgress < 100 ? installPhases[currentPhase]?.items[currentItem] : 'Done.'}
                </span>
                <span className="text-white/50 font-mono font-bold">{Math.round(installProgress)}%</span>
              </div>
            </div>

            {/* Terminal log */}
            <div className="bg-black/60 border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] text-white/20 font-mono ml-1">installer.log</span>
              </div>
              <div
                ref={logRef}
                className="h-40 p-3 font-mono text-[11px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10"
              >
                {installLog.map((log, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed ${
                      log.includes('[DONE]') ? 'text-green-400 font-bold' :
                      log.includes('SYSTEM FILES') || log.includes('PREPARING') ? 'text-yellow-400/80' :
                      log.includes('APPLICATIONS') ? 'text-blue-400/80' :
                      log.includes('FINALIZE') ? 'text-violet-400/80' :
                      'text-white/40'
                    }`}
                  >
                    <span className="text-white/15 mr-2">{String(idx + 1).padStart(3, '0')}</span>
                    {log}
                  </div>
                ))}
                {installProgress < 100 && (
                  <span className="text-blue-400 animate-pulse">▊</span>
                )}
              </div>
            </div>

            {/* Complete state */}
            {installProgress >= 100 && (
              <div className="flex flex-col items-center gap-4 pt-2">
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-7 w-7 text-green-400" />
                </div>
                <Button
                  onClick={completeInstallation}
                  className="bg-white text-black hover:bg-white/90 px-8 py-5 rounded-xl font-medium transition-all hover:scale-105"
                >
                  Launch Ref OS <Zap className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Installer;
