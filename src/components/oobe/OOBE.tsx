
import React, { useState, useEffect } from 'react';
import { useOOBE } from '@/context/OOBEContext';
import { Button } from '@/components/ui/button';
import WelcomeStep from './steps/WelcomeStep';
import PersonalizationStep from './steps/PersonalizationStep';
import PrivacyStep from './steps/PrivacyStep';
import FinalStep from './steps/FinalStep';

const STEP_LABELS = ['Welcome', 'Personalize', 'Privacy', 'Finish'];

const OOBE: React.FC = () => {
  const { isCompleted, currentStep, totalSteps, nextStep, previousStep } = useOOBE();
  const [hasCrashed, setHasCrashed] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [displayStep, setDisplayStep] = useState(currentStep);

  useEffect(() => {
    if (currentStep !== displayStep) {
      setAnimating(true);
      const t = setTimeout(() => {
        setDisplayStep(currentStep);
        setAnimating(false);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [currentStep, displayStep]);

  // Keyboard escape → crash
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isCompleted) {
        setHasCrashed(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isCompleted]);

  if (isCompleted) return null;

  if (hasCrashed) {
    return (
      <div className="fixed inset-0 bg-[#0078d7] z-[9999] flex flex-col items-center justify-center text-white font-mono p-8 animate-in fade-in duration-300">
        <div className="max-w-2xl">
          <div className="text-8xl mb-8">:(</div>
          <h1 className="text-2xl mb-4">Your PC ran into a problem and needs to restart.</h1>
          <p className="text-lg mb-8">We're just collecting some error info, and then we'll restart for you.</p>
          <div className="mb-8">
            <p className="text-sm mb-2">0% complete</p>
            <div className="w-64 h-1 bg-white/30 rounded">
              <div className="h-full bg-white rounded animate-pulse" style={{ width: '0%' }}></div>
            </div>
          </div>
          <div className="text-sm space-y-2">
            <p>Stop code: SETUP_WIZARD_TERMINATED</p>
            <p className="text-white/70">If you'd like to know more, search for: OOBE_CRITICAL_FAILURE</p>
          </div>
          <Button onClick={() => window.location.reload()} className="mt-8 bg-white/20 hover:bg-white/30 text-white">
            Restart System
          </Button>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (displayStep) {
      case 1: return <WelcomeStep />;
      case 2: return <PersonalizationStep />;
      case 3: return <PrivacyStep />;
      case 4: return <FinalStep />;
      default: return <WelcomeStep />;
    }
  };

  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center oobe-backdrop">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0d1033] to-[#1a0a2e] overflow-hidden">
        <div className="oobe-orb oobe-orb-1" />
        <div className="oobe-orb oobe-orb-2" />
        <div className="oobe-orb oobe-orb-3" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-50" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-[780px] mx-4">
        {/* Step indicator - floating pills */}
        <div className="flex justify-center gap-3 mb-6">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === currentStep;
            const isDone = stepNum < currentStep;
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-500
                  ${isActive ? 'bg-white/15 text-white backdrop-blur-md border border-white/20 shadow-lg shadow-purple-500/10' : ''}
                  ${isDone ? 'bg-white/5 text-white/60' : ''}
                  ${!isActive && !isDone ? 'text-white/30' : ''}
                `}>
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
                    ${isActive ? 'bg-gradient-to-br from-purple-400 to-pink-500 text-white' : ''}
                    ${isDone ? 'bg-green-500/80 text-white' : ''}
                    ${!isActive && !isDone ? 'bg-white/10 text-white/40' : ''}
                  `}>
                    {isDone ? '✓' : stepNum}
                  </div>
                  <span className="hidden sm:inline">{label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main card */}
        <div className="oobe-card rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-900/20">
          {/* Progress bar */}
          <div className="h-1 bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Content */}
          <div className={`p-8 sm:p-10 min-h-[420px] flex flex-col transition-all duration-250 ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <div className="flex-1">
              {renderStepContent()}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 sm:px-10 py-5 border-t border-white/5 flex justify-between items-center bg-white/[0.02]">
            <Button
              variant="ghost"
              onClick={previousStep}
              disabled={currentStep === 1}
              className="text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-0"
            >
              ← Back
            </Button>
            <div className="text-xs text-white/30 font-mono tracking-wider">
              {currentStep}/{totalSteps}
            </div>
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white border-0 px-8 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105"
            >
              {currentStep === totalSteps ? 'Launch Ref OS →' : 'Continue →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OOBE;
