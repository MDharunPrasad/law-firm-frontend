import React, { Suspense, lazy } from 'react';

// Lazy load heavy components
export const LazyWhyUs = lazy(() => import('./WhyUs'));
export const LazyServices = lazy(() => import('./Services'));
export const LazyTeam = lazy(() => import('./Team'));
export const LazyTestimonials = lazy(() => import('./Testimonials'));
export const LazyAbout = lazy(() => import('./About').then(module => ({ default: module.About })));
export const LazyContact = lazy(() => import('./Contact'));

// Loading fallback component
const LoadingFallback = ({ height = '400px' }: { height?: string }) => (
  <div 
    className="flex items-center justify-center bg-neutral-bg animate-pulse"
    style={{ height }}
  >
    <div className="w-8 h-8 border-4 border-navy-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Wrapper component for lazy loading with proper fallback
export const LazySection = ({ 
  component: Component, 
  height = '400px',
  ...props 
}: { 
  component: React.ComponentType<any>;
  height?: string;
  [key: string]: any;
}) => (
  <Suspense fallback={<LoadingFallback height={height} />}>
    <Component {...props} />
  </Suspense>
);

export default LazySection;