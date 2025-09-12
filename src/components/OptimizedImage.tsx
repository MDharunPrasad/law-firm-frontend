import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  fallbackSrc,
  loading = 'lazy',
  onLoad,
  onError
}: OptimizedImageProps) {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState(src);
  const [startTime] = useState(Date.now());
  const imgRef = useRef<HTMLImageElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Smart timeout handling with external image avoidance
  useEffect(() => {
    if (imageStatus === 'loading') {
      // Much shorter timeout for external images to fail fast, normal for local
      const isExternal = src.includes('http') && !src.includes(window.location.origin);
      const timeout = isExternal ? 3000 : 5000; // Fail fast for external images
      
      timeoutRef.current = setTimeout(() => {
        if (imageStatus === 'loading') {
          if (isExternal) {
            console.debug(`External image timeout (expected): ${src}`);
          } else {
            console.warn(`Image loading timeout after ${timeout}ms: ${src}`);
          }
          handleError();
        }
      }, timeout);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [imageStatus, src]);

  const handleLoad = useCallback(() => {
    const loadTime = Date.now() - startTime;
    const isExternal = src.includes('http') && !src.includes(window.location.origin);
    
    // Only log performance warnings for local resources
    if (process.env.NODE_ENV === 'development' && loadTime > 3000 && !isExternal) {
      console.warn(`Slow image load (${loadTime}ms): ${src}`);
    } else if (isExternal && loadTime > 2000) {
      console.debug(`External image loaded (${loadTime}ms): ${src}`);
    }
    
    setImageStatus('loaded');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onLoad?.();
  }, [src, startTime, onLoad]);

  const handleError = useCallback(() => {
    const isExternal = src.includes('http') && !src.includes(window.location.origin);
    
    // Only log errors for local images
    if (!isExternal) {
      console.warn(`Failed to load image: ${src}`);
    } else {
      console.debug(`External image failed (expected): ${src}`);
    }
    
    if (fallbackSrc && currentSrc !== fallbackSrc && !fallbackSrc.includes('http')) {
      // Only use fallback if it's a local image
      setCurrentSrc(fallbackSrc);
      setImageStatus('loading');
    } else {
      setImageStatus('error');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
    onError?.();
  }, [src, fallbackSrc, currentSrc, onError]);

  // Preload critical images
  useEffect(() => {
    if (priority && currentSrc) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = currentSrc;
      link.as = 'image';
      document.head.appendChild(link);
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [priority, currentSrc]);

  // Simple URL optimization without external utilities
  const getOptimizedSrc = useCallback((originalSrc: string) => {
    // Block external images in Figma environment to prevent loading issues
    if (typeof window !== 'undefined' && 
        (window.frameElement || window.location.hostname.includes('figma'))) {
      if (originalSrc.includes('http') && !originalSrc.includes(window.location.origin)) {
        // Return a simple placeholder SVG for blocked images
        return `data:image/svg+xml;base64,${btoa(`
          <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f8fafc"/>
            <text x="50%" y="50%" font-family="Inter, sans-serif" font-size="16" text-anchor="middle" dominant-baseline="middle" fill="#64748b">Image</text>
          </svg>
        `)}`;
      }
    }
    
    return originalSrc;
  }, [width, height]);

  const optimizedSrc = getOptimizedSrc(currentSrc);

  // Loading skeleton
  if (imageStatus === 'loading') {
    return (
      <div className={`bg-neutral-bg animate-pulse ${className}`} role="img" aria-label={`Loading ${alt}`}>
        <div className="w-full h-full bg-gradient-to-r from-neutral-bg via-slate-200 to-neutral-bg bg-[length:200%_100%] animate-shimmer rounded-lg"></div>
      </div>
    );
  }

  // Error state
  if (imageStatus === 'error') {
    return (
      <div 
        className={`bg-neutral-bg border-2 border-dashed border-neutral-300 flex items-center justify-center ${className}`}
        role="img" 
        aria-label={`Failed to load ${alt}`}
      >
        <div className="text-center p-4">
          <div className="w-12 h-12 mx-auto mb-2 bg-neutral-300 rounded-full flex items-center justify-center">
            <svg 
              className="w-6 h-6 text-neutral-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <p className="text-sm text-neutral-500 font-medium">Image unavailable</p>
        </div>
      </div>
    );
  }

  // Loaded image
  return (
    <motion.img
      ref={imgRef}
      src={optimizedSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      onLoad={handleLoad}
      onError={handleError}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        // Prevent layout shift
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    />
  );
}

// Shimmer animation for loading state
const shimmerKeyframes = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;

// Inject shimmer styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerKeyframes;
  document.head.appendChild(style);
}