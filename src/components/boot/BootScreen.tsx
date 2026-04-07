
import React, { useState, useEffect } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [bootProgress, setBootProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing system...');
  const [dots, setDots] = useState('');
  const [showVersion, setShowVersion] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const bootSteps = [
    'Initializing hardware',
    'Loading kernel modules',
    'Starting system services',
    'Mounting file systems',
    'Configuring network',
    'Loading desktop environment',
    'Preparing workspace',
    'Almost ready'
  ];

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    setTimeout(() => setShowVersion(true), 600);

    const bootSequence = async () => {
      for (let i = 0; i < bootSteps.length; i++) {
        setCurrentStep(bootSteps[i]);
        const stepDuration = 500 + Math.random() * 400;
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        setBootProgress(((i + 1) / bootSteps.length) * 100);
      }
      setFadeOut(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      onBootComplete();
    };

    bootSequence();
  }, [onBootComplete]);

  return (
    <div className={`h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center mb-16">
        <div className="relative w-24 h-24 mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-[spin_8s_linear_infinite]" />
          {/* Inner circle with pulse */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 animate-pulse opacity-50" />
            <div className="relative w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-blue-600 rounded-full" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-light text-white tracking-[0.3em] uppercase">
          Ref OS
        </h1>

        <div className={`transition-all duration-700 ${showVersion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="text-xs text-blue-400/80 tracking-[0.5em] uppercase mt-2 block">
            Version 2.0
          </span>
        </div>
      </div>

      {/* Progress area */}
      <div className="relative z-10 w-72 space-y-4">
        {/* Spinner + step text */}
        <div className="flex items-center justify-center gap-3 h-6">
          <div className="w-4 h-4 border-2 border-blue-400/40 border-t-blue-400 rounded-full animate-spin" />
          <span className="text-sm text-white/60 font-light">
            {currentStep}{dots}
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${bootProgress}%` }}
          />
          {/* Shimmer */}
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${bootProgress}%` }}
          />
        </div>

        <div className="text-center text-[11px] text-white/30 font-light tracking-wider">
          {Math.round(bootProgress)}%
        </div>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-8 flex flex-col items-center gap-1">
        <span className="text-[10px] text-white/20 tracking-[0.3em] uppercase">
          Brin Corporation
        </span>
        <span className="text-[10px] text-white/15">
          © 2024 All rights reserved
        </span>
      </div>
    </div>
  );
};

export default BootScreen;
