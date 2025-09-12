// Environment detection utilities for safe execution across different contexts

export class EnvironmentDetector {
  // Check if running in browser
  static get isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  // Check if running in iframe
  static get isIframe(): boolean {
    return this.isBrowser && window.frameElement !== null;
  }

  // Check if running in Figma environment
  static get isFigma(): boolean {
    return this.isBrowser && (
      window.location.hostname.includes('figma') ||
      window.location.hostname.includes('figmaiframepreview') ||
      (window as any).figma !== undefined
    );
  }

  // Check if running in embedded environment (iframe or Figma)
  static get isEmbedded(): boolean {
    return this.isIframe || this.isFigma;
  }

  // Check if in development
  static get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  // Check if in production
  static get isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  // Check if environment supports full features (not embedded)
  static get supportsFullFeatures(): boolean {
    return this.isBrowser && !this.isEmbedded && this.isProduction;
  }

  // Check if should enable performance monitoring
  static get shouldEnablePerformanceMonitoring(): boolean {
    return this.supportsFullFeatures && 'PerformanceObserver' in window;
  }

  // Check if should enable preloading
  static get shouldEnablePreloading(): boolean {
    return this.supportsFullFeatures;
  }

  // Check if should enable security features
  static get shouldEnableSecurityFeatures(): boolean {
    return this.supportsFullFeatures;
  }

  // Check if session storage is available and safe to use
  static get canUseSessionStorage(): boolean {
    return this.isBrowser && 
           !this.isEmbedded && 
           typeof window.sessionStorage !== 'undefined';
  }

  // Check if local storage is available and safe to use
  static get canUseLocalStorage(): boolean {
    return this.isBrowser && 
           !this.isEmbedded && 
           typeof window.localStorage !== 'undefined';
  }

  // Get safe console method that doesn't cause issues in embedded environments
  static safeLog(level: 'log' | 'warn' | 'error' | 'debug' = 'log') {
    return (...args: any[]) => {
      try {
        if (this.isDevelopment || level === 'error') {
          console[level](...args);
        } else if (level === 'warn' && this.isBrowser) {
          console.warn(...args);
        }
      } catch (error) {
        // Silently fail if console is not available
      }
    };
  }

  // Execute code only if environment supports it
  static executeInSupportedEnvironment<T>(
    fn: () => T, 
    fallback?: () => T
  ): T | null {
    try {
      if (this.supportsFullFeatures) {
        return fn();
      } else if (fallback) {
        return fallback();
      }
      return null;
    } catch (error) {
      this.safeLog('warn')('Function execution failed in environment:', error);
      return fallback ? fallback() : null;
    }
  }

  // Get environment info for debugging
  static getEnvironmentInfo(): Record<string, any> {
    return {
      isBrowser: this.isBrowser,
      isIframe: this.isIframe,
      isFigma: this.isFigma,
      isEmbedded: this.isEmbedded,
      isDevelopment: this.isDevelopment,
      isProduction: this.isProduction,
      supportsFullFeatures: this.supportsFullFeatures,
      userAgent: this.isBrowser ? navigator.userAgent : 'N/A',
      hostname: this.isBrowser ? window.location.hostname : 'N/A'
    };
  }
}

// Export convenience functions
export const { 
  isBrowser, 
  isIframe, 
  isFigma, 
  isEmbedded, 
  isDevelopment, 
  isProduction,
  supportsFullFeatures,
  shouldEnablePerformanceMonitoring,
  shouldEnablePreloading,
  shouldEnableSecurityFeatures,
  canUseSessionStorage,
  canUseLocalStorage,
  safeLog,
  executeInSupportedEnvironment,
  getEnvironmentInfo
} = EnvironmentDetector;