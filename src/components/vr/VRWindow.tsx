
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane, Text, Html } from '@react-three/drei';
import { App } from '@/types/app';
import { useOS } from '@/context/OSContext';
import * as THREE from 'three';

interface VRWindowProps {
  app: App;
  position: [number, number, number];
}

const VRWindow: React.FC<VRWindowProps> = ({ app, position }) => {
  const { closeApp, focusApp } = useOS();
  const windowRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    if (windowRef.current && isHovered) {
      windowRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1);
    } else if (windowRef.current) {
      windowRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  const handleWindowClick = () => {
    focusApp(app.id);
  };

  const handleCloseClick = (e: any) => {
    e.stopPropagation();
    closeApp(app.id);
  };

  return (
    <group ref={windowRef} position={position}>
      {/* Window frame */}
      <Plane
        args={[2.4, 1.8]}
        onClick={handleWindowClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <meshStandardMaterial
          color="#2d3748"
          transparent
          opacity={0.95}
        />
      </Plane>

      {/* Title bar */}
      <Plane args={[2.4, 0.2]} position={[0, 0.8, 0.01]}>
        <meshStandardMaterial color="#4a5568" />
      </Plane>

      {/* Title text */}
      <Text
        position={[-1, 0.8, 0.02]}
        fontSize={0.08}
        color="white"
        anchorX="left"
        anchorY="middle"
      >
        {app.title}
      </Text>

      {/* Close button */}
      <Plane
        args={[0.15, 0.15]}
        position={[1.05, 0.8, 0.02]}
        onClick={handleCloseClick}
      >
        <meshStandardMaterial color="#e53e3e" />
      </Plane>

      {/* Close button X */}
      <Text
        position={[1.05, 0.8, 0.03]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        ×
      </Text>

      {/* Window content area */}
      <Plane args={[2.2, 1.4]} position={[0, -0.1, 0.01]}>
        <meshStandardMaterial color="#1a202c" />
      </Plane>

      {/* Content placeholder */}
      <Html
        position={[0, -0.1, 0.02]}
        transform
        occlude
        style={{
          width: '400px',
          height: '300px',
          background: 'rgba(26, 32, 44, 0.9)',
          border: '1px solid #4a5568',
          borderRadius: '4px',
          color: 'white',
          padding: '10px',
          fontSize: '12px',
          overflow: 'hidden'
        }}
      >
        <div className="text-center">
          <h3>{app.title}</h3>
          <p>VR Mode - App content rendered here</p>
        </div>
      </Html>
    </group>
  );
};

export default VRWindow;
