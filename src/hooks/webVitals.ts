// Simplified Web Vitals implementation
interface Metric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

type MetricCallback = (metric: Metric) => void;

// Largest Contentful Paint
export function getLCP(callback: MetricCallback) {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        const value = lastEntry.startTime;
        callback({
          name: 'LCP',
          value,
          rating: value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor'
        });
      }
    });
    
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP measurement not supported');
    }
  }
}

// First Input Delay
export function getFID(callback: MetricCallback) {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry: any) => {
        const value = entry.processingStart - entry.startTime;
        callback({
          name: 'FID',
          value,
          rating: value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor'
        });
      });
    });
    
    try {
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID measurement not supported');
    }
  }
}

// Cumulative Layout Shift
export function getCLS(callback: MetricCallback) {
  if ('PerformanceObserver' in window) {
    let clsValue = 0;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      callback({
        name: 'CLS',
        value: clsValue,
        rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor'
      });
    });
    
    try {
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS measurement not supported');
    }
  }
}

// First Contentful Paint
export function getFCP(callback: MetricCallback) {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          const value = entry.startTime;
          callback({
            name: 'FCP',
            value,
            rating: value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor'
          });
        }
      });
    });
    
    try {
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.warn('FCP measurement not supported');
    }
  }
}

// Time to First Byte
export function getTTFB(callback: MetricCallback) {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      const value = navigation.responseStart - navigation.requestStart;
      callback({
        name: 'TTFB',
        value,
        rating: value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor'
      });
    }
  }
}