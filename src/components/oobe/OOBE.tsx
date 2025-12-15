
import React from 'react';
import { useOOBE } from '@/context/OOBEContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import WelcomeStep from './steps/WelcomeStep';
import PartitionStep from './steps/PartitionStep';
import PersonalizationStep from './steps/PersonalizationStep';
import PrivacyStep from './steps/PrivacyStep';
import FinalStep from './steps/FinalStep';

const OOBE: React.FC = () => {
  const { isCompleted, currentStep, totalSteps, nextStep, previousStep } = useOOBE();

  if (isCompleted) {
    return null;
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
    <Dialog open={!isCompleted} modal>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-refos-window border-refos-primary/20 text-white">
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
          {currentStep !== 1 && (
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OOBE;
