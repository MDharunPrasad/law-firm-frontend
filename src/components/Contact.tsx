import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useCallback, useMemo } from 'react';

function Contact() {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [csrfToken] = useState(() => crypto.getRandomValues(new Uint8Array(16)).join(''));

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    try {
      // Basic client-side validation
      const validationErrors: string[] = [];
      
      if (!formData.name.trim()) {
        validationErrors.push('Name is required');
      }
      
      if (!formData.email.trim()) {
        validationErrors.push('Email is required');
      } else if (!formData.email.includes('@')) {
        validationErrors.push('Please enter a valid email address');
      }
      
      if (!formData.subject.trim()) {
        validationErrors.push('Subject is required');
      }
      
      if (!formData.message.trim()) {
        validationErrors.push('Message is required');
      } else if (formData.message.trim().length < 10) {
        validationErrors.push('Message must be at least 10 characters');
      }

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        return;
      }

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would be an API call with proper authentication
      console.log('Form submission:', {
        ...formData,
        timestamp: new Date().toISOString(),
        csrfToken
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      setErrors(['An error occurred while sending your message. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, csrfToken]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Simple sanitization - remove any HTML tags
    const sanitizedValue = value.replace(/<[^>]*>?/gm, '').trim();
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    
    // Clear errors on input change
    if (errors.length > 0) {
      setErrors([]);
    }
  }, [errors.length]);

  const contactInfo = useMemo(() => [
    {
      icon: MapPin,
      title: t('contact.office'),
      details: ['King Fahd Road', 'Al Olaya District', 'Riyadh 12213, Saudi Arabia'],
      link: 'https://maps.google.com/?q=King+Fahd+Road+Al+Olaya+District+Riyadh',
      ariaLabel: 'Office location on map'
    },
    {
      icon: Phone,
      title: t('contact.phone.label'),
      details: ['+966 55 753 6255'],
      link: 'tel:+966557536255',
      ariaLabel: 'Call phone number'
    },
    {
      icon: Mail,
      title: t('contact.email.label'),
      details: ['info@abf.sa', 'legal@abf.sa'],
      link: 'mailto:info@abf.sa',
      ariaLabel: 'Send email'
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      details: ['Sunday - Thursday: 8:00 AM - 6:00 PM', 'Friday - Saturday: Closed'],
      link: null,
      ariaLabel: null
    }
  ], [t]);

  return (
    <section className="pt-20 pb-16 lg:pt-16 lg:pb-20 bg-neutral-bg" role="main" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <h1 id="contact-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-primary mb-4 lg:mb-6 text-center">
            {t('contact.title')}
          </h1>
          <p className="text-xl lg:text-2xl text-neutral-muted max-w-4xl mx-auto leading-relaxed text-center">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            viewport={{ once: true }}
          >
            <div className="space-y-8 mb-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'} group`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: isRTL ? -5 : 5 }}
                  >
                    <div className="flex-shrink-0 p-4 bg-gradient-to-br from-gold-accent/10 to-gold-accent/5 rounded-2xl group-hover:from-gold-accent/20 group-hover:to-gold-accent/10 transition-all duration-300 border border-gold-accent/20">
                      <Icon className="h-6 w-6 text-gold-accent" aria-hidden="true" />
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <h3 className="font-bold text-navy-primary mb-2 text-lg">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-neutral-muted mb-1">
                          {info.link ? (
                            <a 
                              href={info.link} 
                              className="hover:text-gold-accent transition-colors duration-300 focus:text-gold-accent focus:outline-none focus:ring-2 focus:ring-gold-accent/20 rounded"
                              aria-label={info.ariaLabel || undefined}
                            >
                              {detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Security Notice */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" aria-hidden="true" />
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Secure & Confidential
                  </h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    All communications are protected by attorney-client privilege and encrypted for your privacy and security.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            viewport={{ once: true }}
            className="h-full flex"
          >
            <Card className="shadow-2xl border-0 bg-surface-elevated w-full flex flex-col">
              <CardHeader className="text-center lg:text-left flex-shrink-0">
                <CardTitle className={`text-2xl lg:text-3xl font-bold text-navy-primary ${isRTL ? 'text-right' : 'text-left'}`}>
                  Send us a Message
                </CardTitle>
                <p className={`text-neutral-muted ${isRTL ? 'text-right' : 'text-left'}`}>
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-emerald-900">Message Sent Successfully!</h4>
                      <p className="text-emerald-800 text-sm">We'll respond within 24 hours.</p>
                    </div>
                  </motion.div>
                )}

                {errors.length > 0 && (
                  <motion.div
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-900 mb-2">Please correct the following:</h4>
                        <ul className="text-red-800 text-sm space-y-1">
                          {errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <input type="hidden" name="csrf_token" value={csrfToken} />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-navy-primary font-medium">
                        {t('contact.name')} *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        aria-required="true"
                        aria-describedby="name-help"
                        className="mt-2 border-neutral-300 focus:border-gold-accent focus:ring-gold-accent/20 transition-colors duration-300"
                        placeholder={isRTL ? "اسمك الكامل" : "Your full name"}
                        disabled={isSubmitting}
                      />
                      <p id="name-help" className="sr-only">Enter your full name for contact purposes</p>
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-navy-primary font-medium">
                        {t('contact.phone')}
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        aria-describedby="phone-help"
                        className="mt-2 border-neutral-300 focus:border-gold-accent focus:ring-gold-accent/20 transition-colors duration-300"
                        placeholder="+966 XX XXX XXXX"
                        disabled={isSubmitting}
                      />
                      <p id="phone-help" className="sr-only">Enter your phone number including country code</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-navy-primary font-medium">
                      {t('contact.email')} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      aria-required="true"
                      aria-describedby="email-help"
                      className="mt-2 border-neutral-300 focus:border-gold-accent focus:ring-gold-accent/20 transition-colors duration-300"
                      placeholder={isRTL ? "بريدك الإلكتروني" : "your.email@example.com"}
                      disabled={isSubmitting}
                    />
                    <p id="email-help" className="sr-only">Enter a valid email address for our response</p>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-navy-primary font-medium">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      aria-required="true"
                      aria-describedby="subject-help"
                      className="mt-2 border-neutral-300 focus:border-gold-accent focus:ring-gold-accent/20 transition-colors duration-300"
                      placeholder={isRTL ? "موضوع استفسارك القانوني" : "Brief description of your legal matter"}
                      disabled={isSubmitting}
                    />
                    <p id="subject-help" className="sr-only">Brief description of your legal matter</p>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-navy-primary font-medium">
                      {t('contact.message')} *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      aria-required="true"
                      aria-describedby="message-help"
                      rows={6}
                      className="mt-2 border-neutral-300 focus:border-gold-accent focus:ring-gold-accent/20 resize-none transition-colors duration-300"
                      placeholder={isRTL ? "تفاصيل استفسارك القانوني..." : "Please provide details about your legal inquiry..."}
                      disabled={isSubmitting}
                    />
                    <p id="message-help" className="sr-only">Provide detailed information about your legal inquiry</p>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-gold-accent to-accent-hover hover:from-accent-hover hover:to-gold-accent text-white py-4 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      size="lg"
                      disabled={isSubmitting}
                      aria-describedby="submit-help"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          {t('contact.send')}
                          <Send className={`${isRTL ? 'mr-2' : 'ml-2'} h-5 w-5 group-hover:translate-x-1 transition-transform`} />
                        </>
                      )}
                    </Button>
                  </motion.div>
                  <p id="submit-help" className="sr-only">Submit your message to our legal team</p>

                  <p className="text-sm text-neutral-muted text-center leading-relaxed">
                    By submitting this form, you agree to our privacy policy and 
                    consent to be contacted regarding your inquiry.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Extra spacing before footer */}
        <div className="h-24 lg:h-32"></div>
      </div>
    </section>
  );
}

export default Contact;