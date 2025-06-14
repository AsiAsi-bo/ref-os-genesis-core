
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface VRContextType {
  isVRSupported: boolean;
  isVRActive: boolean;
  vrSession: XRSession | null;
  enterVR: () => Promise<void>;
  exitVR: () => Promise<void>;
  vrError: string | null;
}

const VRContext = createContext<VRContextType | undefined>(undefined);

export const VRProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVRSupported, setIsVRSupported] = useState(false);
  const [isVRActive, setIsVRActive] = useState(false);
  const [vrSession, setVRSession] = useState<XRSession | null>(null);
  const [vrError, setVRError] = useState<string | null>(null);

  useEffect(() => {
    // Check if WebXR is supported
    if ('xr' in navigator) {
      navigator.xr?.isSessionSupported('immersive-vr').then(supported => {
        setIsVRSupported(supported);
      }).catch(() => {
        setIsVRSupported(false);
      });
    }
  }, []);

  const enterVR = async () => {
    if (!isVRSupported || !navigator.xr) {
      setVRError('VR not supported on this device');
      return;
    }

    try {
      const session = await navigator.xr.requestSession('immersive-vr', {
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['bounded-floor', 'hand-tracking']
      });
      
      setVRSession(session);
      setIsVRActive(true);
      setVRError(null);
      
      // Handle session end
      session.addEventListener('end', () => {
        setVRSession(null);
        setIsVRActive(false);
      });
      
      console.log('VR session started');
    } catch (error) {
      setVRError(`Failed to start VR session: ${error}`);
      console.error('VR session error:', error);
    }
  };

  const exitVR = async () => {
    if (vrSession) {
      await vrSession.end();
      setVRSession(null);
      setIsVRActive(false);
    }
  };

  return (
    <VRContext.Provider value={{
      isVRSupported,
      isVRActive,
      vrSession,
      enterVR,
      exitVR,
      vrError
    }}>
      {children}
    </VRContext.Provider>
  );
};

export const useVR = () => {
  const context = useContext(VRContext);
  if (context === undefined) {
    throw new Error('useVR must be used within a VRProvider');
  }
  return context;
};
