// Preload utilities for critical resources
import { ImageOptimizer } from './imageOptimization';

export class PreloadManager {
  private static preloadedResources = new Set<string>();
  private static preloadPromises = new Map<string, Promise<void>>();

  // Preload critical images using the ImageOptimizer
  static preloadImage(src: string, priority: 'high' | 'low' = 'low'): Promise<void> {
    if (this.preloadedResources.has(src)) {
      return Promise.resolve();
    }

    if (this.preloadPromises.has(src)) {
      return this.preloadPromises.get(src)!;
    }

    // Use the ImageOptimizer for better handling
    const promise = ImageOptimizer.preloadImage(src, priority)
      .then(() => {
        this.preloadedResources.add(src);
      })
      .catch(() => {
        // ImageOptimizer handles errors gracefully
        this.preloadedResources.add(src); // Mark as processed even if failed
      });

    this.preloadPromises.set(src, promise);
    return promise;
  }

  // Preload critical fonts
  static preloadFont(href: string, type: string = 'woff2'): void {
    if (this.preloadedResources.has(href)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'font';
    link.type = `font/${type}`;
    link.crossOrigin = 'anonymous';
    
    link.onload = () => {
      this.preloadedResources.add(href);
    };

    document.head.appendChild(link);
  }

  // Preload critical CSS
  static preloadCSS(href: string): void {
    if (this.preloadedResources.has(href)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'style';
    
    link.onload = () => {
      this.preloadedResources.add(href);
      // Convert to actual stylesheet
      link.rel = 'stylesheet';
    };

    document.head.appendChild(link);
  }

  // Prefetch non-critical resources
  static prefetchResource(href: string, as: string = 'fetch'): void {
    if (this.preloadedResources.has(href)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = as;
    
    link.onload = () => {
      this.preloadedResources.add(href);
    };

    document.head.appendChild(link);
  }

  // Preconnect to external domains
  static preconnect(href: string, crossorigin: boolean = false): void {
    if (this.preloadedResources.has(`preconnect:${href}`)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    if (crossorigin) {
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
    this.preloadedResources.add(`preconnect:${href}`);
  }

  // DNS prefetch for external domains
  static dnsPrefetch(href: string): void {
    if (this.preloadedResources.has(`dns:${href}`)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = href;
    
    document.head.appendChild(link);
    this.preloadedResources.add(`dns:${href}`);
  }

  // Initialize critical resource preloading (safe for all environments)
  static initializeCriticalResources(): void {
    try {
      // Skip in iframe/Figma environment to avoid blob URL issues
      if (typeof window === 'undefined' || 
          typeof document === 'undefined' || 
          window.frameElement || 
          window.location.hostname.includes('figma')) {
        console.log('Skipping preload initialization in iframe/embedded environment');
        return;
      }

      // Only preconnect to fonts which are actually critical
      this.preconnect('https://fonts.googleapis.com', true);
      this.preconnect('https://fonts.gstatic.com', true);

      // DNS prefetch for fonts only
      this.dnsPrefetch('//fonts.googleapis.com');
      this.dnsPrefetch('//fonts.gstatic.com');

      // Skip external image preloading entirely to avoid performance issues
      // Images will load on-demand with proper lazy loading and optimization
      if (process.env.NODE_ENV === 'production') {
        console.log('Preload manager initialized successfully - skipping external images for optimal performance');
      }
    } catch (error) {
      console.warn('Preload initialization failed:', error);
    }
  }

  // Get preload status
  static isPreloaded(resource: string): boolean {
    return this.preloadedResources.has(resource);
  }

  // Clear preload cache (useful for development)
  static clearCache(): void {
    this.preloadedResources.clear();
    this.preloadPromises.clear();
  }
}

// Auto-initialize on module load (only in production and stable environments)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      try {
        PreloadManager.initializeCriticalResources();
      } catch (error) {
        console.warn('Auto-preload initialization failed:', error);
      }
    });
  } else {
    try {
      PreloadManager.initializeCriticalResources();
    } catch (error) {
      console.warn('Auto-preload initialization failed:', error);
    }
  }
}