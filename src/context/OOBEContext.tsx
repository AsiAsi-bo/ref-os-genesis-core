
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OOBEContextType {
  isCompleted: boolean;
  currentStep: number;
  totalSteps: number;
  setCompleted: (value: boolean) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  resetOOBE: () => void;
}

const OOBEContext = createContext<OOBEContextType | undefined>(undefined);

export const OOBEProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5; // Updated to include partition step
  
  // Check if OOBE has been completed before
  useEffect(() => {
    const oobeCompleted = localStorage.getItem('oobe-completed');
    if (oobeCompleted === 'true') {
      setIsCompleted(true);
    }
  }, []);
  
  const setCompleted = (value: boolean) => {
    setIsCompleted(value);
    localStorage.setItem('oobe-completed', value.toString());
  };
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // OOBE completed
      setCompleted(true);
    }
  };
  
  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };
  
  const resetOOBE = () => {
    setIsCompleted(false);
    setCurrentStep(1);
    localStorage.removeItem('oobe-completed');
  };
  
  return (
    <OOBEContext.Provider 
      value={{
        isCompleted,
        currentStep,
        totalSteps,
        setCompleted,
        nextStep,
        previousStep,
        goToStep,
        resetOOBE
      }}
    >
      {children}
    </OOBEContext.Provider>
  );
};

export const useOOBE = () => {
  const context = useContext(OOBEContext);
  if (context === undefined) {
    throw new Error('useOOBE must be used within an OOBEProvider');
  }
  return context;
};
