// Image loading safety utilities to prevent external dependencies

export class ImageSafety {
  private static blockedDomains = [
    'unsplash.com',
    'pexels.com',
    'pixabay.com',
    'freepik.com',
    'shutterstock.com'
  ];

  // Check if an image URL should be blocked for performance reasons
  static shouldBlockImage(src: string): boolean {
    if (!src || typeof src !== 'string') return true;
    
    // Allow data URLs and blob URLs
    if (src.startsWith('data:') || src.startsWith('blob:')) return false;
    
    // Allow relative URLs and same-origin URLs
    if (!src.includes('http')) return false;
    if (src.includes(window.location.origin)) return false;
    
    // Block known slow external image services
    return this.blockedDomains.some(domain => src.includes(domain));
  }

  // Get a safe image URL or return empty string
  static getSafeImageUrl(src: string): string {
    if (this.shouldBlockImage(src)) {
      console.debug(`Blocked external image for performance: ${src}`);
      return '';
    }
    return src;
  }

  // Create a safe image element with error handling
  static createSafeImage(src: string, options: {
    alt?: string;
    className?: string;
    onLoad?: () => void;
    onError?: () => void;
  } = {}): HTMLImageElement | null {
    const safeUrl = this.getSafeImageUrl(src);
    if (!safeUrl) return null;

    const img = new Image();
    img.src = safeUrl;
    img.alt = options.alt || '';
    if (options.className) img.className = options.className;
    
    if (options.onLoad) img.addEventListener('load', options.onLoad, { once: true });
    if (options.onError) img.addEventListener('error', options.onError, { once: true });
    
    return img;
  }

  // Generate a placeholder SVG for blocked images
  static generatePlaceholderSVG(width: number = 400, height: number = 300, text: string = 'Image'): string {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f8fafc"/>
        <rect x="2" y="2" width="${width-4}" height="${height-4}" fill="none" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="8,4"/>
        <text x="50%" y="50%" font-family="Inter, sans-serif" font-size="16" text-anchor="middle" dominant-baseline="middle" fill="#64748b">${text}</text>
      </svg>
    `)}`;
  }
}

// Global image loading interceptor for development
if (process.env.NODE_ENV === 'development') {
  const originalImageConstructor = window.Image;
  
  window.Image = function(...args: any[]) {
    const img = new originalImageConstructor(...args);
    
    const originalSetter = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')?.set;
    if (originalSetter) {
      Object.defineProperty(img, 'src', {
        set: function(value: string) {
          if (ImageSafety.shouldBlockImage(value)) {
            console.warn(`Blocked potentially slow external image: ${value}`);
            originalSetter.call(this, ImageSafety.generatePlaceholderSVG(400, 300, 'External Image Blocked'));
          } else {
            originalSetter.call(this, value);
          }
        },
        get: function() {
          return this.getAttribute('src') || '';
        }
      });
    }
    
    return img;
  } as any;
}