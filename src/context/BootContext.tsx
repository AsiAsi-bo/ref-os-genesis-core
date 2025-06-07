
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BootContextType {
  bootComplete: boolean;
  completeBootSequence: () => void;
}

const BootContext = createContext<BootContextType | undefined>(undefined);

export const BootProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bootComplete, setBootComplete] = useState(false);

  const completeBootSequence = () => {
    setBootComplete(true);
  };

  return (
    <BootContext.Provider
      value={{
        bootComplete,
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
