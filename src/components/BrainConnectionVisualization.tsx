import React, { useState, useRef, useEffect } from 'react';

interface BrainConnectionVisualizationProps {
  className?: string;
}

const BrainConnectionVisualization: React.FC<BrainConnectionVisualizationProps> = ({ className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [connections, setConnections] = useState<Array<{ id: number; delay: number; rotation: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate initial connections
    const initialConnections = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      delay: i * 0.3,
      rotation: (Math.random() - 0.5) * 30
    }));
    setConnections(initialConnections);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    setMousePosition({ x, y });

    // Generate new connections when mouse is in center area
    if (Math.abs(x) < 0.4) {
      const newConnections = Array.from({ length: 8 + Math.floor(Math.random() * 4) }, (_, i) => ({
        id: Date.now() + i,
        delay: i * 0.1,
        rotation: (Math.random() - 0.5) * 40
      }));
      setConnections(newConnections);
    }
  };

  const mouseInfluence = 1 - Math.abs(mousePosition.x);
  const connectionIntensity = 0.3 + mouseInfluence * 0.5;

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${className} overflow-hidden`}
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-pink-500/20 transition-all duration-500"
        style={{
          opacity: 0.4 + mouseInfluence * 0.3,
          transform: `scale(${1 + mouseInfluence * 0.1})`
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60" 
           style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 10}px)` }} />
      <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-50" 
           style={{ transform: `translate(${-mousePosition.x * 15}px, ${-mousePosition.y * 8}px)`, animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-70" 
           style={{ transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 12}px)`, animationDelay: '1s' }} />
      
      {/* Neural connection lines */}
      {connections.map((connection) => (
        <div
          key={connection.id}
          className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-400 origin-left transition-all duration-300"
          style={{
            opacity: connectionIntensity * 0.8,
            transform: `rotate(${connection.rotation + mousePosition.x * 10}deg) scaleX(${0.8 + mouseInfluence * 0.4})`,
            animationDelay: `${connection.delay}s`,
            filter: 'blur(0.5px)',
            boxShadow: `0 0 ${4 + mouseInfluence * 8}px rgba(6, 182, 212, ${0.3 + mouseInfluence * 0.4})`
          }}
        />
      ))}
      
      {/* Additional connection layers for depth */}
      {connections.slice(0, 3).map((connection) => (
        <div
          key={`layer2-${connection.id}`}
          className="absolute top-1/3 left-1/4 w-1/2 h-px bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 origin-left transition-all duration-500"
          style={{
            opacity: connectionIntensity * 0.6,
            transform: `rotate(${-connection.rotation + mousePosition.x * 8}deg) scaleX(${0.6 + mouseInfluence * 0.3})`,
            animationDelay: `${connection.delay + 0.2}s`,
            filter: 'blur(1px)'
          }}
        />
      ))}
      
      {connections.slice(3, 6).map((connection) => (
        <div
          key={`layer3-${connection.id}`}
          className="absolute top-2/3 left-1/4 w-1/2 h-px bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 origin-left transition-all duration-700"
          style={{
            opacity: connectionIntensity * 0.4,
            transform: `rotate(${connection.rotation * 0.7 + mousePosition.x * 5}deg) scaleX(${0.7 + mouseInfluence * 0.2})`,
            animationDelay: `${connection.delay + 0.4}s`,
            filter: 'blur(1.5px)'
          }}
        />
      ))}
      
      {/* Brain representations with pulsing effect */}
      <div 
        className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-400/40 to-blue-600/60 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        style={{
          transform: `translate(-50%, -50%) scale(${1 + mouseInfluence * 0.2})`,
          boxShadow: `0 0 ${20 + mouseInfluence * 20}px rgba(59, 130, 246, ${0.4 + mouseInfluence * 0.3})`,
          filter: 'blur(2px)'
        }}
      >
        <div className="absolute inset-2 bg-blue-300/30 rounded-full animate-pulse" />
        <div className="absolute inset-4 bg-blue-200/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <div 
        className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-br from-pink-400/40 to-pink-600/60 rounded-full transform translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        style={{
          transform: `translate(50%, -50%) scale(${1 + mouseInfluence * 0.2})`,
          boxShadow: `0 0 ${20 + mouseInfluence * 20}px rgba(236, 72, 153, ${0.4 + mouseInfluence * 0.3})`,
          filter: 'blur(2px)'
        }}
      >
        <div className="absolute inset-2 bg-pink-300/30 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
        <div className="absolute inset-4 bg-pink-200/40 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
      </div>
      
      {/* Center connection point that responds to mouse */}
      <div 
        className="absolute top-1/2 left-1/2 w-4 h-4 bg-white/80 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
        style={{
          opacity: mouseInfluence,
          transform: `translate(-50%, -50%) scale(${mouseInfluence * 2})`,
          boxShadow: `0 0 ${mouseInfluence * 30}px rgba(255, 255, 255, 0.8)`
        }}
      />
    </div>
  );
};

export default BrainConnectionVisualization;