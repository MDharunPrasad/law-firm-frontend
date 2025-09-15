import React from 'react';
import { motion } from 'motion/react';
import { useScrollBackground } from '../hooks/useScrollBackground';

interface ScrollBackgroundProps {
  children: React.ReactNode;
}

export const ScrollBackground: React.FC<ScrollBackgroundProps> = ({ children }) => {
  const { scrollProgress, isDark, getBackgroundStyle } = useScrollBackground();

  return (
    <div className="relative min-h-screen">
      {/* Fixed background that transitions smoothly */}
      <motion.div
        className="fixed inset-0 z-0"
        style={getBackgroundStyle()}
        initial={{ backgroundColor: 'rgb(248, 250, 252)' }}
      />
      
      {/* Subtle gradient overlay for depth */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          background: isDark 
            ? 'linear-gradient(180deg, rgba(30, 41, 59, 0) 0%, rgba(30, 41, 59, 0.05) 100%)'
            : 'linear-gradient(180deg, rgba(248, 250, 252, 0) 0%, rgba(248, 250, 252, 0.05) 100%)',
          opacity: scrollProgress * 0.5,
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-gold-accent to-gold-accent/60 z-50"
        style={{
          width: `${scrollProgress * 100}%`,
          opacity: scrollProgress > 0.05 ? 0.8 : 0,
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />
    </div>
  );
};