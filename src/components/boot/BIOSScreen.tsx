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
    'Brin Corp. BIOS v2.4.1',
    'Copyright (C) 2024 Brin Corporation. All Rights Reserved.',
    '',
    'CPU: Ref Processor™ X86-64 @ 3.60GHz',
    'Memory Test: 16384 MB OK',
    '',
    'Detecting Primary Master... Ref OS Virtual Disk (256 GB)',
    'Detecting Primary Slave... None',
    'Detecting Secondary Master... Ref Virtual DVD-ROM',
    'Detecting Secondary Slave... None',
    '',
    'USB Devices: Keyboard, Mouse',
    'PCI Devices: VGA, Audio, Network, USB Controller',
    '',
    'Initializing USB Controllers... Done',
    'Initializing Network Controller... MAC: 00:1A:2B:3C:4D:5E',
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
    }, 120);
    return () => clearInterval(interval);
  }, [inSetup]);

  // Auto-boot after POST if not entering setup
  useEffect(() => {
    if (!postComplete || inSetup) return;
    const timer = setTimeout(() => {
      onBIOSComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [postComplete, inSetup, onBIOSComplete]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Delete' && showSetupPrompt && !inSetup) {
      setInSetup(true);
    }
    if (inSetup && e.key === 'Escape') {
      setInSetup(false);
      onBIOSComplete();
    }
    if (inSetup) {
      if (e.key === 'ArrowRight') setSetupTab(t => Math.min(t + 1, 4));
      if (e.key === 'ArrowLeft') setSetupTab(t => Math.max(t - 1, 0));
    }
  }, [showSetupPrompt, inSetup, onBIOSComplete]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const tabs = ['Main', 'Advanced', 'Boot', 'Security', 'Exit'];

  const tabContent: Record<number, { label: string; value: string }[]> = {
    0: [
      { label: 'BIOS Version', value: '2.4.1' },
      { label: 'BIOS Date', value: '04/02/2026' },
      { label: 'Processor Type', value: 'Ref Processor™ X86-64' },
      { label: 'Processor Speed', value: '3.60 GHz' },
      { label: 'Total Memory', value: '16384 MB (DDR5)' },
      { label: 'System Time', value: new Date().toLocaleTimeString() },
      { label: 'System Date', value: new Date().toLocaleDateString() },
    ],
    1: [
      { label: 'CPU Configuration', value: '4 Cores / 8 Threads' },
      { label: 'Virtualization', value: 'Enabled' },
      { label: 'Hyper-Threading', value: 'Enabled' },
      { label: 'SATA Mode', value: 'AHCI' },
      { label: 'USB Legacy Support', value: 'Enabled' },
      { label: 'Network Stack', value: 'Enabled' },
    ],
    2: [
      { label: 'Boot Option #1', value: 'Ref OS Virtual Disk' },
      { label: 'Boot Option #2', value: 'Ref Virtual DVD-ROM' },
      { label: 'Boot Option #3', value: 'USB Device' },
      { label: 'Boot Option #4', value: 'Network Boot (PXE)' },
      { label: 'Fast Boot', value: 'Enabled' },
      { label: 'Secure Boot', value: 'Enabled' },
    ],
    3: [
      { label: 'Administrator Password', value: 'Not Set' },
      { label: 'User Password', value: 'Not Set' },
      { label: 'Secure Boot', value: 'Enabled' },
      { label: 'TPM Device', value: 'Enabled (v2.0)' },
      { label: 'Chassis Intrusion', value: 'Disabled' },
    ],
    4: [
      { label: 'Save Changes & Exit', value: '[Enter]' },
      { label: 'Discard Changes & Exit', value: '[Enter]' },
      { label: 'Load Default Settings', value: '[Enter]' },
    ],
  };

  if (inSetup) {
    return (
      <div className="h-screen w-screen bg-[#0000aa] text-white font-mono text-sm p-0 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#aaaaaa] text-[#0000aa] text-center font-bold py-1 text-base">
          Brin Corp. BIOS Setup Utility v2.4.1
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#aaaaaa]/40">
          {tabs.map((tab, i) => (
            <div
              key={tab}
              className={`px-6 py-1 cursor-pointer text-center ${
                i === setupTab
                  ? 'bg-[#aaaaaa] text-[#0000aa] font-bold'
                  : 'text-[#aaaaaa] hover:text-white'
              }`}
              onClick={() => setSetupTab(i)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto">
          <table className="w-full">
            <tbody>
              {tabContent[setupTab]?.map((item, i) => (
                <tr key={i} className="border-b border-[#aaaaaa]/20">
                  <td className="py-1.5 text-[#aaaaaa] w-1/2">{item.label}</td>
                  <td className="py-1.5 text-[#ffff55]">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-[#aaaaaa]/20 p-2 text-xs text-[#aaaaaa] flex justify-between">
          <span>←→ Select Tab | ↑↓ Select Item | Enter: Select</span>
          <span>
            <button
              onClick={onBIOSComplete}
              className="text-[#ffff55] hover:text-white underline cursor-pointer mr-4"
            >
              Save & Exit
            </button>
            ESC: Exit Without Saving
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black text-white font-mono text-sm p-6 overflow-hidden flex flex-col">
      {/* POST output */}
      <div className="flex-1 overflow-hidden">
        {lines.map((line, i) => (
          <div key={i} className={`leading-relaxed ${line === '' ? 'h-4' : ''}`}>
            {line}
          </div>
        ))}
      </div>

      {/* Bottom prompt */}
      {showSetupPrompt && (
        <div className="mt-4 space-y-1">
          <div className="text-[#aaaaaa]">
            Press <span className="text-[#ffff55]">DEL</span> to enter BIOS Setup
          </div>
          <div className="text-[#aaaaaa]">
            Booting from Ref OS Virtual Disk...
          </div>
          <button
            onClick={() => setInSetup(true)}
            className="mt-2 text-xs text-[#aaaaaa]/60 hover:text-[#ffff55] underline cursor-pointer"
          >
            Click here to enter BIOS Setup (or press DEL)
          </button>
        </div>
      )}
    </div>
  );
};

export default BIOSScreen;
