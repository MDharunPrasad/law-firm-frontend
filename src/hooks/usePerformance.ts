import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  [key: string]: any; // Simplified interface
}

export function usePerformance() {
  const reportMetric = useCallback((metric: PerformanceMetrics) => {
    // Completely disabled to avoid any issues
    return;
  }, []);

  useEffect(() => {
    // All performance monitoring disabled to prevent any dynamic import issues
    return;
  }, [reportMetric]);

  return {
    reportMetric,
  };
}