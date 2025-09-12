// Image optimization utilities for better performance

interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  width?: number;
  height?: number;
  blur?: boolean;
}

export class ImageOptimizer {
  private static cache = new Map<string, string>();
  private static loadingPromises = new Map<string, Promise<void>>();

  // Generate optimized image URL with smart defaults
  static optimizeUrl(src: string, options: ImageOptimizationOptions = {}): string {
    const cacheKey = `${src}_${JSON.stringify(options)}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    let optimizedUrl = src;

    try {
      // Only optimize external images (Unsplash, etc.)
      if (src.includes('unsplash.com')) {
        optimizedUrl = this.optimizeUnsplashUrl(src, options);
      } else if (src.includes('pexels.com')) {
        optimizedUrl = this.optimizePexelsUrl(src, options);
      }
      // Add other image services as needed

      this.cache.set(cacheKey, optimizedUrl);
      return optimizedUrl;
    } catch (error) {
      console.warn('Failed to optimize image URL:', error);
      return src;
    }
  }

  // Optimize Unsplash URLs with aggressive compression
  private static optimizeUnsplashUrl(src: string, options: ImageOptimizationOptions): string {
    const url = new URL(src);
    
    // Set dimensions if provided
    if (options.width) url.searchParams.set('w', options.width.toString());
    if (options.height) url.searchParams.set('h', options.height.toString());
    
    // Set quality (default to 50 for background images, 75 for content)
    const quality = options.quality || 50;
    url.searchParams.set('q', Math.min(quality, 70).toString());
    
    // Force modern formats
    const format = options.format || 'webp';
    if (format === 'auto') {
      url.searchParams.set('auto', 'format,compress');
    } else {
      url.searchParams.set('fm', format);
    }
    
    // Additional optimizations
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('crop', 'faces,center');
    url.searchParams.set('cs', 'srgb');
    
    // Add blur for background images
    if (options.blur) {
      url.searchParams.set('blur', '2');
    }

    return url.toString();
  }

  // Optimize Pexels URLs
  private static optimizePexelsUrl(src: string, options: ImageOptimizationOptions): string {
    const url = new URL(src);
    
    if (options.width && options.height) {
      url.searchParams.set('w', options.width.toString());
      url.searchParams.set('h', options.height.toString());
      url.searchParams.set('fit', 'crop');
    }
    
    return url.toString();
  }

  // Preload critical images with timeout and error handling
  static preloadImage(src: string, priority: 'high' | 'low' = 'low'): Promise<void> {
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
      // Skip preloading in development, iframe, or Figma environment
      if (process.env.NODE_ENV !== 'production' || 
          (typeof window !== 'undefined' && 
           (window.frameElement || window.location.hostname.includes('figma'))) ||
          src.includes('http')) {
        resolve();
        return;
      }

      const img = new Image();
      let timeoutId: NodeJS.Timeout;

      const cleanup = () => {
        if (timeoutId) clearTimeout(timeoutId);
        this.loadingPromises.delete(src);
      };

      const onLoad = () => {
        cleanup();
        resolve();
      };

      const onError = () => {
        cleanup();
        console.warn(`Failed to preload image: ${src}`);
        resolve(); // Don't reject - just warn
      };

      // Set timeout based on priority and source
      const isExternal = src.includes('http');
      const timeout = isExternal 
        ? (priority === 'high' ? 5000 : 8000)
        : (priority === 'high' ? 2000 : 3000);

      timeoutId = setTimeout(() => {
        cleanup();
        console.warn(`Image preload timeout: ${src}`);
        resolve(); // Don't reject timeouts
      }, timeout);

      img.addEventListener('load', onLoad, { once: true });
      img.addEventListener('error', onError, { once: true });

      // Set loading attributes
      img.crossOrigin = 'anonymous';
      img.loading = priority === 'high' ? 'eager' : 'lazy';
      img.src = src;
    });

    this.loadingPromises.set(src, promise);
    return promise;
  }

  // Create responsive image sources
  static createResponsiveSources(src: string, breakpoints: number[] = [640, 768, 1024, 1280, 1536]): string {
    if (!src.includes('unsplash.com')) return src;

    return breakpoints
      .map(width => {
        const optimizedSrc = this.optimizeUrl(src, { width, quality: 60 });
        return `${optimizedSrc} ${width}w`;
      })
      .join(', ');
  }

  // Generate blur placeholder
  static generatePlaceholder(src: string, width: number = 40, height: number = 40): string {
    return this.optimizeUrl(src, {
      width,
      height,
      quality: 1,
      blur: true
    });
  }

  // Check if WebP is supported
  static supportsWebP(): Promise<boolean> {
    return new Promise(resolve => {
      const webp = new Image();
      webp.onload = webp.onerror = () => resolve(webp.height === 2);
      webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  // Check if AVIF is supported
  static supportsAVIF(): Promise<boolean> {
    return new Promise(resolve => {
      const avif = new Image();
      avif.onload = avif.onerror = () => resolve(avif.height === 2);
      avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    });
  }

  // Clear cache (useful for development)
  static clearCache(): void {
    this.cache.clear();
    this.loadingPromises.clear();
  }
}

// Initialize format support detection
let webpSupport: boolean | null = null;
let avifSupport: boolean | null = null;

ImageOptimizer.supportsWebP().then(supported => {
  webpSupport = supported;
});

ImageOptimizer.supportsAVIF().then(supported => {
  avifSupport = supported;
});

// Export format support checks
export const formatSupport = {
  get webp() { return webpSupport; },
  get avif() { return avifSupport; }
};