import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';

// Immediate load for critical above-the-fold components
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

// Lazy load heavy components for better performance
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Services = lazy(() => import('./components/Services'));
const Team = lazy(() => import('./components/Team'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const WhyUs = lazy(() => import('./components/WhyUs'));

// Simple loading component
const LoadingSpinner = ({ message = "Loading..." }: { message?: string }) => (
  <div className="min-h-screen bg-neutral-bg flex items-center justify-center" role="status" aria-live="polite">
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div 
        className="w-12 h-12 border-4 border-gold-accent/30 border-t-gold-accent rounded-full animate-spin mx-auto mb-4" 
        aria-hidden="true"
      />
      <h2 className="text-xl font-semibold text-navy-primary mb-2">Ali Bin Fahad Law Firm</h2>
      <p className="text-gold-accent text-sm" aria-live="polite">{message}</p>
    </motion.div>
  </div>
);

// Page wrapper for transitions
const PageWrapper = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
    className={`transform-gpu ${className}`}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll background animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / Math.max(docHeight * 0.3, 500), 1);
      setScrollProgress(progress);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Calculate background color
  const getBackgroundColor = () => {
    const whiteRgb = { r: 248, g: 250, b: 252 };
    const darkRgb = { r: 30, g: 41, b: 59 };
    
    const easeProgress = scrollProgress < 0.5 
      ? 2 * scrollProgress * scrollProgress 
      : 1 - Math.pow(-2 * scrollProgress + 2, 3) / 2;
    
    const r = Math.round(whiteRgb.r + (darkRgb.r - whiteRgb.r) * easeProgress);
    const g = Math.round(whiteRgb.g + (darkRgb.g - whiteRgb.g) * easeProgress);
    const b = Math.round(whiteRgb.b + (darkRgb.b - whiteRgb.b) * easeProgress);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    // Simple initialization
    const timer = setTimeout(() => setIsInitialLoad(false), 600);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Add skip to content link
    let skipLink = document.querySelector('.skip-to-content') as HTMLAnchorElement;
    if (!skipLink) {
      skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'skip-to-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.setAttribute('aria-label', 'Skip to main content');
      document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Basic SEO setup
    const updatePageTitle = () => {
      try {
        document.title = currentPage === 'home' 
          ? 'Ali Bin Fahad Law Firm - Leading Legal Services in Saudi Arabia'
          : `${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} - Ali Bin Fahad Law Firm`;
      } catch (error) {
        console.warn('Failed to update page title:', error);
      }
    };

    updatePageTitle();

    // Ensure scroll position is at top when page changes
    const scrollToTop = () => {
      try {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } catch (error) {
        console.warn('Failed to scroll to top on page change:', error);
      }
    };

    // Add a small delay to ensure DOM is ready
    const scrollTimer = setTimeout(scrollToTop, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimer);
    };
  }, [currentPage]);

  const handlePageChange = useCallback((page: string) => {
    // Set the page first, then scroll will happen in onExitComplete
    setCurrentPage(page);
  }, []);

  const handleContactClick = useCallback(() => {
    handlePageChange('contact');
  }, [handlePageChange]);

  const handleServiceClick = useCallback((service: string) => {
    if (service === 'contact') {
      handlePageChange('contact');
    } else {
      handlePageChange('services');
    }
  }, [handlePageChange]);

  if (isInitialLoad) {
    return <LoadingSpinner message="Preparing your legal consultation..." />;
  }

  const renderPage = () => {
    try {
      switch (currentPage) {
        case 'home':
          return (
            <PageWrapper>
              <Hero onContactClick={handleContactClick} />
              <About showCoreValues={true} />
            </PageWrapper>
          );
        case 'services':
          return (
            <PageWrapper className="pt-20">
              <Services onServiceClick={handleServiceClick} showHeader={true} />
            </PageWrapper>
          );
        case 'why-us':
          return (
            <PageWrapper className="pt-20">
              <WhyUs />
            </PageWrapper>
          );
        case 'team':
          return (
            <PageWrapper className="pt-20">
              <Team onContactClick={handleContactClick} />
            </PageWrapper>
          );
        case 'testimonials':
          return (
            <PageWrapper className="pt-20">
              <Testimonials />
            </PageWrapper>
          );
        case 'contact':
          return (
            <PageWrapper className="pt-20">
              <Contact />
            </PageWrapper>
          );
        default:
          return (
            <PageWrapper>
              <Hero onContactClick={handleContactClick} />
              <About showCoreValues={true} />
            </PageWrapper>
          );
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-bg">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-navy-primary mb-4">Page Loading Error</h2>
            <p className="text-neutral-muted mb-6">There was an error loading this page. Please try refreshing.</p>
            <button 
              onClick={() => {
                try {
                  window.location.reload();
                } catch (e) {
                  console.error('Failed to reload page:', e);
                }
              }} 
              className="bg-gold-accent text-navy-primary px-6 py-2 rounded-lg font-medium hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-gold-accent focus:ring-offset-2"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div className="relative min-h-screen">
          {/* Fixed background that transitions smoothly */}
          <motion.div
            className="fixed inset-0 z-0"
            style={{
              backgroundColor: getBackgroundColor(),
            }}
            initial={{ backgroundColor: 'rgb(248, 250, 252)' }}
          />
          
          {/* Progress indicator */}
          <motion.div
            className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-gold-accent to-gold-accent/60 z-50"
            style={{
              width: `${scrollProgress * 100}%`,
              opacity: scrollProgress > 0.05 ? 0.8 : 0,
            }}
            transition={{ opacity: { duration: 0.3 } }}
          />
          
          <div className="relative z-10 min-h-screen antialiased">
            {/* Skip to main content for accessibility */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-gold-accent text-navy-primary px-4 py-2 rounded-lg font-medium z-50"
            >
              Skip to main content
            </a>

            <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
            
            <main id="main-content" role="main">
              <AnimatePresence 
                mode="wait" 
                onExitComplete={() => {
                  // Force scroll to top with multiple approaches for reliability
                  try {
                    // Method 1: Instant scroll
                    window.scrollTo(0, 0);
                    
                    // Method 2: Set scroll on document element
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    
                    // Method 3: Use requestAnimationFrame to ensure it happens after render
                    requestAnimationFrame(() => {
                      window.scrollTo(0, 0);
                      document.documentElement.scrollTop = 0;
                      document.body.scrollTop = 0;
                    });
                  } catch (error) {
                    console.warn('Failed to scroll to top:', error);
                  }
                }}
              >
                <ErrorBoundary>
                  <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
                    {renderPage()}
                  </Suspense>
                </ErrorBoundary>
              </AnimatePresence>
            </main>
            
            <Footer onPageChange={handlePageChange} />
            <FloatingActions />
          </div>
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
}