import { memo } from 'react';

interface ProfessionalBackgroundProps {
  variant?: 'hero' | 'section' | 'minimal';
  className?: string;
}

export const ProfessionalBackground = memo(({ 
  variant = 'hero', 
  className = '' 
}: ProfessionalBackgroundProps) => {
  const patterns = {
    hero: (
      <>
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-primary via-blue-supportive to-navy-deep" />
        
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="hero-legal-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                <path d="M0 10 L10 0 L20 10 L10 20 Z" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-legal-pattern)" className="text-gold-accent"/>
          </svg>
        </div>
        
        {/* Professional texture overlay */}
        <div className="absolute inset-0 opacity-3">
          <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="hero-texture-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.1"/>
                <circle cx="10" cy="10" r="0.5" fill="currentColor" opacity="0.05"/>
                <circle cx="30" cy="10" r="0.5" fill="currentColor" opacity="0.05"/>
                <circle cx="10" cy="30" r="0.5" fill="currentColor" opacity="0.05"/>
                <circle cx="30" cy="30" r="0.5" fill="currentColor" opacity="0.05"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-texture-pattern)" className="text-gold-accent"/>
          </svg>
        </div>
        
        {/* Final overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-primary/90 via-navy-primary/70 to-blue-supportive/80" />
      </>
    ),
    
    section: (
      <>
        {/* Light gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-bg via-surface-elevated to-neutral-white" />
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-2">
          <svg className="w-full h-full" viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="section-pattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                <rect width="15" height="15" fill="none" stroke="currentColor" strokeWidth="0.25" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#section-pattern)" className="text-navy-primary"/>
          </svg>
        </div>
      </>
    ),
    
    minimal: (
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-bg to-surface-elevated" />
    )
  };

  return (
    <div className={`absolute inset-0 ${className}`}>
      {patterns[variant]}
    </div>
  );
});

ProfessionalBackground.displayName = 'ProfessionalBackground';