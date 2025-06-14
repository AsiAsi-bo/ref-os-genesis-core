
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Plane, Sphere } from '@react-three/drei';
import { useOS, AppName } from '@/context/OSContext';
import { useRef } from 'react';
import * as THREE from 'three';

const VRDesktop: React.FC = () => {
  const { openApp } = useOS();
  const sphereRef = useRef<THREE.Mesh>(null);

  // Animated background sphere
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.001;
      sphereRef.current.rotation.x += 0.0005;
    }
  });

  const handleAppLaunch = (appName: AppName) => {
    openApp(appName);
  };

  const apps = [
    { name: 'fileExplorer' as AppName, title: 'File Explorer', position: [-3, 0, -2] },
    { name: 'browser' as AppName, title: 'Browser', position: [-1, 0, -2] },
    { name: 'terminal' as AppName, title: 'Terminal', position: [1, 0, -2] },
    { name: 'settings' as AppName, title: 'Settings', position: [3, 0, -2] },
    { name: 'calculator' as AppName, title: 'Calculator', position: [-2, -1, -2] },
    { name: 'notepad' as AppName, title: 'Notepad', position: [0, -1, -2] },
    { name: 'weather' as AppName, title: 'Weather', position: [2, -1, -2] }
  ];

  return (
    <>
      {/* Environment sphere */}
      <Sphere ref={sphereRef} args={[50, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          attach="material"
          color="#1a1a2e"
          side={THREE.BackSide}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* Floor */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial attach="material" color="#2a2a3e" transparent opacity={0.7} />
      </Plane>

      {/* App icons */}
      {apps.map((app) => (
        <group key={app.name} position={app.position}>
          {/* App icon background */}
          <Plane
            args={[0.8, 0.8]}
            onClick={() => handleAppLaunch(app.name)}
          >
            <meshStandardMaterial
              attach="material"
              color="#4a5568"
              transparent
              opacity={0.9}
            />
          </Plane>
          
          {/* App title */}
          <Text
            position={[0, -0.6, 0.01]}
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {app.title}
          </Text>
        </group>
      ))}

      {/* Welcome text */}
      <Text
        position={[0, 3, -3]}
        fontSize={0.3}
        color="#60a5fa"
        anchorX="center"
        anchorY="middle"
      >
        Welcome to Ref OS VR
      </Text>
    </>
  );
};

export default VRDesktop;
