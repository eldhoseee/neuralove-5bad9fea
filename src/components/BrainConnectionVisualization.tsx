import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface BrainConnectionVisualizationProps {
  className?: string;
}

const BrainConnectionVisualization: React.FC<BrainConnectionVisualizationProps> = ({ className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const connectionsRef = useRef<THREE.Line[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create brain-like structures using spheres with some deformation
    const createBrainShape = (position: THREE.Vector3, color: number) => {
      const group = new THREE.Group();
      
      // Main brain body
      const brainGeometry = new THREE.SphereGeometry(1, 16, 12);
      const brainMaterial = new THREE.MeshPhongMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.7,
        wireframe: false
      });
      const brainMesh = new THREE.Mesh(brainGeometry, brainMaterial);
      
      // Add some bumps to make it more brain-like
      const vertices = brainGeometry.attributes.position.array;
      for (let i = 0; i < vertices.length; i += 3) {
        const noise = (Math.random() - 0.5) * 0.2;
        vertices[i] += noise;
        vertices[i + 1] += noise;
        vertices[i + 2] += noise;
      }
      brainGeometry.attributes.position.needsUpdate = true;
      brainGeometry.computeVertexNormals();
      
      group.add(brainMesh);
      
      // Add neural nodes
      for (let i = 0; i < 20; i++) {
        const nodeGeometry = new THREE.SphereGeometry(0.05, 8, 6);
        const nodeMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xffffff,
          emissive: color,
          emissiveIntensity: 0.3
        });
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        
        // Position nodes on surface of brain
        const phi = Math.acos(-1 + (2 * i) / 20);
        const theta = Math.sqrt(20 * Math.PI) * phi;
        
        node.position.x = 1.2 * Math.cos(theta) * Math.sin(phi);
        node.position.y = 1.2 * Math.sin(theta) * Math.sin(phi);
        node.position.z = 1.2 * Math.cos(phi);
        
        group.add(node);
      }
      
      group.position.copy(position);
      return group;
    };

    // Create two brains
    const leftBrain = createBrainShape(new THREE.Vector3(-3, 0, 0), 0x6366f1);
    const rightBrain = createBrainShape(new THREE.Vector3(3, 0, 0), 0xec4899);
    
    scene.add(leftBrain);
    scene.add(rightBrain);

    // Create connection lines
    const createConnections = () => {
      // Clear existing connections
      connectionsRef.current.forEach(line => scene.remove(line));
      connectionsRef.current = [];

      const connectionCount = 5 + Math.floor(Math.random() * 10);
      
      for (let i = 0; i < connectionCount; i++) {
        const points = [];
        
        // Start point on left brain
        const startAngle = (i / connectionCount) * Math.PI * 2;
        const startPoint = new THREE.Vector3(
          -3 + Math.cos(startAngle) * 1.2,
          Math.sin(startAngle) * 1.2,
          (Math.random() - 0.5) * 2
        );
        
        // End point on right brain
        const endAngle = ((i + Math.random() - 0.5) / connectionCount) * Math.PI * 2;
        const endPoint = new THREE.Vector3(
          3 + Math.cos(endAngle) * 1.2,
          Math.sin(endAngle) * 1.2,
          (Math.random() - 0.5) * 2
        );
        
        // Create curved path
        const midPoint = new THREE.Vector3().lerpVectors(startPoint, endPoint, 0.5);
        midPoint.y += (Math.random() - 0.5) * 2;
        midPoint.z += (Math.random() - 0.5) * 1;
        
        // Create curve
        const curve = new THREE.QuadraticBezierCurve3(startPoint, midPoint, endPoint);
        const curvePoints = curve.getPoints(20);
        
        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const material = new THREE.LineBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.6 + Math.random() * 0.4
        });
        
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        connectionsRef.current.push(line);
      }
    };

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Trigger new connections when mouse is in the middle area
      if (Math.abs(mouseRef.current.x) < 0.3) {
        createConnections();
      }
    };

    // Initial connections
    createConnections();

    // Position camera
    camera.position.z = 8;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate brains slowly
      leftBrain.rotation.y += 0.005;
      rightBrain.rotation.y -= 0.005;
      
      // Animate connections
      connectionsRef.current.forEach((line, index) => {
        const material = line.material as THREE.LineBasicMaterial;
        material.opacity = 0.3 + Math.sin(Date.now() * 0.003 + index) * 0.3;
      });

      // Mouse influence on connections
      const mouseIntensity = 1 - Math.abs(mouseRef.current.x);
      connectionsRef.current.forEach(line => {
        const material = line.material as THREE.LineBasicMaterial;
        material.opacity *= 0.5 + mouseIntensity * 0.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Event listeners
    mountRef.current.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default BrainConnectionVisualization;