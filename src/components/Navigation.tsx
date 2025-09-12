import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'services', label: t('nav.services') },
    { key: 'why-us', label: t('nav.whyUs') },
    { key: 'team', label: t('nav.team') },
    { key: 'testimonials', label: t('nav.testimonials') },
    { key: 'contact', label: t('nav.contact') }
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-surface-elevated/95 backdrop-blur-xl shadow-lg border-b border-neutral-bg' 
          : 'bg-surface-elevated/90 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            onClick={() => onPageChange('home')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{ cursor: 'pointer' }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-navy-primary to-blue-supportive rounded-xl flex items-center justify-center">
                <span className="text-gold-accent font-bold text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-navy-primary leading-tight">
                  Ali Bin Fahad Law Firm
                </span>
                <span className="text-xs text-neutral-muted leading-tight">
                  & Intellectual Property LLC
                </span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => onPageChange(item.key)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative group ${
                  currentPage === item.key 
                    ? 'text-gold-accent bg-gold-accent/10' 
                    : 'text-navy-primary hover:text-gold-accent hover:bg-gold-accent/5'
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
                {currentPage === item.key && (
                  <motion.div
                    className="absolute inset-0 bg-gold-accent/10 rounded-lg border border-gold-accent/20"
                    layoutId="activeNavTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
            
            {/* Language Switcher */}
            <motion.button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ml-2 ${
                'text-navy-primary hover:text-gold-accent hover:bg-gold-accent/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Languages size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
              {t('nav.language')}
            </motion.button>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={() => onPageChange('contact')}
                className={`bg-gradient-to-r from-gold-accent to-accent-hover hover:from-accent-hover hover:to-gold-accent text-white font-semibold px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 ${isRTL ? 'mr-4' : 'ml-4'}`}
              >
                {t('hero.consultation')}
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-navy-primary hover:text-gold-accent hover:bg-gold-accent/5 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="lg:hidden bg-surface-elevated border-t border-neutral-bg/20 shadow-xl"
            >
              <div className="px-6 py-8 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    onClick={() => {
                      onPageChange(item.key);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left py-3 px-4 text-base font-medium rounded-lg transition-all duration-300 ${
                      currentPage === item.key 
                        ? 'text-gold-accent bg-gold-accent/10' 
                        : 'text-navy-primary hover:text-gold-accent hover:bg-gold-accent/5'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                {/* Language Switcher Mobile */}
                <motion.button
                  onClick={() => {
                    setLanguage(language === 'en' ? 'ar' : 'en');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full text-left py-3 px-4 text-base font-medium text-navy-primary hover:text-gold-accent hover:bg-gold-accent/5 rounded-lg transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                >
                  <Languages size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                  {t('nav.language')}
                </motion.button>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (navItems.length + 1) * 0.1 }}
                  className="pt-4"
                >
                  <Button 
                    onClick={() => {
                      onPageChange('contact');
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-gold-accent to-accent-hover hover:from-accent-hover hover:to-gold-accent text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t('hero.consultation')}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}