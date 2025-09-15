/**
 * Scroll Restoration Utility
 * Provides smooth scroll position saving and restoration across page navigation
 */

interface ScrollPosition {
  x: number;
  y: number;
  timestamp: number;
}

interface ScrollState {
  [page: string]: ScrollPosition;
}

class ScrollRestoration {
  private scrollState: ScrollState = {};
  private currentPage: string = 'home';
  private saveThrottleId: number | null = null;
  private readonly THROTTLE_DELAY = 100; // ms
  private readonly STORAGE_KEY = 'law_firm_scroll_state';
  private isInitialized = false;

  /**
   * Initialize scroll restoration system
   * @returns cleanup function
   */
  initialize(): () => void {
    if (this.isInitialized) {
      return () => {}; // Already initialized
    }

    // Load saved state from sessionStorage
    this.loadScrollState();

    // Set up scroll event listener with throttling
    const handleScroll = () => {
      if (this.saveThrottleId) {
        clearTimeout(this.saveThrottleId);
      }
      
      this.saveThrottleId = window.setTimeout(() => {
        this.saveCurrentScrollPosition();
      }, this.THROTTLE_DELAY);
    };

    // Add passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Save scroll position before page unload
    const handleBeforeUnload = () => {
      this.saveCurrentScrollPosition();
      this.persistScrollState();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    this.isInitialized = true;

    // Return cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (this.saveThrottleId) {
        clearTimeout(this.saveThrottleId);
      }
      this.isInitialized = false;
    };
  }

  /**
   * Set the current page being viewed
   */
  setCurrentPage(page: string): void {
    this.currentPage = page;
  }

  /**
   * Save scroll position for a specific page
   */
  saveScrollPosition(page: string): void {
    try {
      const scrollPosition: ScrollPosition = {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop,
        timestamp: Date.now()
      };

      this.scrollState[page] = scrollPosition;
      this.persistScrollState();
    } catch (error) {
      console.warn('Failed to save scroll position:', error);
    }
  }

  /**
   * Save current scroll position for current page
   */
  private saveCurrentScrollPosition(): void {
    if (this.currentPage) {
      this.saveScrollPosition(this.currentPage);
    }
  }

  /**
   * Restore scroll position for a specific page
   */
  restoreScrollPosition(page: string, scrollToTopIfNotFound: boolean = true): void {
    try {
      const savedPosition = this.scrollState[page];
      
      if (savedPosition) {
        // Use requestAnimationFrame for smooth restoration
        requestAnimationFrame(() => {
          window.scrollTo({
            left: savedPosition.x,
            top: savedPosition.y,
            behavior: 'smooth'
          });
        });
      } else if (scrollToTopIfNotFound) {
        // Scroll to top if no saved position
        requestAnimationFrame(() => {
          window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
          });
        });
      }
    } catch (error) {
      console.warn('Failed to restore scroll position:', error);
      // Fallback to immediate scroll
      if (scrollToTopIfNotFound) {
        try {
          window.scrollTo(0, 0);
        } catch (fallbackError) {
          console.warn('Fallback scroll failed:', fallbackError);
        }
      }
    }
  }

  /**
   * Get saved scroll position for a page
   */
  getScrollPosition(page: string): ScrollPosition | null {
    return this.scrollState[page] || null;
  }

  /**
   * Clear scroll position for a specific page
   */
  clearScrollPosition(page: string): void {
    delete this.scrollState[page];
    this.persistScrollState();
  }

  /**
   * Clear all saved scroll positions
   */
  clearAllScrollPositions(): void {
    this.scrollState = {};
    this.persistScrollState();
  }

  /**
   * Load scroll state from sessionStorage
   */
  private loadScrollState(): void {
    try {
      const saved = sessionStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate and filter out old entries (older than 1 hour)
        const oneHourAgo = Date.now() - (60 * 60 * 1000);
        
        for (const [page, position] of Object.entries(parsed)) {
          const pos = position as ScrollPosition;
          if (pos && pos.timestamp && pos.timestamp > oneHourAgo) {
            this.scrollState[page] = pos;
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load scroll state:', error);
      this.scrollState = {};
    }
  }

  /**
   * Persist scroll state to sessionStorage
   */
  private persistScrollState(): void {
    try {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.scrollState));
    } catch (error) {
      console.warn('Failed to persist scroll state:', error);
    }
  }

  /**
   * Get debug information about current scroll state
   */
  getDebugInfo(): { currentPage: string; scrollState: ScrollState; isInitialized: boolean } {
    return {
      currentPage: this.currentPage,
      scrollState: { ...this.scrollState },
      isInitialized: this.isInitialized
    };
  }
}

// Export singleton instance
export const scrollRestoration = new ScrollRestoration();
export default scrollRestoration;