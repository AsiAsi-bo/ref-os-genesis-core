
import React, { useState } from 'react';
import { useOOBE } from '@/context/OOBEContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import WelcomeStep from './steps/WelcomeStep';
import PartitionStep from './steps/PartitionStep';
import PersonalizationStep from './steps/PersonalizationStep';
import PrivacyStep from './steps/PrivacyStep';
import FinalStep from './steps/FinalStep';

const OOBE: React.FC = () => {
  const { isCompleted, currentStep, totalSteps, nextStep, previousStep } = useOOBE();
  const [hasCrashed, setHasCrashed] = useState(false);

  if (isCompleted) {
    return null;
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && !isCompleted) {
      // User tried to close the setup - trigger crash
      setHasCrashed(true);
    }
  };

  // BSOD-style crash screen
  if (hasCrashed) {
    return (
      <div className="fixed inset-0 bg-[#0078d7] z-[9999] flex flex-col items-center justify-center text-white font-mono p-8 animate-in fade-in duration-300">
        <div className="max-w-2xl">
          <div className="text-8xl mb-8">:(</div>
          <h1 className="text-2xl mb-4">Your PC ran into a problem and needs to restart.</h1>
          <p className="text-lg mb-8">
            We're just collecting some error info, and then we'll restart for you.
          </p>
          <div className="mb-8">
            <p className="text-sm mb-2">0% complete</p>
            <div className="w-64 h-1 bg-white/30 rounded">
              <div className="h-full bg-white rounded animate-pulse" style={{ width: '0%' }}></div>
            </div>
          </div>
          <div className="text-sm space-y-2">
            <p>Stop code: SETUP_WIZARD_TERMINATED</p>
            <p className="text-white/70">
              If you'd like to know more, you can search online later for this error: OOBE_CRITICAL_FAILURE
            </p>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <div className="w-24 h-24 border-4 border-white flex items-center justify-center">
              <span className="text-4xl">QR</span>
            </div>
            <div className="text-xs text-white/70">
              <p>For more information about this issue and possible fixes,</p>
              <p>visit https://refos.error/OOBE_FAILURE</p>
            </div>
          </div>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-8 bg-white/20 hover:bg-white/30 text-white"
          >
            Restart System
          </Button>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PartitionStep />;
      case 2:
        return <WelcomeStep />;
      case 3:
        return <PersonalizationStep />;
      case 4:
        return <PrivacyStep />;
      case 5:
        return <FinalStep />;
      default:
        return <PartitionStep />;
    }
  };

  return (
    <Dialog open={!isCompleted} onOpenChange={handleOpenChange} modal>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-refos-window border-refos-primary/20 text-white">
        <VisuallyHidden>
          <DialogTitle>Ref OS Setup</DialogTitle>
        </VisuallyHidden>
        <div className="flex flex-col h-[600px]">
          {/* Header with progress indicator */}
          <div className="bg-refos-window border-b border-white/10 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Welcome to Ref OS</h2>
              <div className="text-sm text-white/70">
                Step {currentStep} of {totalSteps}
              </div>
            </div>
            <div className="mt-2 w-full bg-white/10 h-1 rounded overflow-hidden">
              <div 
                className="bg-refos-primary h-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Step content */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderStepContent()}
          </div>
          
          {/* Footer with buttons */}
          <div className="p-4 border-t border-white/10 flex justify-between items-center bg-refos-window/80">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={currentStep === 1}
              className="text-white border-white/20 hover:bg-white/10 hover:text-white"
            >
              Back
            </Button>
            <div className="text-sm text-white/70">
              {currentStep === totalSteps ? 'Let\'s get started!' : 'Please complete setup to continue'}
            </div>
            <Button onClick={nextStep} className="bg-refos-primary hover:bg-refos-primary/80">
              {currentStep === totalSteps ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OOBE;
