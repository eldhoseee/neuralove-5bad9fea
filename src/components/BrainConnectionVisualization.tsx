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
  const connectionIntensity = Math.max(0.2, 1 - mouseDistance / 3);
  const rotationX = mousePosition.y * 8;
  const rotationY = mousePosition.x * 12;

  // Generate orbital particles around hearts
  const generateOrbitingParticles = () => {
    const particles = [];
    const particleCount = isHovering ? 36 : 24;
    
    for (let i = 0; i < particleCount; i++) {
      const orbitRadius = 80 + (i % 3) * 40 + connectionIntensity * 60;
      const orbitSpeed = 0.001 + (i % 5) * 0.0002;
      const verticalOffset = Math.sin(time * orbitSpeed * 3 + i) * 30;
      
      // Create orbital motion influenced by cursor
      const baseAngle = time * orbitSpeed + i * (Math.PI * 2 / particleCount);
      const cursorInfluence = {
        x: mousePosition.x * 40,
        y: mousePosition.y * 25
      };
      
      const x = 50 + Math.cos(baseAngle) * (orbitRadius / 6) + cursorInfluence.x;
      const y = 50 + Math.sin(baseAngle) * (orbitRadius / 8) + cursorInfluence.y + verticalOffset / 8;
      const z = Math.sin(baseAngle * 2) * 50 + connectionIntensity * 30;
      
      particles.push({
        id: i,
        x,
        y,
        z,
        size: 1 + (i % 4) * 0.5 + connectionIntensity * 2,
        opacity: 0.4 + Math.sin(time * 0.002 + i) * 0.3 + connectionIntensity * 0.4,
        color: i % 3 === 0 ? '6, 182, 212' : i % 3 === 1 ? '139, 92, 246' : '236, 72, 153',
        trail: Math.sin(baseAngle - Math.PI / 4) * 20
      });
    }
    return particles;
  };

  const particles = generateOrbitingParticles();

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${className} overflow-hidden cursor-none`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '2000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Dynamic Environment with Cursor-Following Lighting */}
      <div 
        className="absolute inset-0 opacity-70 transition-all duration-500"
        style={{
          background: `
            radial-gradient(ellipse 400px 300px at ${50 + mousePosition.x * 25}% ${50 + mousePosition.y * 20}%, 
              rgba(99, 102, 241, ${0.3 + connectionIntensity * 0.4}) 0%, 
              rgba(139, 92, 246, ${0.2 + connectionIntensity * 0.3}) 30%,
              rgba(236, 72, 153, ${0.2 + connectionIntensity * 0.3}) 60%,
              transparent 80%),
            radial-gradient(ellipse 600px 400px at ${30 + mousePosition.x * 20}% ${70 + mousePosition.y * 15}%, 
              rgba(6, 182, 212, ${0.15 + connectionIntensity * 0.25}) 0%, 
              transparent 70%)
          `,
          transform: `rotateX(${rotationX * 0.3}deg) rotateY(${rotationY * 0.2}deg) translateZ(50px)`
        }}
      />

      {/* Seamless Orbital Particle System */}
      {particles.map((particle) => (
        <div key={`particle-${particle.id}`}>
          {/* Main particle */}
          <div
            className="absolute transition-all duration-200 ease-out pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              transform: `
                translateZ(${particle.z}px) 
                translateX(-50%) translateY(-50%)
                scale(${particle.size})
                rotateX(${rotationX * 0.5}deg) 
                rotateY(${rotationY * 0.5}deg)
              `,
              opacity: particle.opacity
            }}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{
                background: `radial-gradient(circle, 
                  rgba(${particle.color}, 0.9) 0%, 
                  rgba(${particle.color}, 0.4) 60%,
                  transparent 100%)`,
                boxShadow: `
                  0 0 ${8 + connectionIntensity * 15}px rgba(${particle.color}, 0.7),
                  0 0 ${15 + connectionIntensity * 25}px rgba(${particle.color}, 0.3)
                `
              }}
            />
          </div>
          
          {/* Particle trail effect */}
          <div
            className="absolute transition-all duration-300 ease-out pointer-events-none"
            style={{
              left: `${particle.x - Math.cos(time * 0.001 + particle.id) * 2}%`,
              top: `${particle.y - Math.sin(time * 0.001 + particle.id) * 2}%`,
              transform: `
                translateZ(${particle.z - 20}px) 
                translateX(-50%) translateY(-50%)
                scale(${particle.size * 0.6})
              `,
              opacity: particle.opacity * 0.5
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(${particle.color}, 0.4) 0%, transparent 70%)`,
                filter: 'blur(1px)'
              }}
            />
          </div>
        </div>
      ))}

      {/* Central Heart-Brain Cluster */}
      <div 
        className="absolute left-1/2 top-1/2"
        style={{
          transform: `
            translate(-50%, -50%) 
            translateZ(${connectionIntensity * 80}px)
            rotateX(${rotationX + Math.sin(time * 0.005) * 8}deg) 
            rotateY(${rotationY + Math.cos(time * 0.004) * 10}deg)
            scale(${0.9 + connectionIntensity * 0.5})
          `,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Left Heart-Brain (Blue) */}
        <div 
          className="absolute"
          style={{
            left: '-60px',
            top: '-40px',
            transform: `
              rotateZ(${Math.sin(time * 0.003) * 5}deg)
              translateZ(${Math.sin(time * 0.006) * 20}px)
            `,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Multi-layered heart structure */}
          {[0, 1, 2, 3, 4].map((layer) => (
            <div
              key={layer}
              className="absolute"
              style={{
                width: `${90 - layer * 12}px`,
                height: `${90 - layer * 12}px`,
                transform: `translateZ(${layer * 15}px) rotateZ(${layer * 8}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div 
                className="relative w-full h-full"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(99, 102, 241, ${0.9 - layer * 0.12}) 0%,
                      rgba(139, 92, 246, ${0.7 - layer * 0.1}) 50%,
                      rgba(99, 102, 241, ${0.5 - layer * 0.08}) 100%
                    )
                  `,
                  borderRadius: '50px 50px 0 0',
                  transform: 'rotate(-45deg)',
                  filter: `blur(${layer * 0.3}px) brightness(${1.3 - layer * 0.08})`,
                  boxShadow: `
                    0 0 ${40 + connectionIntensity * 50}px rgba(99, 102, 241, ${0.7 - layer * 0.1}),
                    inset 0 0 ${25}px rgba(255, 255, 255, ${0.25 - layer * 0.04}),
                    0 ${layer * 5}px ${20 + layer * 10}px rgba(99, 102, 241, ${0.3 - layer * 0.05})
                  `
                }}
              >
                {/* Heart bulbs with enhanced depth */}
                <div 
                  className="absolute w-12 h-12 rounded-full"
                  style={{
                    top: '-24px',
                    left: '-24px',
                    background: `radial-gradient(circle, 
                      rgba(99, 102, 241, ${1 - layer * 0.1}) 0%, 
                      rgba(139, 92, 246, ${0.8 - layer * 0.1}) 50%,
                      rgba(99, 102, 241, ${0.4 - layer * 0.05}) 80%,
                      transparent 100%)`,
                    transform: `translateZ(${layer * 5}px)`
                  }}
                />
                <div 
                  className="absolute w-12 h-12 rounded-full"
                  style={{
                    top: '-24px',
                    right: '-24px',
                    background: `radial-gradient(circle, 
                      rgba(99, 102, 241, ${1 - layer * 0.1}) 0%, 
                      rgba(139, 92, 246, ${0.8 - layer * 0.1}) 50%,
                      rgba(99, 102, 241, ${0.4 - layer * 0.05}) 80%,
                      transparent 100%)`,
                    transform: `translateZ(${layer * 5}px)`
                  }}
                />
              </div>
            </div>
          ))}
          
          {/* Neural synapses */}
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${45 + Math.cos(i * 36 * Math.PI / 180) * 40}px`,
                top: `${45 + Math.sin(i * 36 * Math.PI / 180) * 40}px`,
                transform: `translateZ(${Math.sin(time * 0.008 + i) * 40}px)`,
                background: `radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(99, 102, 241, 0.7) 100%)`,
                boxShadow: `0 0 ${12 + connectionIntensity * 18}px rgba(255, 255, 255, 0.9)`,
                animation: `pulse 3s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Right Heart-Brain (Pink) */}
        <div 
          className="absolute"
          style={{
            right: '-60px',
            top: '-40px',
            transform: `
              rotateZ(${Math.sin(time * 0.003 + Math.PI) * 5}deg)
              translateZ(${Math.sin(time * 0.006 + Math.PI) * 20}px)
            `,
            transformStyle: 'preserve-3d'
          }}
        >
          {[0, 1, 2, 3, 4].map((layer) => (
            <div
              key={layer}
              className="absolute"
              style={{
                width: `${90 - layer * 12}px`,
                height: `${90 - layer * 12}px`,
                transform: `translateZ(${layer * 15}px) rotateZ(${-layer * 8}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div 
                className="relative w-full h-full"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(236, 72, 153, ${0.9 - layer * 0.12}) 0%,
                      rgba(219, 39, 119, ${0.7 - layer * 0.1}) 50%,
                      rgba(236, 72, 153, ${0.5 - layer * 0.08}) 100%
                    )
                  `,
                  borderRadius: '50px 50px 0 0',
                  transform: 'rotate(-45deg)',
                  filter: `blur(${layer * 0.3}px) brightness(${1.3 - layer * 0.08})`,
                  boxShadow: `
                    0 0 ${40 + connectionIntensity * 50}px rgba(236, 72, 153, ${0.7 - layer * 0.1}),
                    inset 0 0 ${25}px rgba(255, 255, 255, ${0.25 - layer * 0.04}),
                    0 ${layer * 5}px ${20 + layer * 10}px rgba(236, 72, 153, ${0.3 - layer * 0.05})
                  `
                }}
              >
                <div 
                  className="absolute w-12 h-12 rounded-full"
                  style={{
                    top: '-24px',
                    left: '-24px',
                    background: `radial-gradient(circle, 
                      rgba(236, 72, 153, ${1 - layer * 0.1}) 0%, 
                      rgba(219, 39, 119, ${0.8 - layer * 0.1}) 50%,
                      rgba(236, 72, 153, ${0.4 - layer * 0.05}) 80%,
                      transparent 100%)`,
                    transform: `translateZ(${layer * 5}px)`
                  }}
                />
                <div 
                  className="absolute w-12 h-12 rounded-full"
                  style={{
                    top: '-24px',
                    right: '-24px',
                    background: `radial-gradient(circle, 
                      rgba(236, 72, 153, ${1 - layer * 0.1}) 0%, 
                      rgba(219, 39, 119, ${0.8 - layer * 0.1}) 50%,
                      rgba(236, 72, 153, ${0.4 - layer * 0.05}) 80%,
                      transparent 100%)`,
                    transform: `translateZ(${layer * 5}px)`
                  }}
                />
              </div>
            </div>
          ))}
          
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${45 + Math.cos(i * 36 * Math.PI / 180) * 40}px`,
                top: `${45 + Math.sin(i * 36 * Math.PI / 180) * 40}px`,
                transform: `translateZ(${Math.sin(time * 0.008 + i + Math.PI) * 40}px)`,
                background: `radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(236, 72, 153, 0.7) 100%)`,
                boxShadow: `0 0 ${12 + connectionIntensity * 18}px rgba(255, 255, 255, 0.9)`,
                animation: `pulse 3s ease-in-out infinite`,
                animationDelay: `${i * 0.3 + 1.5}s`
              }}
            />
          ))}
        </div>

        {/* Central Connection Bridge */}
        <div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '120px',
            height: '4px',
            background: `linear-gradient(90deg, 
              rgba(99, 102, 241, ${0.8 + connectionIntensity * 0.2}) 0%,
              rgba(6, 182, 212, ${0.9 + connectionIntensity * 0.1}) 30%,
              rgba(255, 255, 255, ${0.95 + connectionIntensity * 0.05}) 50%,
              rgba(6, 182, 212, ${0.9 + connectionIntensity * 0.1}) 70%,
              rgba(236, 72, 153, ${0.8 + connectionIntensity * 0.2}) 100%
            )`,
            borderRadius: '2px',
            filter: `blur(${1 - connectionIntensity}px)`,
            boxShadow: `
              0 0 ${20 + connectionIntensity * 40}px rgba(255, 255, 255, 0.8),
              0 0 ${30 + connectionIntensity * 50}px rgba(6, 182, 212, 0.6)
            `,
            transform: `rotateY(${rotationY * 0.5}deg) rotateZ(${Math.sin(time * 0.004) * 10}deg)`
          }}
        >
          {/* Energy pulse along bridge */}
          <div
            className="absolute w-3 h-3 bg-white rounded-full top-1/2 transform -translate-y-1/2"
            style={{
              left: `${45 + Math.sin(time * 0.01) * 30}%`,
              boxShadow: `0 0 20px rgba(255, 255, 255, 0.9)`,
              filter: 'blur(0.5px)'
            }}
          />
        </div>
      </div>

      {/* Cursor follower */}
      <div 
        className="absolute w-4 h-4 rounded-full pointer-events-none transition-all duration-75 ease-out"
        style={{
          left: `${(mousePosition.x + 1) * 50}%`,
          top: `${(-mousePosition.y + 1) * 50}%`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(6, 182, 212, 0.6) 100%)`,
          boxShadow: `
            0 0 20px rgba(255, 255, 255, 0.8),
            0 0 40px rgba(6, 182, 212, 0.4)
          `,
          opacity: isHovering ? 1 : 0
        }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
};

export default BrainConnectionVisualization;