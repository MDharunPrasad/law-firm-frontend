// Security and performance middleware utilities

export class SecurityMiddleware {
  // Content Security Policy configuration
  static getCSPDirectives(): Record<string, string[]> {
    return {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        "'unsafe-inline'", // Required for React
        "'unsafe-eval'", // Required for development
        'https://fonts.googleapis.com',
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com'
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'", // Required for styled components
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ],
      'img-src': [
        "'self'",
        'data:',
        'blob:',
        'https:',
        'https://images.unsplash.com',
        'https://source.unsplash.com'
      ],
      'font-src': [
        "'self'",
        'https://fonts.gstatic.com',
        'data:'
      ],
      'connect-src': [
        "'self'",
        'https:',
        'wss:',
        'https://www.google-analytics.com'
      ],
      'media-src': ["'self'", 'https:'],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
      'upgrade-insecure-requests': []
    };
  }

  // Generate CSP header string
  static generateCSPHeader(): string {
    const directives = this.getCSPDirectives();
    return Object.entries(directives)
      .map(([directive, sources]) => {
        if (sources.length === 0) return directive;
        return `${directive} ${sources.join(' ')}`;
      })
      .join('; ');
  }

  // Security headers configuration
  static getSecurityHeaders(): Record<string, string> {
    return {
      // Content Security Policy
      'Content-Security-Policy': this.generateCSPHeader(),
      
      // Prevent MIME type sniffing
      'X-Content-Type-Options': 'nosniff',
      
      // Prevent clickjacking
      'X-Frame-Options': 'DENY',
      
      // XSS Protection
      'X-XSS-Protection': '1; mode=block',
      
      // Strict Transport Security
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      
      // Referrer Policy
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      
      // Permissions Policy
      'Permissions-Policy': [
        'camera=()',
        'microphone=()',
        'geolocation=()',
        'gyroscope=()',
        'magnetometer=()',
        'payment=()',
        'usb=()'
      ].join(', '),
      
      // Cross-Origin policies
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-origin'
    };
  }

  // Apply security headers to response
  static applySecurityHeaders(response: Response): Response {
    const headers = this.getSecurityHeaders();
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }
}

export class PerformanceMiddleware {
  // Cache control configuration
  static getCacheControl(path: string): string {
    // Static assets - long cache
    if (path.match(/\.(css|js|woff|woff2|ttf|eot|ico|png|jpg|jpeg|gif|svg|webp|avif)$/)) {
      return 'public, max-age=31536000, immutable'; // 1 year
    }
    
    // HTML files - short cache with revalidation
    if (path.match(/\.(html|htm)$/) || path === '/') {
      return 'public, max-age=0, must-revalidate';
    }
    
    // API responses - no cache
    if (path.startsWith('/api/')) {
      return 'no-cache, no-store, must-revalidate';
    }
    
    // Default - short cache
    return 'public, max-age=3600'; // 1 hour
  }

  // Compression configuration
  static shouldCompress(contentType: string): boolean {
    const compressibleTypes = [
      'text/html',
      'text/css',
      'text/javascript',
      'application/javascript',
      'application/json',
      'application/xml',
      'text/xml',
      'image/svg+xml'
    ];
    
    return compressibleTypes.some(type => contentType.includes(type));
  }

  // Performance headers
  static getPerformanceHeaders(): Record<string, string> {
    return {
      // DNS prefetch control
      'X-DNS-Prefetch-Control': 'on',
      
      // Preload key resources
      'Link': [
        '</styles/globals.css>; rel=preload; as=style',
        '<https://fonts.googleapis.com>; rel=preconnect; crossorigin',
        '<https://fonts.gstatic.com>; rel=preconnect; crossorigin'
      ].join(', '),
      
      // Server timing for performance monitoring
      'Server-Timing': 'total;dur=0',
      
      // Accept encoding
      'Vary': 'Accept-Encoding, Accept, Origin'
    };
  }
}

export class SEOMiddleware {
  // Generate structured data for legal services
  static generateStructuredData(page: string = 'home'): string {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "Ali Bin Fahad Law Firm & Intellectual Property LLC",
      "description": "Premier law firm in Saudi Arabia offering comprehensive legal services",
      "url": "https://abf.sa",
      "telephone": "+966557536255",
      "email": "info@abf.sa",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "King Fahd Road",
        "addressLocality": "Al Olaya District",
        "addressRegion": "Riyadh",
        "postalCode": "12213",
        "addressCountry": "SA"
      },
      "openingHours": ["Mo-Th 08:00-18:00"],
      "areaServed": {
        "@type": "Country",
        "name": "Saudi Arabia"
      }
    };

    // Add page-specific data
    const pageData = this.getPageSpecificData(page);
    return JSON.stringify({ ...baseData, ...pageData });
  }

  private static getPageSpecificData(page: string): Record<string, any> {
    switch (page) {
      case 'services':
        return {
          "makesOffer": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Corporate Law Services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Intellectual Property Services"
              }
            }
          ]
        };
      case 'team':
        return {
          "employee": [
            {
              "@type": "Person",
              "name": "Ali Bin Fahad",
              "jobTitle": "Managing Partner & Founder"
            }
          ]
        };
      default:
        return {};
    }
  }

  // Generate Open Graph meta tags
  static generateOGTags(page: string = 'home'): Record<string, string> {
    const baseTags = {
      'og:site_name': 'Ali Bin Fahad Law Firm',
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:locale:alternate': 'ar_SA'
    };

    const pageTags = this.getPageOGTags(page);
    return { ...baseTags, ...pageTags };
  }

  private static getPageOGTags(page: string): Record<string, string> {
    const baseUrl = 'https://abf.sa';
    
    switch (page) {
      case 'services':
        return {
          'og:title': 'Legal Services - Ali Bin Fahad Law Firm',
          'og:description': 'Comprehensive legal services in Saudi Arabia including corporate law, IP, and litigation',
          'og:url': `${baseUrl}/services`
        };
      case 'contact':
        return {
          'og:title': 'Contact Us - Ali Bin Fahad Law Firm',
          'og:description': 'Get in touch with our legal experts for professional consultation',
          'og:url': `${baseUrl}/contact`
        };
      default:
        return {
          'og:title': 'Ali Bin Fahad Law Firm - Leading Legal Services in Saudi Arabia',
          'og:description': 'Premier law firm offering comprehensive legal services in Saudi Arabia',
          'og:url': baseUrl
        };
    }
  }
}

export class AccessibilityMiddleware {
  // ARIA labels for dynamic content
  static generateARIALabels(contentType: string, language: string = 'en'): Record<string, string> {
    const labels = {
      en: {
        navigation: 'Main navigation',
        search: 'Search legal services',
        contact: 'Contact form',
        testimonials: 'Client testimonials',
        services: 'Legal services',
        team: 'Legal team members'
      },
      ar: {
        navigation: 'التنقل الرئيسي',
        search: 'البحث في الخدمات القانونية',
        contact: 'نموذج الاتصال',
        testimonials: 'شهادات العملاء',
        services: 'الخدمات القانونية',
        team: 'أعضاء الفريق القانوني'
      }
    };

    return labels[language as keyof typeof labels] || labels.en;
  }

  // Generate skip links for better navigation
  static generateSkipLinks(language: string = 'en'): Array<{href: string, text: string}> {
    const links = {
      en: [
        { href: '#main-content', text: 'Skip to main content' },
        { href: '#navigation', text: 'Skip to navigation' },
        { href: '#footer', text: 'Skip to footer' }
      ],
      ar: [
        { href: '#main-content', text: 'انتقل إلى المحتوى الرئيسي' },
        { href: '#navigation', text: 'انتقل إلى التنقل' },
        { href: '#footer', text: 'انتقل إلى التذييل' }
      ]
    };

    return links[language as keyof typeof links] || links.en;
  }
}

// Export utility function to apply all middleware
export function applyMiddleware(request: Request, response: Response, page: string = 'home'): Response {
  // Apply security headers
  SecurityMiddleware.applySecurityHeaders(response);
  
  // Apply performance headers
  const perfHeaders = PerformanceMiddleware.getPerformanceHeaders();
  Object.entries(perfHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Set cache control
  const cacheControl = PerformanceMiddleware.getCacheControl(request.url);
  response.headers.set('Cache-Control', cacheControl);
  
  return response;
}