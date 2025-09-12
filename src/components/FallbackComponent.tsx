import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw, Home, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';

interface FallbackComponentProps {
  error?: Error;
  resetError?: () => void;
  message?: string;
  showContactInfo?: boolean;
}

export function FallbackComponent({ 
  error, 
  resetError, 
  message = "Something went wrong", 
  showContactInfo = true 
}: FallbackComponentProps) {
  const handleRefresh = () => {
    try {
      window.location.reload();
    } catch (e) {
      console.error('Failed to reload page:', e);
    }
  };

  const handleReset = () => {
    try {
      if (resetError) {
        resetError();
      } else {
        handleRefresh();
      }
    } catch (e) {
      console.error('Failed to reset error:', e);
      handleRefresh();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex items-center justify-center px-4">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-surface-elevated rounded-2xl shadow-xl p-8 border border-neutral-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" aria-hidden="true" />
          </div>
          
          <h1 className="text-2xl font-bold text-navy-primary mb-4">
            {message}
          </h1>
          
          <p className="text-neutral-muted mb-6 leading-relaxed">
            We apologize for the inconvenience. Please try refreshing the page or contact us if the problem persists.
          </p>

          {/* Error details for development */}
          {process.env.NODE_ENV === 'development' && error && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-sm font-medium text-red-600 mb-2">
                View Error Details
              </summary>
              <div className="bg-red-50 rounded-lg p-4 text-sm font-mono text-red-800 max-h-32 overflow-y-auto">
                {error.toString()}
                {error.stack && (
                  <pre className="mt-2 text-xs whitespace-pre-wrap">{error.stack}</pre>
                )}
              </div>
            </details>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Button
              onClick={handleReset}
              className="bg-gold-accent hover:bg-accent-hover text-navy-primary focus:ring-2 focus:ring-gold-accent focus:ring-offset-2"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            
            <Button
              variant="outline"
              onClick={handleRefresh}
              className="border-navy-primary text-navy-primary hover:bg-navy-primary hover:text-white focus:ring-2 focus:ring-navy-primary focus:ring-offset-2"
            >
              <Home className="w-4 h-4 mr-2" />
              Refresh Page
            </Button>
          </div>

          {/* Contact information */}
          {showContactInfo && (
            <div className="pt-6 border-t border-neutral-200">
              <p className="text-sm text-neutral-muted mb-4">
                If the problem persists, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <a 
                  href="mailto:info@abf.sa" 
                  className="text-gold-accent hover:underline font-medium flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 rounded"
                >
                  <Mail className="w-4 h-4" />
                  info@abf.sa
                </a>
                <a 
                  href="tel:+966557536255" 
                  className="text-gold-accent hover:underline font-medium flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gold-accent focus:ring-offset-2 rounded"
                >
                  <Phone className="w-4 h-4" />
                  +966 55 753 6255
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}