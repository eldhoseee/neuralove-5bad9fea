import React, { useState, useRef, useEffect } from 'react';

interface BrainConnectionVisualizationProps {
  className?: string;
}

const BrainConnectionVisualization: React.FC<BrainConnectionVisualizationProps> = ({ className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [connections, setConnections] = useState<Array<{ 
    id: number; 
    delay: number; 
    rotation: number;
    opacity: number;
    length: number;
  }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Generate flowing connections that update continuously
    const updateConnections = () => {
      const connectionCount = 8 + Math.floor(Math.abs(mousePosition.x) * 6);
      const newConnections = Array.from({ length: connectionCount }, (_, i) => ({
        id: i,
        delay: i * 0.1,
        rotation: (i / connectionCount) * 360 + mousePosition.x * 30,
        opacity: 0.3 + Math.abs(mousePosition.x) * 0.5,
        length: 0.6 + Math.abs(mousePosition.x) * 0.4
      }));
      setConnections(newConnections);
      
      animationRef.current = requestAnimationFrame(updateConnections);
    };

    updateConnections();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    setMousePosition({ x, y });
  };

  const mouseInfluence = Math.max(0.2, 1 - Math.sqrt(mousePosition.x * mousePosition.x + mousePosition.y * mousePosition.y));

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${className} overflow-hidden pointer-events-auto cursor-none`}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic background that responds to mouse */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-transparent via-neural-blue/10 to-transparent transition-all duration-500"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 25}% ${50 + mousePosition.y * 25}%, 
                      rgba(99, 102, 241, 0.15) 0%, 
                      rgba(147, 51, 234, 0.1) 30%, 
                      rgba(236, 72, 153, 0.08) 60%, 
                      transparent 80%)`
        }}
      />
      
      {/* Flowing particles that follow cursor */}
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-300 rounded-full transition-all duration-300 ease-out"
          style={{
            left: `${30 + (mousePosition.x + 1) * 20 + Math.sin(Date.now() * 0.001 + i) * 10}%`,
            top: `${40 + (mousePosition.y + 1) * 15 + Math.cos(Date.now() * 0.001 + i) * 10}%`,
            opacity: mouseInfluence * (0.4 + Math.sin(Date.now() * 0.002 + i) * 0.3),
            transform: `scale(${0.5 + mouseInfluence * 1.5})`,
            boxShadow: `0 0 ${mouseInfluence * 10}px rgba(6, 182, 212, 0.6)`
          }}
        />
      ))}
      
      {/* Neural connection lines that flow */}
      {connections.map((connection, index) => (
        <div key={connection.id}>
          {/* Main connection line */}
          <div
            className="absolute origin-left transition-all duration-200 ease-out"
            style={{
              left: '25%',
              top: '50%',
              width: `${connection.length * 50}%`,
              height: '2px',
              background: `linear-gradient(90deg, 
                         rgba(6, 182, 212, ${connection.opacity}) 0%, 
                         rgba(139, 92, 246, ${connection.opacity * 0.8}) 30%,
                         rgba(236, 72, 153, ${connection.opacity}) 60%,
                         rgba(6, 182, 212, ${connection.opacity * 0.6}) 100%)`,
              transform: `rotate(${connection.rotation}deg) translateY(-50%)`,
              filter: `blur(${1 - mouseInfluence}px)`,
              boxShadow: `0 0 ${mouseInfluence * 15}px rgba(6, 182, 212, ${connection.opacity * 0.5})`
            }}
          />
          
          {/* Flowing energy pulses */}
          <div
            className="absolute origin-left"
            style={{
              left: '25%',
              top: '50%',
              width: '4px',
              height: '4px',
              background: `radial-gradient(circle, rgba(255, 255, 255, ${connection.opacity}) 0%, transparent 70%)`,
              transform: `rotate(${connection.rotation}deg) translateX(${(connection.length * 300 * (0.3 + Math.sin(Date.now() * 0.003 + index * 0.5) * 0.7))}px) translateY(-50%)`,
              borderRadius: '50%',
              boxShadow: `0 0 ${mouseInfluence * 20}px rgba(255, 255, 255, 0.8)`
            }}
          />
        </div>
      ))}
      
      {/* Left Heart-shaped Brain */}
      <div 
        className="absolute transition-all duration-300 ease-out"
        style={{
          left: '20%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${1 + mouseInfluence * 0.3}) rotate(${mousePosition.x * 5}deg)`
        }}
      >
        {/* Heart shape using CSS */}
        <div 
          className="relative w-16 h-16 transition-all duration-300"
          style={{
            background: `linear-gradient(45deg, 
                        rgba(99, 102, 241, ${0.6 + mouseInfluence * 0.4}), 
                        rgba(139, 92, 246, ${0.5 + mouseInfluence * 0.3}))`,
            borderRadius: '50px 50px 0 0',
            transform: 'rotate(-45deg)',
            filter: `blur(${2 - mouseInfluence * 1.5}px)`,
            boxShadow: `0 0 ${20 + mouseInfluence * 30}px rgba(99, 102, 241, ${0.4 + mouseInfluence * 0.4})`
          }}
        >
          <div 
            className="absolute -top-4 -left-4 w-8 h-8 rounded-full"
            style={{
              background: `linear-gradient(45deg, 
                          rgba(99, 102, 241, ${0.8 + mouseInfluence * 0.2}), 
                          rgba(139, 92, 246, ${0.7 + mouseInfluence * 0.3}))`
            }}
          />
          <div 
            className="absolute -top-4 -right-4 w-8 h-8 rounded-full"
            style={{
              background: `linear-gradient(45deg, 
                          rgba(99, 102, 241, ${0.8 + mouseInfluence * 0.2}), 
                          rgba(139, 92, 246, ${0.7 + mouseInfluence * 0.3}))`
            }}
          />
        </div>
        
        {/* Brain neural network overlay */}
        <div className="absolute inset-0 opacity-70">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-200 rounded-full animate-pulse"
              style={{
                left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 25}px`,
                top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 25}px`,
                animationDelay: `${i * 0.2}s`,
                opacity: mouseInfluence
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Right Heart-shaped Brain */}
      <div 
        className="absolute transition-all duration-300 ease-out"
        style={{
          right: '20%',
          top: '50%',
          transform: `translate(50%, -50%) scale(${1 + mouseInfluence * 0.3}) rotate(${-mousePosition.x * 5}deg)`
        }}
      >
        <div 
          className="relative w-16 h-16 transition-all duration-300"
          style={{
            background: `linear-gradient(45deg, 
                        rgba(236, 72, 153, ${0.6 + mouseInfluence * 0.4}), 
                        rgba(219, 39, 119, ${0.5 + mouseInfluence * 0.3}))`,
            borderRadius: '50px 50px 0 0',
            transform: 'rotate(-45deg)',
            filter: `blur(${2 - mouseInfluence * 1.5}px)`,
            boxShadow: `0 0 ${20 + mouseInfluence * 30}px rgba(236, 72, 153, ${0.4 + mouseInfluence * 0.4})`
          }}
        >
          <div 
            className="absolute -top-4 -left-4 w-8 h-8 rounded-full"
            style={{
              background: `linear-gradient(45deg, 
                          rgba(236, 72, 153, ${0.8 + mouseInfluence * 0.2}), 
                          rgba(219, 39, 119, ${0.7 + mouseInfluence * 0.3}))`
            }}
          />
          <div 
            className="absolute -top-4 -right-4 w-8 h-8 rounded-full"
            style={{
              background: `linear-gradient(45deg, 
                          rgba(236, 72, 153, ${0.8 + mouseInfluence * 0.2}), 
                          rgba(219, 39, 119, ${0.7 + mouseInfluence * 0.3}))`
            }}
          />
        </div>
        
        {/* Brain neural network overlay */}
        <div className="absolute inset-0 opacity-70">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-pink-200 rounded-full animate-pulse"
              style={{
                left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 25}px`,
                top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 25}px`,
                animationDelay: `${i * 0.2 + 0.1}s`,
                opacity: mouseInfluence
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Center connection hub that follows cursor */}
      <div 
        className="absolute transition-all duration-200 ease-out"
        style={{
          left: `${50 + mousePosition.x * 10}%`,
          top: `${50 + mousePosition.y * 10}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div 
          className="w-6 h-6 bg-white rounded-full transition-all duration-200"
          style={{
            opacity: mouseInfluence,
            transform: `scale(${mouseInfluence * 3})`,
            boxShadow: `0 0 ${mouseInfluence * 40}px rgba(255, 255, 255, 0.8),
                       0 0 ${mouseInfluence * 60}px rgba(6, 182, 212, 0.4),
                       0 0 ${mouseInfluence * 80}px rgba(236, 72, 153, 0.3)`
          }}
        />
      </div>
      
      {/* Cursor follower */}
      <div 
        className="absolute w-2 h-2 bg-cyan-300 rounded-full pointer-events-none transition-all duration-100 ease-out"
        style={{
          left: `${(mousePosition.x + 1) * 50}%`,
          top: `${(-mousePosition.y + 1) * 50}%`,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 20px rgba(6, 182, 212, 0.8)`
        }}
      />
    </div>
  );
};

export default BrainConnectionVisualization;