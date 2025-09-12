// Security utilities for form validation and sanitization

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  validator?: (value: string) => boolean;
}

type ValidationSchema = Record<string, ValidationRule>;

export class SecurityUtils {
  // Input sanitization
  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';
    
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/&/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'");
  }

  // Email validation
  static validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  }

  // Phone validation for Saudi Arabia
  static validateSaudiPhone(phone: string): boolean {
    // Saudi phone number patterns: +966XXXXXXXXX or 05XXXXXXXX
    const phoneRegex = /^(\+966|0)?5[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  }

  // Name validation (Arabic and English letters only)
  static validateName(name: string): boolean {
    const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{2,50}$/;
    return nameRegex.test(name);
  }

  // Content Security Policy headers
  static getCSPHeader(): string {
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://images.unsplash.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https:",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; ');
  }

  // Rate limiting for form submissions
  static createRateLimiter(maxRequests: number = 5, windowMs: number = 15 * 60 * 1000) {
    const requests = new Map<string, number[]>();

    return (identifier: string): boolean => {
      const now = Date.now();
      const userRequests = requests.get(identifier) || [];
      
      // Remove old requests outside the time window
      const validRequests = userRequests.filter(time => now - time < windowMs);
      
      if (validRequests.length >= maxRequests) {
        return false; // Rate limit exceeded
      }
      
      validRequests.push(now);
      requests.set(identifier, validRequests);
      return true;
    };
  }

  // Generate CSRF token
  static generateCSRFToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Validate CSRF token
  static validateCSRFToken(token: string, sessionToken: string): boolean {
    return token === sessionToken && token.length === 64;
  }

  // Secure headers for API responses
  static getSecurityHeaders(): Record<string, string> {
    return {
      'Content-Security-Policy': this.getCSPHeader(),
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    };
  }

  // Encrypt sensitive data (client-side hashing for non-sensitive data)
  static async hashData(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Secure session storage (safe for all environments)
  static setSecureItem(key: string, value: string): void {
    try {
      if (typeof window === 'undefined' || 
          !window.sessionStorage ||
          window.frameElement ||
          window.location.hostname.includes('figma')) {
        console.debug('Session storage not available or in embedded environment');
        return;
      }
      
      const encryptedValue = btoa(encodeURIComponent(value)); // Better encoding with URI component
      sessionStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.warn('Failed to store secure item:', error);
    }
  }

  static getSecureItem(key: string): string | null {
    try {
      if (typeof window === 'undefined' || 
          !window.sessionStorage ||
          window.frameElement ||
          window.location.hostname.includes('figma')) {
        console.debug('Session storage not available or in embedded environment');
        return null;
      }
      
      const encryptedValue = sessionStorage.getItem(key);
      return encryptedValue ? decodeURIComponent(atob(encryptedValue)) : null;
    } catch (error) {
      console.warn('Failed to retrieve secure item:', error);
      return null;
    }
  }
}

// Form validation schemas
export const ValidationSchemas = {
  contact: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      validator: SecurityUtils.validateName
    },
    email: {
      required: true,
      validator: SecurityUtils.validateEmail
    },
    phone: {
      required: false,
      validator: SecurityUtils.validateSaudiPhone
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000
    }
  }
};

// Security middleware for form submissions
export class FormSecurity {
  private static rateLimiter = SecurityUtils.createRateLimiter(3, 10 * 60 * 1000); // 3 requests per 10 minutes
  private static csrfTokens = new Set<string>();

  static validateForm(formData: Record<string, any>, schema: ValidationSchema): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const [field, rules] of Object.entries(schema)) {
      const value = formData[field];

      if (rules.required && (!value || value.trim() === '')) {
        errors.push(`${field} is required`);
        continue;
      }

      if (value) {
        const sanitizedValue = SecurityUtils.sanitizeInput(value);
        formData[field] = sanitizedValue;

        if (rules.minLength && sanitizedValue.length < rules.minLength) {
          errors.push(`${field} must be at least ${rules.minLength} characters`);
        }

        if (rules.maxLength && sanitizedValue.length > rules.maxLength) {
          errors.push(`${field} must not exceed ${rules.maxLength} characters`);
        }

        if (rules.validator && !rules.validator(sanitizedValue)) {
          errors.push(`${field} format is invalid`);
        }
      }
    }

    return { isValid: errors.length === 0, errors };
  }

  static checkRateLimit(identifier: string): boolean {
    return this.rateLimiter(identifier);
  }

  static generateFormToken(): string {
    const token = SecurityUtils.generateCSRFToken();
    this.csrfTokens.add(token);
    return token;
  }

  static validateFormToken(token: string): boolean {
    const isValid = this.csrfTokens.has(token);
    if (isValid) {
      this.csrfTokens.delete(token); // One-time use
    }
    return isValid;
  }
}