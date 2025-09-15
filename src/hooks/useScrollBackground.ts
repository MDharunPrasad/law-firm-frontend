import { useState, useEffect } from 'react';

export const useScrollBackground = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / Math.max(docHeight * 0.3, 500), 1); // Transition completes at 30% of total scroll or 500px minimum
      
      setScrollProgress(progress);
      setIsDark(progress > 0.4); // Switch to dark theme earlier for better UX
    };

    // Throttle scroll events for better performance
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
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Calculate background color based on scroll progress with smooth interpolation
  const getBackgroundStyle = () => {
    const whiteRgb = { r: 248, g: 250, b: 252 }; // neutral-bg color
    const darkRgb = { r: 30, g: 41, b: 59 }; // navy-primary color
    
    // Use easing function for smoother transition
    const easeProgress = scrollProgress < 0.5 
      ? 2 * scrollProgress * scrollProgress 
      : 1 - Math.pow(-2 * scrollProgress + 2, 3) / 2;
    
    const r = Math.round(whiteRgb.r + (darkRgb.r - whiteRgb.r) * easeProgress);
    const g = Math.round(whiteRgb.g + (darkRgb.g - whiteRgb.g) * easeProgress);
    const b = Math.round(whiteRgb.b + (darkRgb.b - whiteRgb.b) * easeProgress);
    
    return {
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
      transition: 'none', // Smooth transition handled by scroll
    };
  };

  // Get text color that contrasts with background
  const getTextColor = () => {
    return isDark ? 'text-white' : 'text-navy-primary';
  };

  // Get navigation background style
  const getNavStyle = () => {
    const opacity = Math.min(0.9 + scrollProgress * 0.1, 1);
    return {
      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(248, 250, 252, 0.95)',
      backdropFilter: 'blur(12px)',
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(30, 41, 59, 0.1)',
    };
  };

  return {
    scrollProgress,
    isDark,
    getBackgroundStyle,
    getTextColor,
    getNavStyle,
  };
};