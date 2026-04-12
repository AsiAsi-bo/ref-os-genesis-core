
import React, { useState, useEffect, useCallback } from 'react';

interface BIOSScreenProps {
  onBIOSComplete: () => void;
}

const BIOSScreen: React.FC<BIOSScreenProps> = ({ onBIOSComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [showSetupPrompt, setShowSetupPrompt] = useState(false);
  const [inSetup, setInSetup] = useState(false);
  const [setupTab, setSetupTab] = useState(0);
  const [postComplete, setPostComplete] = useState(false);

  const biosLines = [
    'Brin Corp. UEFI Firmware v3.0.2',
    'Copyright (C) 2026 Brin Corporation',
    '',
    'CPU  Ref Processor™ X86-64 @ 3.60 GHz',
    'RAM  16384 MB DDR5 — OK',
    '',
    'NVMe  Ref OS Virtual Disk (256 GB)',
    'ODD   Ref Virtual DVD-ROM',
    '',
    'USB   Keyboard · Mouse',
    'PCI   VGA · Audio · Network · USB Host',
    '',
    'Network  00:1A:2B:3C:4D:5E — Link Up',
    '',
  ];

  useEffect(() => {
    if (inSetup) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < biosLines.length) {
        setLines(prev => [...prev, biosLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setShowSetupPrompt(true);
        setPostComplete(true);
      }
    }, 90);
    return () => clearInterval(interval);
  }, [inSetup]);

  useEffect(() => {
    if (!postComplete || inSetup) return;
    const timer = setTimeout(() => onBIOSComplete(), 2500);
    return () => clearTimeout(timer);
  }, [postComplete, inSetup, onBIOSComplete]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Delete' && showSetupPrompt && !inSetup) setInSetup(true);
    if (inSetup && e.key === 'Escape') { setInSetup(false); onBIOSComplete(); }
    if (inSetup) {
      if (e.key === 'ArrowRight') setSetupTab(t => Math.min(t + 1, 5));
      if (e.key === 'ArrowLeft') setSetupTab(t => Math.max(t - 1, 0));
    }
  }, [showSetupPrompt, inSetup, onBIOSComplete]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const tabs = ['Main', 'Advanced', 'Boot', 'Security', 'Developer', 'Exit'];

  const tabContent: Record<number, { label: string; value: string }[]> = {
    0: [
      { label: 'Firmware Version', value: '3.0.2' },
      { label: 'Build Date', value: '2026-04-02' },
      { label: 'Processor', value: 'Ref Processor™ X86-64' },
      { label: 'Clock Speed', value: '3.60 GHz' },
      { label: 'Installed Memory', value: '16 384 MB DDR5' },
      { label: 'System Time', value: new Date().toLocaleTimeString() },
      { label: 'System Date', value: new Date().toLocaleDateString() },
    ],
    1: [
      { label: 'Core Count', value: '4C / 8T' },
      { label: 'Virtualization', value: 'Enabled' },
      { label: 'Hyper-Threading', value: 'Enabled' },
      { label: 'Storage Mode', value: 'NVMe' },
      { label: 'USB Legacy', value: 'Enabled' },
      { label: 'Network Stack', value: 'Enabled' },
    ],
    2: [
      { label: 'Boot #1', value: 'Ref OS Virtual Disk' },
      { label: 'Boot #2', value: 'Ref Virtual DVD-ROM' },
      { label: 'Boot #3', value: 'USB Device' },
      { label: 'Boot #4', value: 'PXE Network' },
      { label: 'Fast Boot', value: 'On' },
      { label: 'Secure Boot', value: 'On' },
    ],
    3: [
      { label: 'Admin Password', value: 'Not Set' },
      { label: 'Secure Boot', value: 'Enabled' },
      { label: 'TPM', value: '2.0 — Active' },
    ],
    4: [
      { label: 'Developer Mode', value: 'Off' },
      { label: 'Debug Console', value: 'Off' },
      { label: 'Verbose Boot', value: 'Off' },
      { label: 'Kernel Debug', value: 'Off' },
    ],
    5: [
      { label: 'Save & Exit', value: '↵' },
      { label: 'Discard & Exit', value: '↵' },
      { label: 'Load Defaults', value: '↵' },
    ],
  };

  if (inSetup) {
    return (
      <div className="h-screen w-screen bg-gradient-to-b from-[#0a0a14] to-[#0d1117] text-white font-mono text-sm flex flex-col overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-white/[0.03]">
          <span className="text-xs tracking-[0.3em] uppercase text-white/50">Brin UEFI Setup</span>
          <span className="text-xs text-white/30">v3.0.2</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pt-3">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setSetupTab(i)}
              className={`px-5 py-2 text-xs tracking-wider rounded-t-lg transition-all ${
                i === setupTab
                  ? 'bg-white/10 text-white border border-white/10 border-b-transparent'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 mx-4 p-6 bg-white/[0.03] border border-white/10 border-t-0 rounded-b-lg overflow-auto">
          <div className="space-y-0">
            {tabContent[setupTab]?.map((item, i) => (
              <div key={i} className="flex items-center py-2.5 border-b border-white/5 last:border-0">
                <span className="w-1/2 text-white/50 text-xs tracking-wide">{item.label}</span>
                <span className="text-blue-400 text-xs font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 bg-white/[0.02]">
          <span className="text-[10px] text-white/30 tracking-wider">←→ Tab · ↑↓ Navigate · Enter Select</span>
          <button
            onClick={onBIOSComplete}
            className="text-[10px] text-blue-400 hover:text-blue-300 tracking-wider transition-colors"
          >
            Save & Continue →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#0a0a14] to-[#0d1117] text-white font-mono text-xs flex flex-col overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' }}
      />

      {/* POST lines */}
      <div className="flex-1 p-8 overflow-hidden relative z-10">
        <div className="space-y-0.5">
          {lines.map((line, i) => (
            <div key={i} className={`leading-relaxed ${line === '' ? 'h-3' : 'text-white/70'}`}>
              {line && (
                <>
                  <span className="text-white/20 mr-3">{String(i + 1).padStart(2, '0')}</span>
                  {line}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Boot prompt */}
      {showSetupPrompt && (
        <div className="relative z-10 px-8 pb-8 space-y-2 animate-fade-in">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-white/40 text-xs tracking-wider">
              Booting from NVMe — Ref OS Virtual Disk
            </span>
          </div>
          <button
            onClick={() => setInSetup(true)}
            className="text-[10px] text-white/20 hover:text-blue-400 tracking-wider transition-colors ml-5"
          >
            Press DEL for UEFI Setup
          </button>
        </div>
      )}
    </div>
  );
};

export default BIOSScreen;
