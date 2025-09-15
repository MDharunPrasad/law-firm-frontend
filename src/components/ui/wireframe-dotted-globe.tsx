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
    baseColor?: string;
    glowColor?: string;
    backgroundColor?: string;
  };
}

const WireframeDottedGlobe: React.FC<WireframeDottedGlobeProps> = ({
  className = '',
  globeConfig = {}
}) => {
  // Version identifier: v2.0 - Interactive Auto-Rotating Globe
  console.log('Globe Component Version: v2.0 - Interactive Auto-Rotating Globe');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef<number>();
  const worldDataRef = useRef<any>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  const config = {
    radius: 200,
    enablePointerInteraction: true,
    enableAutoRotate: true,
    autoRotateSpeed: 0.5,
    phi: 0,
    theta: 0,
    baseColor: '#D4AF37', // Gold color
    glowColor: '#F4D03F',
    backgroundColor: 'transparent',
    ...globeConfig
  };

  const loadWorldData = useCallback(async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson', {
        signal: AbortSignal.timeout(5000)
      });
      
      if (response.ok) {
        const data = await response.json();
        worldDataRef.current = data;
      } else {
        throw new Error('Failed to fetch world data');
      }
    } catch (error) {
      console.log('Using simplified world data');
      // Simplified world data for wireframe effect
      worldDataRef.current = {
        type: "FeatureCollection",
        features: []
      };
    }
    
    setIsLoaded(true);
  }, []);

  const drawGlobe = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, width, height);

    // Set up projection with current rotation
    const projection = d3.geoOrthographic()
      .scale(config.radius)
      .translate([centerX, centerY])
      .rotate([rotation.x, -rotation.y, 0]);

    const path = d3.geoPath(projection, ctx);

    // Draw globe outline
    ctx.beginPath();
    path({ type: 'Sphere' });
    ctx.strokeStyle = config.baseColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw latitude lines
    const latitudes = [-60, -30, 0, 30, 60];
    latitudes.forEach(lat => {
      const latLine = {
        type: "LineString",
        coordinates: d3.range(-180, 181, 5).map(lng => [lng, lat])
      };
      
      ctx.beginPath();
      path(latLine as any);
      ctx.strokeStyle = config.baseColor;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
    });

    // Draw longitude lines
    const longitudes = [-120, -60, 0, 60, 120];
    longitudes.forEach(lng => {
      const lngLine = {
        type: "LineString",
        coordinates: d3.range(-90, 91, 5).map(lat => [lng, lat])
      };
      
      ctx.beginPath();
      path(lngLine as any);
      ctx.strokeStyle = config.baseColor;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
    });

    // Draw dots pattern on the globe surface
    const dotSpacing = 10; // degrees
    ctx.fillStyle = config.baseColor;
    ctx.globalAlpha = 0.4;

    for (let lat = -90; lat <= 90; lat += dotSpacing) {
      for (let lng = -180; lng <= 180; lng += dotSpacing) {
        const coords = projection([lng, lat]);
        if (coords) {
          // Simple visibility check: just draw all dots for now
          ctx.beginPath();
          ctx.arc(coords[0], coords[1], 1, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }

    // Draw continents if world data is available
    if (worldDataRef.current && worldDataRef.current.features) {
      ctx.strokeStyle = config.baseColor;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.8;

      worldDataRef.current.features.forEach((feature: any) => {
        ctx.beginPath();
        path(feature);
        ctx.stroke();
      });
    }

    ctx.globalAlpha = 1;
  }, [config, rotation]);

  const animate = useCallback(() => {
    if (config.enableAutoRotate && !isDragging) {
      setRotation(prev => ({
        ...prev,
        x: prev.x + config.autoRotateSpeed
      }));
    }
    
    drawGlobe();
    animationRef.current = requestAnimationFrame(animate);
  }, [drawGlobe, config, isDragging]);

  // Mouse event handlers for interaction
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!config.enablePointerInteraction) return;
    
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  }, [config.enablePointerInteraction]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !config.enablePointerInteraction) return;

    const deltaX = e.clientX - lastMouse.x;

    // Only allow horizontal rotation (spinning)
    setRotation(prev => ({
      x: prev.x + deltaX * 0.5,
      y: prev.y // Keep vertical rotation unchanged
    }));

    setLastMouse({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastMouse, config.enablePointerInteraction]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch event handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!config.enablePointerInteraction) return;
    
    const touch = e.touches[0];
    setIsDragging(true);
    setLastMouse({ x: touch.clientX, y: touch.clientY });
  }, [config.enablePointerInteraction]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !config.enablePointerInteraction) return;

    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMouse.x;

    // Only allow horizontal rotation (spinning)
    setRotation(prev => ({
      x: prev.x + deltaX * 0.5,
      y: prev.y // Keep vertical rotation unchanged
    }));

    setLastMouse({ x: touch.clientX, y: touch.clientY });
  }, [isDragging, lastMouse, config.enablePointerInteraction]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

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
        const size = Math.min(rect.width, rect.height);
        canvas.width = size;
        canvas.height = size;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
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
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.1 }}
      transition={{ 
        duration: 1.0, 
        ease: "easeOut",
        opacity: { duration: 0.6 },
        scale: { duration: 1.0 }
      }}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${config.enablePointerInteraction ? 'cursor-grab' : ''} ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{ 
          filter: isLoaded ? 'none' : 'blur(1px)',
          transition: 'filter 0.4s ease-out',
          backgroundColor: config.backgroundColor
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-6 h-6 border-2 border-gold-accent border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default WireframeDottedGlobe;