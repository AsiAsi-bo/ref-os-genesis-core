
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [bootProgress, setBootProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing system...');

  const bootSteps = [
    'Initializing system...',
    'Loading kernel modules...',
    'Starting system services...',
    'Mounting file systems...',
    'Configuring network interfaces...',
    'Loading user interface...',
    'System ready'
  ];

  useEffect(() => {
    const bootSequence = async () => {
      for (let i = 0; i < bootSteps.length; i++) {
        setCurrentStep(bootSteps[i]);
        
        // Simulate boot time for each step
        const stepDuration = i === bootSteps.length - 1 ? 500 : 800;
        const progressIncrement = 100 / bootSteps.length;
        
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        setBootProgress((i + 1) * progressIncrement);
      }
      
      // Wait a moment before completing boot
      await new Promise(resolve => setTimeout(resolve, 500));
      onBootComplete();
    };

    bootSequence();
  }, [onBootComplete]);

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Logo/Brand */}
      <div className="mb-8">
        <div className="w-20 h-20 bg-refos-primary rounded-full flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-refos-primary rounded-full"></div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center">Ref OS</h1>
        <p className="text-white/60 text-center mt-1">Version 1.0</p>
      </div>

      {/* Boot Progress */}
      <div className="w-80 space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Loader2 className="animate-spin h-5 w-5" />
          <span className="text-sm text-white/80">{currentStep}</span>
        </div>
        
        <Progress 
          value={bootProgress} 
          className="h-2 bg-white/10" 
        />
        
        <div className="text-center text-xs text-white/60">
          {Math.round(bootProgress)}% Complete
        </div>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-8 text-xs text-white/40">
        © 2024 Ref OS. All rights reserved.
      </div>
    </div>
  );
};

export default BootScreen;
