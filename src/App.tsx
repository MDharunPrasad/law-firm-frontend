import { useState, useEffect, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';

// Import all components directly to avoid dynamic import issues
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import Services from './components/Services';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import WhyUs from './components/WhyUs';

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

  useEffect(() => {
    // Simple initialization
    const timer = setTimeout(() => setIsInitialLoad(false), 600);

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

    return () => {
      clearTimeout(timer);
    };
  }, [currentPage]);

  const handlePageChange = useCallback((page: string) => {
    // Simple page navigation
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      // Fallback for environments that don't support smooth scroll
      try {
        window.scrollTo(0, 0);
      } catch (fallbackError) {
        console.warn('Failed to scroll to top:', fallbackError);
      }
    }
    
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
        <div className="min-h-screen bg-neutral-bg antialiased">
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
                try {
                  window.scrollTo(0, 0);
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
      </LanguageProvider>
    </ErrorBoundary>
  );
}