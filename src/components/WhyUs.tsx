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
          className={`text-center mb-16 lg:mb-20 ${isRTL ? 'text-right' : 'text-left'}`}
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
                whileHover={{ y: -8 }}
              >
                <div className={`relative h-full ${item.bgColor} rounded-2xl lg:rounded-3xl p-6 lg:p-8 transition-all duration-500 group-hover:shadow-2xl border border-gray-100 overflow-hidden`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-95 transition-opacity duration-500 rounded-2xl lg:rounded-3xl`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'} mb-6`}>
                      <div className="p-4 bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                        <IconComponent className={`h-8 w-8 lg:h-10 lg:w-10 text-gray-700 group-hover:text-white transition-colors duration-500`} />
                      </div>
                    </div>
                    
                    <h3 className={`text-xl lg:text-2xl font-bold text-navy-primary mb-4 leading-tight group-hover:text-white transition-colors duration-500 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {item.title}
                    </h3>
                    
                    <p className={`text-neutral-muted leading-relaxed group-hover:text-white/90 transition-colors duration-500 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {item.description}
                    </p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700" />
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