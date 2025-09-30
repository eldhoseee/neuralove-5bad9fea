import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

interface BrainProps {
  position: [number, number, number];
  color: string;
  mousePosition: { x: number; y: number };
}

const Brain: React.FC<BrainProps> = ({ position, color, mousePosition }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      
      // Respond to mouse position
      const mouseInfluence = 1 - Math.abs(mousePosition.x);
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1 * mouseInfluence;
    }
  });

  // Create brain nodes
  const nodes = Array.from({ length: 12 }, (_, i) => {
    const phi = Math.acos(-1 + (2 * i) / 12);
    const theta = Math.sqrt(12 * Math.PI) * phi;
    
    return [
      1.3 * Math.cos(theta) * Math.sin(phi),
      1.3 * Math.sin(theta) * Math.sin(phi),
      1.3 * Math.cos(phi)
    ] as [number, number, number];
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main brain body */}
      <Sphere ref={meshRef} args={[1, 16, 12]}>
        <meshPhongMaterial 
          color={color} 
          transparent 
          opacity={0.7} 
          emissive={color}
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Neural nodes */}
      {nodes.map((nodePos, index) => (
        <Sphere key={index} position={nodePos} args={[0.05, 8, 6]}>
          <meshPhongMaterial 
            color="#ffffff" 
            emissive={color}
            emissiveIntensity={0.3}
          />
        </Sphere>
      ))}
    </group>
  );
};

interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  mousePosition: { x: number; y: number };
}

const Connection: React.FC<ConnectionProps> = ({ start, end, mousePosition }) => {
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      const mouseInfluence = 1 - Math.abs(mousePosition.x);
      materialRef.current.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2 + mouseInfluence * 0.4;
    }
  });

  // Create curved path
  const midPoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2 + (Math.random() - 0.5) * 2,
    (start[2] + end[2]) / 2 + (Math.random() - 0.5) * 1
  ];

  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(...start),
    new THREE.Vector3(...midPoint),
    new THREE.Vector3(...end)
  );

  const points = curve.getPoints(20);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial 
        ref={materialRef}
        color="#00ffff" 
        transparent 
        opacity={0.6}
      />
    </line>
  );
};

const BrainScene: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  const { camera } = useThree();
  
  React.useEffect(() => {
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Generate connections based on mouse position
  const connections = React.useMemo(() => {
    const connectionCount = 3 + Math.floor(Math.abs(mousePosition.x) * 5);
    return Array.from({ length: connectionCount }, (_, i) => {
      const startAngle = (i / connectionCount) * Math.PI * 2;
      const endAngle = ((i + Math.random() - 0.5) / connectionCount) * Math.PI * 2;
      
      return {
        start: [
          -3 + Math.cos(startAngle) * 1.2,
          Math.sin(startAngle) * 1.2,
          (Math.random() - 0.5) * 2
        ] as [number, number, number],
        end: [
          3 + Math.cos(endAngle) * 1.2,
          Math.sin(endAngle) * 1.2,
          (Math.random() - 0.5) * 2
        ] as [number, number, number]
      };
    });
  }, [mousePosition.x]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      <Brain 
        position={[-3, 0, 0]} 
        color="#6366f1" 
        mousePosition={mousePosition}
      />
      <Brain 
        position={[3, 0, 0]} 
        color="#ec4899" 
        mousePosition={mousePosition}
      />
      
      {connections.map((connection, index) => (
        <Connection
          key={index}
          start={connection.start}
          end={connection.end}
          mousePosition={mousePosition}
        />
      ))}
    </>
  );
};

interface BrainConnectionVisualizationProps {
  className?: string;
}

const BrainConnectionVisualization: React.FC<BrainConnectionVisualizationProps> = ({ className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  console.log("BrainConnectionVisualization mounting");

  React.useEffect(() => {
    console.log("BrainConnectionVisualization mounted");
    setIsLoaded(true);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    setMousePosition({ x, y });
    console.log("Mouse position:", { x, y });
  };

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Fallback visualization */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50" />
      
      {/* Neural connection lines as CSS */}
      <div className="absolute top-1/2 left-1/4 w-1/2 h-px bg-cyan-400 opacity-60 animate-pulse" 
           style={{ transform: `rotate(${mousePosition.x * 10}deg)` }} />
      <div className="absolute top-1/3 left-1/4 w-1/2 h-px bg-cyan-400 opacity-60 animate-pulse" 
           style={{ transform: `rotate(${-mousePosition.x * 15}deg)`, animationDelay: '0.5s' }} />
      <div className="absolute top-2/3 left-1/4 w-1/2 h-px bg-cyan-400 opacity-60 animate-pulse" 
           style={{ transform: `rotate(${mousePosition.x * 8}deg)`, animationDelay: '1s' }} />
      
      {/* Brain representations */}
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-pink-500/30 rounded-full transform translate-x-1/2 -translate-y-1/2 animate-pulse" 
           style={{ animationDelay: '0.3s' }} />
      
      {isLoaded && (
        <Canvas camera={{ fov: 75, near: 0.1, far: 1000 }}>
          <BrainScene mousePosition={mousePosition} />
        </Canvas>
      )}
    </div>
  );
};

export default BrainConnectionVisualization;