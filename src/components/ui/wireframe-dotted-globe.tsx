import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import * as d3 from 'd3';

interface WireframeDottedGlobeProps {
  className?: string;
  globeConfig?: {
    radius?: number;
    enablePointerInteraction?: boolean;
    enableAutoRotate?: boolean;
    autoRotateSpeed?: number;
    phi?: number;
    theta?: number;
    mapSamples?: number;
    mapBrightness?: number;
    baseColor?: string;
    glowColor?: string;
    markers?: Array<{
      location: [number, number];
      size: number;
      color?: string;
    }>;
  };
}

// Fallback geographic data for basic world outline
const FALLBACK_WORLD_DATA = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]
        ]]
      }
    },
    // Simplified continents outline
    {
      type: "Feature",
      properties: { name: "North America" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-170, 70], [-50, 70], [-50, 15], [-170, 15], [-170, 70]
        ]]
      }
    },
    {
      type: "Feature", 
      properties: { name: "South America" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-90, 15], [-30, 15], [-30, -60], [-90, -60], [-90, 15]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Europe" },
      geometry: {
        type: "Polygon", 
        coordinates: [[
          [-15, 70], [50, 70], [50, 35], [-15, 35], [-15, 70]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Africa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-20, 40], [55, 40], [55, -40], [-20, -40], [-20, 40]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [25, 80], [180, 80], [180, 10], [25, 10], [25, 80]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Australia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [110, -10], [160, -10], [160, -50], [110, -50], [110, -10]
        ]]
      }
    }
  ]
};

const WireframeDottedGlobe: React.FC<WireframeDottedGlobeProps> = ({
  className = '',
  globeConfig = {}
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef<number>();
  const worldDataRef = useRef<any>(null);

  const config = {
    radius: 150,
    enablePointerInteraction: false,
    enableAutoRotate: true,
    autoRotateSpeed: 0.5,
    phi: 0,
    theta: 0,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: '#3B82F6',
    glowColor: '#60A5FA',
    markers: [],
    ...globeConfig
  };

  const loadWorldData = useCallback(async () => {
    try {
      // Try to fetch real world data first
      const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson', {
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (response.ok) {
        const data = await response.json();
        worldDataRef.current = data;
      } else {
        throw new Error('Failed to fetch world data');
      }
    } catch (error) {
      console.log('Using fallback world data due to:', error instanceof Error ? error.message : 'Unknown error');
      // Use fallback data if external fetch fails
      worldDataRef.current = FALLBACK_WORLD_DATA;
    }
    
    setIsLoaded(true);
  }, []);

  const drawGlobe = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !worldDataRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up projection
    const projection = d3.geoOrthographic()
      .scale(config.radius)
      .translate([centerX, centerY])
      .rotate([config.theta, -config.phi]);

    const path = d3.geoPath(projection, ctx);

    // Draw globe background
    ctx.beginPath();
    path({ type: 'Sphere' });
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.fill();
    ctx.strokeStyle = config.baseColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw continents as wireframe
    ctx.strokeStyle = config.baseColor;
    ctx.lineWidth = 0.8;
    ctx.globalAlpha = 0.8;

    worldDataRef.current.features.forEach((feature: any) => {
      ctx.beginPath();
      path(feature);
      ctx.stroke();
    });

    // Draw dots pattern
    const dotSpacing = Math.PI / 32;
    ctx.fillStyle = config.baseColor;
    ctx.globalAlpha = 0.6;

    for (let phi = 0; phi < Math.PI; phi += dotSpacing) {
      for (let theta = 0; theta < 2 * Math.PI; theta += dotSpacing) {
        const x = config.radius * Math.sin(phi) * Math.cos(theta + config.theta);
        const y = config.radius * Math.sin(phi) * Math.sin(theta + config.theta);
        const z = config.radius * Math.cos(phi);

        // Only draw dots on the visible hemisphere
        if (z > 0) {
          const projected = projection([
            (theta + config.theta) * 180 / Math.PI,
            (Math.PI / 2 - phi) * 180 / Math.PI
          ]);

          if (projected) {
            ctx.beginPath();
            ctx.arc(projected[0], projected[1], 0.8, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      }
    }

    // Draw markers if any
    config.markers.forEach(marker => {
      const projected = projection(marker.location);
      if (projected) {
        ctx.beginPath();
        ctx.arc(projected[0], projected[1], marker.size, 0, 2 * Math.PI);
        ctx.fillStyle = marker.color || '#EF4444';
        ctx.globalAlpha = 0.8;
        ctx.fill();
      }
    });

    ctx.globalAlpha = 1;
  }, [config]);

  const animate = useCallback(() => {
    if (config.enableAutoRotate) {
      config.theta += config.autoRotateSpeed * 0.01;
    }
    
    drawGlobe();
    animationRef.current = requestAnimationFrame(animate);
  }, [drawGlobe, config]);

  useEffect(() => {
    loadWorldData();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [loadWorldData]);

  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
    };

    updateCanvasSize();
    
    // Start animation
    animate();

    // Handle resize
    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded, animate]);

  return (
    <motion.div
      className={`relative w-full h-full ${className}`}
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.2 }}
      transition={{ 
        duration: 1.2, 
        ease: "easeOut",
        opacity: { duration: 0.8 },
        scale: { duration: 1.2 }
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          filter: isLoaded ? 'none' : 'blur(2px)',
          transition: 'filter 0.6s ease-out'
        }}
      />
      
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
      
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${config.glowColor}40 0%, transparent 70%)`,
          filter: 'blur(8px)',
        }}
      />
    </motion.div>
  );
};

export default WireframeDottedGlobe;
