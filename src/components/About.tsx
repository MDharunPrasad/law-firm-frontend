import { motion } from 'motion/react';
import { Award, Clock, Users, Target, Shield, Lightbulb, Heart, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { ShaderAnimation } from './ui/shader-animation';

interface AboutProps {
  showCoreValues?: boolean;
}

export function About({ showCoreValues = false }: AboutProps) {
  const { t, isRTL } = useLanguage();
  
  const coreValues = [
    {
      icon: Award,
      title: 'Legal Excellence',
      description: 'Delivering exceptional legal services with precision, expertise, and unwavering attention to detail in every case we handle.',
      iconColor: 'text-navy-primary'
    },
    {
      icon: Shield,
      title: 'Professional Integrity',
      description: 'Maintaining the highest ethical standards and building trust through transparent, honest, and reliable legal counsel.',
      iconColor: 'text-navy-primary'
    },
    {
      icon: Lightbulb,
      title: 'Innovative Solutions',
      description: 'Leveraging cutting-edge legal strategies and modern technology to provide efficient and effective solutions.',
      iconColor: 'text-navy-primary'
    },
    {
      icon: Heart,
      title: 'Client-Centered Approach',
      description: 'Placing our clients at the heart of everything we do, ensuring personalized service and exceptional results.',
      iconColor: 'text-navy-primary'
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
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTU2fDB8MXxzZWFyY2h8NXx8YnVzaW5lc3MlMjBtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzQzNjI0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Professional businessman smiling portrait"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-primary/5 to-transparent"></div>
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
          <div className="text-center mb-12 lg:mb-16">
            <motion.h3 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-primary mb-4 lg:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Core Values
            </motion.h3>
            <motion.div 
              className="w-24 lg:w-32 h-1 bg-gold-accent mx-auto rounded-full mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: '8rem' }}
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
                  className="group relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="relative h-full bg-white rounded-2xl p-6 lg:p-8 transition-all duration-300 group-hover:shadow-2xl border border-gray-200 group-hover:border-gold-accent/30 overflow-hidden min-h-[280px] flex flex-col">
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-accent/5 to-navy-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center flex-grow">
                      {/* Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="p-4 bg-gradient-to-br from-gold-accent/10 to-gold-accent/20 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                          <Icon className={`h-8 w-8 lg:h-10 lg:w-10 ${value.iconColor} transition-colors duration-300`} />
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h4 className="text-xl lg:text-2xl font-bold text-navy-primary mb-4 group-hover:text-navy-primary transition-colors duration-300 leading-tight">
                        {value.title}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-neutral-muted leading-relaxed text-sm lg:text-base group-hover:text-neutral-secondary transition-colors duration-300 flex-grow">
                        {value.description}
                      </p>
                    </div>

                    {/* Decorative corner element */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gold-accent/10 rounded-full group-hover:bg-gold-accent/20 group-hover:scale-125 transition-all duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Our Mission Section */}
          <motion.div
            className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-navy-primary"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <ShaderAnimation />
            <div className="absolute z-10 text-center px-4">
              <h3 className="text-2xl md:text-4xl lg:text-6xl leading-none font-bold tracking-tight text-white mb-4">
                Our Mission
              </h3>
              <p className="text-white/90 text-base lg:text-lg leading-relaxed max-w-4xl mx-auto mb-8">
                To be the leading law firm in Saudi Arabia, recognized for our expertise, integrity, and commitment to delivering exceptional legal services that exceed client expectations.
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
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </motion.div>


      </div>
    </section>
  );
}