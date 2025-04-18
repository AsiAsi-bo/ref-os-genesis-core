
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface InstallerContextType {
  isInstalling: boolean;
  installProgress: number;
  installComplete: boolean;
  startInstallation: () => void;
  completeInstallation: () => void;
  setProgress: (progress: number) => void;
}

const InstallerContext = createContext<InstallerContextType | undefined>(undefined);

export const InstallerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [installComplete, setInstallComplete] = useState(false);

  const startInstallation = () => {
    setIsInstalling(true);
    setInstallProgress(0);
  };

  const completeInstallation = () => {
    setInstallComplete(true);
    setIsInstalling(false);
    setInstallProgress(100);
  };

  const setProgress = (progress: number) => {
    setInstallProgress(progress);
  };

  return (
    <InstallerContext.Provider
      value={{
        isInstalling,
        installProgress,
        installComplete,
        startInstallation,
        completeInstallation,
        setProgress,
      }}
    >
      {children}
    </InstallerContext.Provider>
  );
};

export const useInstaller = () => {
  const context = useContext(InstallerContext);
  if (context === undefined) {
    throw new Error('useInstaller must be used within an InstallerProvider');
  }
  return context;
};
