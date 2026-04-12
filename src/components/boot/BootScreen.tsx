
import React, { useState, useEffect } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  const steps = [
    'Loading kernel',
    'Starting services',
    'Mounting volumes',
    'Configuring network',
    'Preparing desktop',
  ];

  useEffect(() => {
    const t = setTimeout(() => setShowLogo(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const run = async () => {
      for (let i = 0; i < steps.length; i++) {
        setStep(steps[i]);
        const dur = 600 + Math.random() * 500;
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
    <div className={`h-screen w-screen bg-black flex flex-col items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/[0.04] blur-[150px]" />
      </div>

      {/* Logo */}
      <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Apple-style minimal logo */}
        <div className="relative w-20 h-20 mb-10">
          <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-sm" />
          <div className="absolute inset-[1px] rounded-[21px] bg-gradient-to-b from-[#1a1a2e] to-[#0d0d1a] flex items-center justify-center">
            <div className="relative">
              <div className="w-8 h-8 rounded-full border-2 border-white/20" />
              <div className="absolute inset-[6px] rounded-full bg-white/90" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-extralight text-white/90 tracking-[0.4em] uppercase mb-1">
          Ref OS
        </h1>
        <span className="text-[10px] text-white/25 tracking-[0.6em] uppercase">
          Version 2.0
        </span>
      </div>

      {/* Progress */}
      <div className="relative z-10 mt-16 w-48 space-y-4">
        {/* Thin progress bar */}
        <div className="relative h-[1px] bg-white/[0.08] rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-white/40 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step text */}
        <p className="text-center text-[10px] text-white/20 tracking-wider font-light">
          {step}
        </p>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-8 text-center space-y-1">
        <span className="block text-[9px] text-white/10 tracking-[0.3em] uppercase">
          Brin Corporation
        </span>
      </div>
    </div>
  );
};

export default BootScreen;
