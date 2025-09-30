import React, { useState, useRef, useEffect, useCallback } from 'react';

interface BrainConnectionVisualizationProps {
  className?: string;
}

const BrainConnectionVisualization: React.FC<BrainConnectionVisualizationProps> = ({ className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setTime(prev => prev + 1);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculate dynamic values
  const mouseDistance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2);
  const connectionIntensity = Math.max(0.1, 1 - mouseDistance / 2);
  const rotationX = mousePosition.y * 15;
  const rotationY = mousePosition.x * 20;

  // Generate dynamic neural pathways
  const generatePathways = () => {
    const pathways = [];
    const pathCount = isHovering ? 12 : 6;
    
    for (let i = 0; i < pathCount; i++) {
      const angle = (i / pathCount) * Math.PI * 2;
      const radius = 40 + Math.sin(time * 0.01 + i) * 20;
      const offsetX = mousePosition.x * 30;
      const offsetY = mousePosition.y * 20;
      
      pathways.push({
        id: i,
        startX: 25 + Math.cos(angle) * radius * 0.3 + offsetX,
        startY: 50 + Math.sin(angle) * radius * 0.2 + offsetY,
        endX: 75 - Math.cos(angle + Math.PI) * radius * 0.3 + offsetX,
        endY: 50 - Math.sin(angle + Math.PI) * radius * 0.2 + offsetY,
        controlX: 50 + Math.sin(time * 0.005 + i) * 30 + offsetX,
        controlY: 50 + Math.cos(time * 0.007 + i) * 15 + offsetY,
        opacity: 0.3 + connectionIntensity * 0.7,
        delay: i * 0.1
      });
    }
    return pathways;
  };

  const pathways = generatePathways();

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${className} overflow-hidden`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1500px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Dynamic Environment Lighting */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at ${40 + mousePosition.x * 20}% ${30 + mousePosition.y * 20}%, 
              rgba(99, 102, 241, ${0.4 + connectionIntensity * 0.3}) 0%, 
              transparent 50%),
            radial-gradient(ellipse at ${70 + mousePosition.x * 15}% ${70 + mousePosition.y * 15}%, 
              rgba(236, 72, 153, ${0.3 + connectionIntensity * 0.4}) 0%, 
              transparent 60%),
            radial-gradient(ellipse 150% 100% at 50% 0%, 
              rgba(139, 92, 246, ${0.1 + connectionIntensity * 0.2}) 0%, 
              transparent 70%)
          `,
          transform: `rotateX(${rotationX * 0.5}deg) rotateY(${rotationY * 0.3}deg)`,
          transition: 'transform 0.3s ease-out'
        }}
      />

      {/* Ambient Particles System */}
      {Array.from({ length: 24 }, (_, i) => {
        const orbitRadius = 100 + i * 15;
        const orbitSpeed = 0.002 + i * 0.0001;
        const x = 50 + Math.cos(time * orbitSpeed + i) * (orbitRadius / 8);
        const y = 50 + Math.sin(time * orbitSpeed + i) * (orbitRadius / 12);
        const z = Math.sin(time * orbitSpeed * 2 + i) * 50;
        
        return (
          <div
            key={`particle-${i}`}
            className="absolute transition-all duration-300 ease-out"
            style={{
              left: `${x + mousePosition.x * 10}%`,
              top: `${y + mousePosition.y * 8}%`,
              transform: `
                translateZ(${z}px) 
                scale(${0.3 + connectionIntensity * 0.7})
                rotateX(${rotationX}deg) 
                rotateY(${rotationY}deg)
              `,
              opacity: 0.4 + Math.sin(time * 0.003 + i) * 0.3
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{
                background: `radial-gradient(circle, 
                  rgba(${i % 3 === 0 ? '6, 182, 212' : i % 3 === 1 ? '139, 92, 246' : '236, 72, 153'}, 0.8) 0%, 
                  transparent 70%)`,
                boxShadow: `0 0 ${8 + connectionIntensity * 12}px rgba(6, 182, 212, 0.6)`
              }}
            />
          </div>
        );
      })}

      {/* Neural Connection Network */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transform: `rotateX(${rotationX * 0.8}deg) rotateY(${rotationY * 0.6}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out'
        }}
      >
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.8)" />
            <stop offset="30%" stopColor="rgba(139, 92, 246, 0.9)" />
            <stop offset="70%" stopColor="rgba(236, 72, 153, 0.8)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.6)" />
          </linearGradient>
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {pathways.map((pathway) => (
          <g key={pathway.id}>
            <path
              d={`M ${pathway.startX} ${pathway.startY} Q ${pathway.controlX} ${pathway.controlY} ${pathway.endX} ${pathway.endY}`}
              stroke="url(#neuralGradient)"
              strokeWidth={2 + connectionIntensity * 3}
              fill="none"
              opacity={pathway.opacity}
              filter="url(#glow)"
              style={{
                animation: `drawPath 2s ease-in-out infinite`,
                animationDelay: `${pathway.delay}s`
              }}
            />
            
            {/* Energy pulse */}
            <circle
              r={3 + connectionIntensity * 2}
              fill="rgba(255, 255, 255, 0.9)"
              opacity={pathway.opacity * 1.2}
              style={{
                filter: 'url(#glow)'
              }}
            >
              <animateMotion
                dur={`${2 + Math.random()}s`}
                repeatCount="indefinite"
                begin={`${pathway.delay}s`}
              >
                <mpath href={`#path-${pathway.id}`} />
              </animateMotion>
            </circle>
          </g>
        ))}
      </svg>

      {/* Left Heart-Brain (Morphing 3D Structure) */}
      <div 
        className="absolute"
        style={{
          left: '20%',
          top: '45%',
          transform: `
            translate(-50%, -50%) 
            rotateX(${rotationX + Math.sin(time * 0.008) * 10}deg) 
            rotateY(${rotationY + Math.cos(time * 0.006) * 15}deg)
            rotateZ(${Math.sin(time * 0.004) * 5}deg)
            scale(${1 + connectionIntensity * 0.4})
          `,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Multi-layered heart structure */}
        {[0, 1, 2, 3].map((layer) => (
          <div
            key={layer}
            className="absolute"
            style={{
              width: `${80 - layer * 15}px`,
              height: `${80 - layer * 15}px`,
              transform: `translateZ(${layer * 20}px) rotateZ(${layer * 10}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Heart shape with advanced lighting */}
            <div 
              className="relative w-full h-full"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(99, 102, 241, ${0.8 - layer * 0.15}) 0%,
                    rgba(139, 92, 246, ${0.6 - layer * 0.1}) 40%,
                    rgba(99, 102, 241, ${0.4 - layer * 0.05}) 100%
                  )
                `,
                borderRadius: '50px 50px 0 0',
                transform: 'rotate(-45deg)',
                filter: `blur(${layer * 0.5}px) brightness(${1.2 - layer * 0.1})`,
                boxShadow: `
                  0 0 ${30 + connectionIntensity * 40}px rgba(99, 102, 241, ${0.6 - layer * 0.1}),
                  inset 0 0 ${20}px rgba(255, 255, 255, ${0.2 - layer * 0.05})
                `
              }}
            >
              {/* Heart bulbs */}
              <div 
                className="absolute w-10 h-10 rounded-full"
                style={{
                  top: '-20px',
                  left: '-20px',
                  background: `radial-gradient(circle, 
                    rgba(99, 102, 241, ${0.9 - layer * 0.1}) 0%, 
                    rgba(139, 92, 246, ${0.7 - layer * 0.1}) 70%, 
                    transparent 100%)`
                }}
              />
              <div 
                className="absolute w-10 h-10 rounded-full"
                style={{
                  top: '-20px',
                  right: '-20px',
                  background: `radial-gradient(circle, 
                    rgba(99, 102, 241, ${0.9 - layer * 0.1}) 0%, 
                    rgba(139, 92, 246, ${0.7 - layer * 0.1}) 70%, 
                    transparent 100%)`
                }}
              />
            </div>
          </div>
        ))}
        
        {/* Neural network nodes */}
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${40 + Math.cos(i * 45 * Math.PI / 180) * 35}px`,
              top: `${40 + Math.sin(i * 45 * Math.PI / 180) * 35}px`,
              transform: `translateZ(${Math.sin(time * 0.01 + i) * 30}px)`,
              background: `radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(99, 102, 241, 0.6) 100%)`,
              boxShadow: `0 0 ${15 + connectionIntensity * 10}px rgba(255, 255, 255, 0.8)`,
              animation: `pulse 2s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Right Heart-Brain (Mirror with Pink Gradient) */}
      <div 
        className="absolute"
        style={{
          right: '20%',
          top: '45%',
          transform: `
            translate(50%, -50%) 
            rotateX(${-rotationX + Math.sin(time * 0.008 + Math.PI) * 10}deg) 
            rotateY(${-rotationY + Math.cos(time * 0.006 + Math.PI) * 15}deg)
            rotateZ(${Math.sin(time * 0.004 + Math.PI) * 5}deg)
            scale(${1 + connectionIntensity * 0.4})
          `,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {[0, 1, 2, 3].map((layer) => (
          <div
            key={layer}
            className="absolute"
            style={{
              width: `${80 - layer * 15}px`,
              height: `${80 - layer * 15}px`,
              transform: `translateZ(${layer * 20}px) rotateZ(${-layer * 10}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div 
              className="relative w-full h-full"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(236, 72, 153, ${0.8 - layer * 0.15}) 0%,
                    rgba(219, 39, 119, ${0.6 - layer * 0.1}) 40%,
                    rgba(236, 72, 153, ${0.4 - layer * 0.05}) 100%
                  )
                `,
                borderRadius: '50px 50px 0 0',
                transform: 'rotate(-45deg)',
                filter: `blur(${layer * 0.5}px) brightness(${1.2 - layer * 0.1})`,
                boxShadow: `
                  0 0 ${30 + connectionIntensity * 40}px rgba(236, 72, 153, ${0.6 - layer * 0.1}),
                  inset 0 0 ${20}px rgba(255, 255, 255, ${0.2 - layer * 0.05})
                `
              }}
            >
              <div 
                className="absolute w-10 h-10 rounded-full"
                style={{
                  top: '-20px',
                  left: '-20px',
                  background: `radial-gradient(circle, 
                    rgba(236, 72, 153, ${0.9 - layer * 0.1}) 0%, 
                    rgba(219, 39, 119, ${0.7 - layer * 0.1}) 70%, 
                    transparent 100%)`
                }}
              />
              <div 
                className="absolute w-10 h-10 rounded-full"
                style={{
                  top: '-20px',
                  right: '-20px',
                  background: `radial-gradient(circle, 
                    rgba(236, 72, 153, ${0.9 - layer * 0.1}) 0%, 
                    rgba(219, 39, 119, ${0.7 - layer * 0.1}) 70%, 
                    transparent 100%)`
                }}
              />
            </div>
          </div>
        ))}
        
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${40 + Math.cos(i * 45 * Math.PI / 180) * 35}px`,
              top: `${40 + Math.sin(i * 45 * Math.PI / 180) * 35}px`,
              transform: `translateZ(${Math.sin(time * 0.01 + i + Math.PI) * 30}px)`,
              background: `radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(236, 72, 153, 0.6) 100%)`,
              boxShadow: `0 0 ${15 + connectionIntensity * 10}px rgba(255, 255, 255, 0.8)`,
              animation: `pulse 2s ease-in-out infinite`,
              animationDelay: `${i * 0.2 + 1}s`
            }}
          />
        ))}
      </div>

      {/* Central Connection Nexus */}
      <div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `
            translate(-50%, -50%) 
            translateZ(${connectionIntensity * 100}px)
            rotateX(${rotationX}deg) 
            rotateY(${rotationY}deg)
            scale(${0.5 + connectionIntensity * 1.5})
          `,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div 
          className="w-8 h-8 rounded-full"
          style={{
            background: `
              radial-gradient(circle, 
                rgba(255, 255, 255, ${0.9 + connectionIntensity * 0.1}) 0%, 
                rgba(6, 182, 212, ${0.7 + connectionIntensity * 0.3}) 30%,
                rgba(139, 92, 246, ${0.5 + connectionIntensity * 0.3}) 60%,
                transparent 100%
              )
            `,
            boxShadow: `
              0 0 ${40 + connectionIntensity * 60}px rgba(255, 255, 255, 0.8),
              0 0 ${60 + connectionIntensity * 80}px rgba(6, 182, 212, 0.6),
              0 0 ${80 + connectionIntensity * 100}px rgba(139, 92, 246, 0.4)
            `
          }}
        />
      </div>

      <style>{`
        @keyframes drawPath {
          0% { stroke-dasharray: 0 1000; }
          50% { stroke-dasharray: 100 1000; }
          100% { stroke-dasharray: 0 1000; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default BrainConnectionVisualization;