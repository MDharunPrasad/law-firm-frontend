import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onPageChange: (page: string) => void;
}

export function Footer({ onPageChange }: FooterProps) {
  const { t, isRTL } = useLanguage();
  
  const quickLinks = [
    { label: t('nav.home'), key: 'home' },
    { label: t('nav.services'), key: 'services' },
    { label: t('nav.whyUs'), key: 'why-us' },
    { label: t('nav.team'), key: 'team' },
    { label: t('nav.testimonials'), key: 'testimonials' },
    { label: t('nav.contact'), key: 'contact' }
  ];

  const services = [
    'Company Formation',
    'Litigation & Representation', 
    'Bankruptcy & Debt Restructuring',
    'Estate Liquidation',
    'Trademark Services',
    'Legal Translation'
  ];

  const certifications = [
    'Saudi Bar Association',
    'Ministry of Justice',
    'SAIP Registered',
    'ISO 9001:2015 Certified'
  ];

  return (
    <footer className="bg-navy-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">
                  Ali Bin Fahad Law Firm
                </h3>
                <p className="text-gold-accent text-sm">
                  & Intellectual Property LLC
                </p>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t('footer.description')}
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gold-accent flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    King Fahd Road, Al Olaya District, Riyadh 12213
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gold-accent flex-shrink-0" />
                  <a 
                    href="tel:+966557536255"
                    className="text-sm text-gray-300 hover:text-gold-accent transition-colors"
                  >
                    +966 55 753 6255
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gold-accent flex-shrink-0" />
                  <a 
                    href="mailto:info@abf.sa"
                    className="text-sm text-gray-300 hover:text-gold-accent transition-colors"
                  >
                    info@abf.sa
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-gold-accent">
                {t('footer.quickLinks')}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.key}>
                    <button
                      onClick={() => onPageChange(link.key)}
                      className="text-gray-300 hover:text-gold-accent transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-gold-accent">
                {t('footer.services.title')}
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-gray-300 text-sm">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Certifications & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-gold-accent">
                Certifications
              </h4>
              <ul className="space-y-3 mb-8">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gold-accent rounded-full flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm">{cert}</span>
                  </li>
                ))}
              </ul>

              {/* Social Media */}
              <div>
                <h5 className="font-semibold mb-4 text-gold-accent">Follow Us</h5>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="p-2 bg-blue-supportive/20 rounded-lg hover:bg-gold-accent/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="p-2 bg-blue-supportive/20 rounded-lg hover:bg-gold-accent/20 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="p-2 bg-blue-supportive/20 rounded-lg hover:bg-gold-accent/20 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-supportive/30 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Ali Bin Fahad Law Firm & Intellectual Property LLC. {t('footer.rights')}
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <button className="hover:text-gold-accent transition-colors">
                {t('footer.privacy')}
              </button>
              <button className="hover:text-gold-accent transition-colors">
                {t('footer.terms')}
              </button>
              <button className="hover:text-gold-accent transition-colors">
                Cookie Policy
              </button>
              <span className="text-xs">
                Licensed by Saudi Bar Association
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}