import { motion } from 'motion/react';
import { Shield, Monitor, Users, Clock, Building, RefreshCw, Award, CheckCircle, Star, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

function WhyUs() {
  const { t, isRTL } = useLanguage();
  
  const advantages = [
    {
      title: 'Highest Standards of Integrity',
      description: 'We uphold the highest ethical standards, providing honest and transparent legal services while adhering to professional excellence and Islamic principles.',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Digital Legal Solutions',
      description: 'Modern technology integration for efficient service delivery, including online consultations, document management, and real-time case tracking.',
      icon: Monitor,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Expert Legal Team',
      description: 'Our diverse team of specialized lawyers brings comprehensive expertise across all areas of law, ensuring the best possible outcomes.',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Rapid Response Time',
      description: 'We understand the urgency of legal matters and guarantee prompt responses to all client inquiries through multiple communication channels.',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Professional Excellence',
      description: 'Our commitment to continuous improvement and professional development ensures we deliver cutting-edge legal solutions.',
      icon: Award,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Ongoing Client Support',
      description: 'Comprehensive follow-up services and regular updates keep you informed about your case progress and any legal developments.',
      icon: RefreshCw,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-neutral-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-primary mb-6 lg:mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('whyus.title')}
          </motion.h1>
          <motion.p 
            className="text-xl lg:text-2xl text-neutral-muted max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('whyus.subtitle')}
          </motion.p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {advantages.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -16, 
                  scale: 1.03,
                  transition: { 
                    duration: 0.18, 
                    ease: [0.23, 1, 0.32, 1] // Slightly slower for better feel
                  } 
                }}
              >
                <div className={`relative h-full ${item.bgColor} rounded-2xl lg:rounded-3xl p-6 lg:p-8 transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-2xl border border-gray-100 overflow-hidden will-change-transform`}>
                  {/* Content */}
                  <div className="relative z-20">
                    <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'} mb-6`}>
                      <div className="p-4 bg-white backdrop-blur-md rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:bg-white border-2 border-white/30 group-hover:border-white">
                        <IconComponent className={`h-8 w-8 lg:h-10 lg:w-10 text-gray-700 group-hover:text-gray-900 transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] relative z-30 font-bold`} />
                      </div>
                    </div>
                    
                    {/* Title - keeping original colors */}
                    <h3 className={`text-xl lg:text-2xl font-bold text-navy-primary mb-4 leading-tight transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] ${isRTL ? 'text-right' : 'text-left'}`}>
                      {item.title}
                    </h3>
                    
                    {/* Description - keeping original colors */}
                    <p className={`text-neutral-muted font-medium leading-relaxed transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] ${isRTL ? 'text-right' : 'text-left'}`}>
                      {item.description}
                    </p>
                  </div>

                  {/* Subtle decorative elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/4 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 group-hover:bg-white/8 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/4 rounded-full translate-y-10 -translate-x-10 group-hover:scale-125 group-hover:bg-white/8 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform" />
                  
                  {/* Glowing border effect with CSS */}
                  <div className={`absolute inset-0 rounded-2xl lg:rounded-3xl border-2 border-transparent group-hover:border-current transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5),0_0_40px_rgba(59,130,246,0.3),0_0_60px_rgba(59,130,246,0.1)]`} 
                    style={{
                      '--tw-shadow-color': index === 0 ? 'rgb(59 130 246)' : 
                                           index === 1 ? 'rgb(16 185 129)' : 
                                           index === 2 ? 'rgb(168 85 247)' : 
                                           index === 3 ? 'rgb(249 115 22)' : 
                                           index === 4 ? 'rgb(239 68 68)' : 
                                           'rgb(20 184 166)',
                      borderColor: 'transparent'
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      const colors = [
                        'rgb(59 130 246)',   // blue
                        'rgb(16 185 129)',   // emerald  
                        'rgb(168 85 247)',   // purple
                        'rgb(249 115 22)',   // orange
                        'rgb(239 68 68)',    // red
                        'rgb(20 184 166)'    // teal
                      ];
                      const color = colors[index] || colors[0];
                      e.currentTarget.style.borderColor = color;
                      e.currentTarget.style.boxShadow = `0 0 20px ${color.replace('rgb', 'rgba').replace(')', ', 0.5)')}, 0 0 40px ${color.replace('rgb', 'rgba').replace(')', ', 0.3)')}, 0 0 60px ${color.replace('rgb', 'rgba').replace(')', ', 0.1)')}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats & CTA Section */}
        <motion.div
          className="relative bg-gradient-to-br from-navy-primary via-blue-supportive to-navy-deep rounded-3xl lg:rounded-[2rem] p-8 lg:p-16 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gold-accent to-transparent rounded-full -translate-y-48 translate-x-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-gold-accent to-transparent rounded-full translate-y-32 -translate-x-32" />
          </div>
          
          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className={`text-center lg:text-left ${isRTL ? 'lg:text-right' : ''}`}>
                <motion.h3 
                  className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Experience Legal Excellence
                </motion.h3>
                <motion.p 
                  className="text-white/90 text-lg lg:text-xl mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  With years of proven success and a commitment to excellence, we deliver unparalleled legal services throughout Saudi Arabia.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Button
                    size="lg"
                    className="bg-gold-accent hover:bg-accent-hover text-navy-primary font-semibold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Briefcase className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                    Get Started Today
                  </Button>
                </motion.div>
              </div>
              
              {/* Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {[
                  { number: '500+', label: 'Satisfied Clients', icon: Users },
                  { number: '98%', label: 'Success Rate', icon: Star },
                  { number: '24/7', label: 'Client Support', icon: CheckCircle }
                ].map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div 
                      key={stat.label}
                      className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="h-8 w-8 text-gold-accent mx-auto mb-3" />
                      <div className="text-3xl lg:text-4xl font-bold text-gold-accent mb-2">{stat.number}</div>
                      <div className="text-white/80 text-sm lg:text-base font-medium">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyUs;