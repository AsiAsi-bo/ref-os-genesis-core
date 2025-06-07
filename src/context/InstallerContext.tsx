
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface InstallerContextType {
  isInstalling: boolean;
  installProgress: number;
  installComplete: boolean;
  startInstallation: () => void;
  completeInstallation: () => void;
  setProgress: (progress: number) => void;
  resetInstallation: () => void;
}

const InstallerContext = createContext<InstallerContextType | undefined>(undefined);

export const InstallerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [installComplete, setInstallComplete] = useState(false);

  // Check if installation has been completed before
  useEffect(() => {
    const installationCompleted = localStorage.getItem('installation-completed');
    if (installationCompleted === 'true') {
      setInstallComplete(true);
    }
  }, []);

  const startInstallation = () => {
    setIsInstalling(true);
    setInstallProgress(0);
  };

  const completeInstallation = () => {
    setInstallComplete(true);
    setIsInstalling(false);
    setInstallProgress(100);
    localStorage.setItem('installation-completed', 'true');
  };

  const setProgress = (progress: number) => {
    setInstallProgress(progress);
  };

  const resetInstallation = () => {
    setInstallComplete(false);
    setIsInstalling(false);
    setInstallProgress(0);
    localStorage.removeItem('installation-completed');
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
        resetInstallation,
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
