
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type BootPhase = 'bios' | 'booting' | 'complete';

export interface BootContextType {
  bootPhase: BootPhase;
  bootComplete: boolean;
  completeBIOS: () => void;
  completeBootSequence: () => void;
}

const BootContext = createContext<BootContextType | undefined>(undefined);

export const BootProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bootPhase, setBootPhase] = useState<BootPhase>('bios');

  const completeBIOS = () => setBootPhase('booting');
  const completeBootSequence = () => setBootPhase('complete');

  return (
    <BootContext.Provider
      value={{
        bootPhase,
        bootComplete: bootPhase === 'complete',
        completeBIOS,
        completeBootSequence,
      }}
    >
      {children}
    </BootContext.Provider>
  );
};

export const useBoot = () => {
  const context = useContext(BootContext);
  if (context === undefined) {
    throw new Error('useBoot must be used within a BootProvider');
  }
  return context;
};
