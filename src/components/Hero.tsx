import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, Scale, Shield, Users } from 'lucide-react';
import { ProfessionalBackground } from './ProfessionalBackground';
import { useLanguage } from '../contexts/LanguageContext';
import WireframeDottedGlobe from './ui/wireframe-dotted-globe.tsx';

interface HeroProps {
  onContactClick: () => void;
}

export function Hero({ onContactClick }: HeroProps) {
  const { t, isRTL } = useLanguage();
  
  const stats = [
    { icon: Scale, value: '15+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Clients Served' },
    { icon: Shield, value: '98%', label: 'Success Rate' }
  ];

  return (
    <section className="relative h-screen lg:h-[120vh] flex items-center bg-gradient-to-br from-navy-primary via-blue-supportive to-navy-deep overflow-hidden pt-24">
      {/* Professional background - zero external dependencies, instant loading */}
      <ProfessionalBackground variant="hero" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`text-white ${isRTL ? 'text-right' : 'text-left'}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ paddingTop: '50px' }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {t('hero.title')}
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gold-accent mb-6">
                {t('hero.subtitle')}
              </h2>
            </motion.div>

            <motion.p
              className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              className={`flex flex-col sm:flex-row gap-4 mb-12 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                onClick={onContactClick}
                size="lg"
                className="bg-gold-accent hover:bg-gold-accent/90 text-black px-8 py-4 group"
              >
                {t('hero.consultation')}
                <ArrowRight className={`${isRTL ? 'mr-2' : 'ml-2'} h-5 w-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white px-8 py-4 bg-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white group"
                style={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '--hover-text-color': '#000000'
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
              >
                <span className="group-hover:text-black transition-colors duration-300">
                  {t('hero.services')}
                </span>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ marginBottom: '50px' }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="h-8 w-8 text-gold-accent mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Rotating Globe */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="ml-8"> {/* Move globe to the right */}
              <WireframeDottedGlobe 
                className="w-full max-w-lg mx-auto h-96"
                globeConfig={{
                  radius: 150,
                  enablePointerInteraction: true,
                  enableAutoRotate: true,
                  autoRotateSpeed: 0.5,
                  baseColor: '#D4AF37',
                  glowColor: '#F4D03F',
                  backgroundColor: 'transparent'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
}