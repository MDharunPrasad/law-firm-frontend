import { motion } from 'motion/react';
import { Award, Clock, Users, Target, Shield, Lightbulb, Heart, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

interface AboutProps {
  showCoreValues?: boolean;
}

export function About({ showCoreValues = false }: AboutProps) {
  const { t, isRTL } = useLanguage();
  
  const coreValues = [
    {
      icon: Award,
      title: t('about.goal.excellence.title'),
      description: t('about.goal.excellence.desc'),
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Shield,
      title: t('about.goal.integrity.title'),
      description: t('about.goal.integrity.desc'),
      gradient: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      icon: Lightbulb,
      title: t('about.goal.innovation.title'),
      description: t('about.goal.innovation.desc'),
      gradient: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      icon: Heart,
      title: t('about.goal.clientFocus.title'),
      description: t('about.goal.clientFocus.desc'),
      gradient: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600'
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Content */}
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-20 ${isRTL ? 'text-right' : 'text-left'}`}>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy-primary mb-4 lg:mb-6 leading-tight">
              {t('about.title')}
            </h2>
            <div className="space-y-4 lg:space-y-6 text-neutral-muted">
              <p className="text-base lg:text-lg leading-relaxed">
                {t('about.description')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1756412066323-a336d2becc10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYXd5ZXIlMjBwb3J0cmFpdCUyMHNhdWRpfGVufDF8fHx8MTc1NzQ4MjgwOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Professional legal consultation"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-primary/60 to-transparent"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className={`absolute -bottom-6 ${isRTL ? '-right-4 lg:-right-8' : '-left-4 lg:-left-8'} bg-white rounded-xl shadow-xl p-4 lg:p-6 border`}>
              <div className="grid grid-cols-2 gap-2 lg:gap-4 text-center">
                <div>
                  <div className="text-lg lg:text-2xl font-bold text-gold-accent">15+</div>
                  <div className="text-xs lg:text-sm text-neutral-muted">Years</div>
                </div>
                <div>
                  <div className="text-lg lg:text-2xl font-bold text-gold-accent">500+</div>
                  <div className="text-xs lg:text-sm text-neutral-muted">Clients</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className={`text-center mb-12 lg:mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <motion.h3 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-primary mb-4 lg:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {t('about.goal.title')}
            </motion.h3>
            <motion.div 
              className="w-24 lg:w-32 h-1 bg-gold-accent mx-auto rounded-full mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: isRTL ? '8rem' : '8rem' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <motion.p 
              className="text-lg lg:text-xl text-neutral-muted max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              The principles that guide our practice and define our commitment to excellence
            </motion.p>
          </div>

          {/* Core Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="group relative gpu-accelerated"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  <div className={`relative h-full ${value.bgColor} rounded-2xl p-6 lg:p-8 transition-all duration-200 group-hover:shadow-2xl border border-gray-100 overflow-hidden`}>
                    {/* Gradient overlay on hover - optimized for speed */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-95 transition-opacity duration-200 rounded-2xl`} />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className={`flex ${isRTL ? 'justify-end' : 'justify-center'} mb-6`}>
                        <div className="p-4 bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                          <Icon className={`h-8 w-8 lg:h-10 lg:w-10 ${value.iconColor} group-hover:text-white transition-colors duration-200`} />
                        </div>
                      </div>
                      
                      <h4 className={`text-xl lg:text-2xl font-bold text-navy-primary mb-4 group-hover:text-white transition-colors duration-200 ${isRTL ? 'text-right' : 'text-center'}`}>
                        {value.title}
                      </h4>
                      
                      <p className={`text-neutral-muted leading-relaxed text-sm lg:text-base group-hover:text-white/90 transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {value.description}
                      </p>
                    </div>

                    {/* Simplified decorative elements for better performance */}
                    <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-16 h-16 bg-white/10 rounded-full ${isRTL ? '-translate-y-8 -translate-x-8' : '-translate-y-8 translate-x-8'} group-hover:scale-125 transition-transform duration-300`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mission Statement */}
          <motion.div
            className="bg-gradient-to-r from-navy-primary to-blue-supportive rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-y-12" />
            </div>
            
            <div className="relative z-10">
              <h4 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6">
                {t('about.mission.title')}
              </h4>
              <p className="text-white/90 text-base lg:text-lg leading-relaxed max-w-4xl mx-auto mb-8">
                {t('about.mission.desc')}
              </p>
              
              <Button
                className="bg-gold-accent hover:bg-gold-accent/90 text-black px-8 py-3 text-base lg:text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                onClick={() => {
                  const contactElement = document.getElementById('schedule-consultation');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('about.consultation.button')}
              </Button>
            </div>
          </motion.div>
        </motion.div>


      </div>
    </section>
  );
}