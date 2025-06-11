'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, Float, Environment, Sphere, MeshDistortMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, scale, color, isMobile }: { 
  position: [number, number, number], 
  scale: number, 
  color: string,
  isMobile: boolean 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * (isMobile ? 0.2 : 0.5);
    }
  });

  if (isMobile && scale < 0.3) return null;

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={isMobile ? scale * 0.7 : scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          wireframe={!isMobile}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

const MorphingSphere = ({ isMobile }: { isMobile: boolean }) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Sphere 
      ref={sphereRef} 
      visible 
      args={[1, isMobile ? 32 : 100, isMobile ? 64 : 200]} 
      scale={isMobile ? 1.5 : 2} 
      position={isMobile ? [2, 0, -5] : [4, 0, 0]}
    >
      <MeshDistortMaterial
        color="#915EFF"
        attach="material"
        distort={isMobile ? 0.3 : 0.5}
        speed={2}
        roughness={0}
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
};

const ParticleField = ({ isMobile }: { isMobile: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = isMobile ? 1000 : 5000;
  
  useEffect(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * (isMobile ? 20 : 50);
      positions[i + 1] = (Math.random() - 0.5) * (isMobile ? 20 : 50);
      positions[i + 2] = (Math.random() - 0.5) * (isMobile ? 20 : 50);
      
      colors[i] = Math.random();
      colors[i + 1] = 0.3 + Math.random() * 0.7;
      colors[i + 2] = 1;
    }
    
    if (pointsRef.current) {
      pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pointsRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  }, [isMobile]);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={isMobile ? 0.15 : 0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Computer = ({ isMobile }: { isMobile: boolean }) => {
  const computer = useGLTF('/planets/scene.gltf');
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <group ref={groupRef}>
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.7 : 0.75}
          position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
          rotation={[-0.01, -0.2, -0.1]}
        />
      </group>
    </Float>
  );
};

const FloatingText = ({ isMobile }: { isMobile: boolean }) => {
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  if (isMobile) return null;

  return (
    <Text
      ref={textRef}
      position={[-4, 2, 0]}
      fontSize={0.5}
      color="#915EFF"
      anchorX="center"
      anchorY="middle"
      font="/fonts/helvetiker_regular.typeface.json"
    >
      DEVELOPER
    </Text>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ 
        position: isMobile ? [10, 3, 10] : [20, 3, 5], 
        fov: isMobile ? 30 : 25 
      }}
      gl={{ preserveDrawingBuffer: true }}
      className="cursor-grab active:cursor-grabbing"
    >
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={isMobile ? 0.3 : 0.5}
        />
        
        <ambientLight intensity={isMobile ? 0.2 : 0.15} />
        <pointLight intensity={isMobile ? 0.8 : 1} position={[10, 10, 10]} />
        {!isMobile && (
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={1024}
          />
        )}
        
        <Environment preset={isMobile ? "dawn" : "night"} />
        
        <Computer isMobile={isMobile} />
        <ParticleField isMobile={isMobile} />
        <MorphingSphere isMobile={isMobile} />
        <FloatingText isMobile={isMobile} />
        
        {!isMobile && (
          <>
            <FloatingShape position={[-6, 1, -3]} scale={0.5} color="#FF6B6B" isMobile={isMobile} />
            <FloatingShape position={[6, -1, -4]} scale={0.7} color="#4ECDC4" isMobile={isMobile} />
            <FloatingShape position={[2, 3, -2]} scale={0.4} color="#45B7D1" isMobile={isMobile} />
            <FloatingShape position={[-3, -2, -5]} scale={0.6} color="#96CEB4" isMobile={isMobile} />
          </>
        )}
        {isMobile && (
          <>
            <FloatingShape position={[-3, 1, -4]} scale={0.5} color="#FF6B6B" isMobile={isMobile} />
            <FloatingShape position={[3, -1, -5]} scale={0.6} color="#4ECDC4" isMobile={isMobile} />
          </>
        )}
      </Suspense>
      
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;