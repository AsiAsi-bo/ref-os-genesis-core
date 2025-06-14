
import React, { useRef } from 'react';
import { useVR } from '@/context/VRContext';
import { useOS } from '@/context/OSContext';
import { Canvas } from '@react-three/fiber';
import { XR, Controllers, Hands } from '@react-three/xr';
import VRDesktop from './VRDesktop';
import VRWindow from './VRWindow';

const VRInterface: React.FC = () => {
  const { isVRActive } = useVR();
  const { apps } = useOS();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!isVRActive) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 1.6, 3], fov: 75 }}
        className="w-full h-full"
      >
        <XR>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          {/* VR Controllers and Hand Tracking */}
          <Controllers />
          <Hands />

          {/* VR Desktop Environment */}
          <VRDesktop />

          {/* VR Windows for each open app */}
          {apps.filter(app => !app.isMinimized).map((app, index) => (
            <VRWindow
              key={app.id}
              app={app}
              position={[
                -2 + (index % 3) * 2,
                1.5,
                -1 - Math.floor(index / 3) * 1.5
              ]}
            />
          ))}
        </XR>
      </Canvas>
    </div>
  );
};

export default VRInterface;
