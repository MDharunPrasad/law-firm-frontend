import { motion } from 'motion/react';
import { Star, Quote, PenTool, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

function Testimonials() {
  const { t, isRTL } = useLanguage();
  
  const testimonials = [
    {
      name: 'Mohammed Al-Rashid',
      position: 'CEO, Tech Solutions KSA',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Ali Bin Fahad Law Firm provided exceptional service for our company formation. Their expertise in Saudi business law and prompt response made the entire process seamless. Highly recommend their professional services.',
      service: 'Company Formation'
    },
    {
      name: 'Sarah Al-Mansouri',
      position: 'Entrepreneur & Business Owner',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c96b2b15?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Outstanding legal representation in our intellectual property case. The team demonstrated deep knowledge of trademark law and achieved better results than we expected. Professional, responsive, and results-driven.',
      service: 'Trademark Services'
    },
    {
      name: 'Ahmed Bin Sultan',
      position: 'International Investor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The firm handled our complex commercial litigation with remarkable skill and attention to detail. Their strategic approach and thorough preparation resulted in a favorable outcome. Truly impressed with their professionalism.',
      service: 'Commercial Litigation'
    },
    {
      name: 'Fatima Al-Zahra',
      position: 'Family Business Owner',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Excellent support with our estate planning needs. The team provided clear guidance through complex family law matters with sensitivity and expertise. Their bilingual service was particularly valuable for our family.',
      service: 'Estate Planning'
    },
    {
      name: 'Khalid Al-Otaibi',
      position: 'Managing Director, Gulf Industries',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Ali Bin Fahad Law Firm has been our trusted legal partner for over 3 years. Their consistent quality of service, deep understanding of regulatory requirements, and proactive approach make them invaluable to our business.',
      service: 'Corporate Legal Services'
    },
    {
      name: 'Nora Al-Harbi',
      position: 'Startup Founder',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'From startup incorporation to ongoing legal compliance, this firm has supported our growth journey every step of the way. Their innovative approach to legal solutions and understanding of modern business needs is exceptional.',
      service: 'Startup Legal Support'
    }
  ];

  const stats = [
    { value: '500+', label: 'Satisfied Clients' },
    { value: '98%', label: 'Success Rate' },
    { value: '4.9/5', label: 'Average Rating' },
    { value: '15+', label: 'Years Experience' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.2 
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-primary mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            {t('testimonials.title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-neutral-muted max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            {t('testimonials.subtitle')}
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center group"
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.8 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.6, 
                    ease: [0.16, 1, 0.3, 1] 
                  }
                }
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="text-3xl md:text-4xl font-bold text-gold-accent mb-2 relative"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 + 0.3,
                  type: "spring",
                  bounce: 0.4
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  textShadow: "0 0 20px rgba(200, 134, 13, 0.5)"
                }}
              >
                {stat.value}
                <motion.div
                  className="absolute inset-0 bg-gold-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.div 
                className="text-neutral-muted"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                viewport={{ once: true }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: 10 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  rotateX: 0,
                  transition: { 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1] 
                  }
                }
              }}
              whileHover={{ 
                scale: 1.02,
                y: -8,
                rotateY: 2,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="perspective-1000"
            >
              <motion.div
                className="h-full transition-all duration-500 border-0 bg-neutral-bg rounded-2xl overflow-hidden group relative"
                style={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                }}
                whileHover={{
                  boxShadow: "0 20px 40px rgba(0,0,0,0.12)"
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gold-accent/5 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div className="p-8 relative z-10">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      bounce: 0.4
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      color: "#C8860D"
                    }}
                  >
                    <Quote className="h-8 w-8 text-gold-accent mb-6" />
                  </motion.div>
                  
                  {/* Rating */}
                  <motion.div 
                    className="flex space-x-1 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.1 + 0.4 + i * 0.05,
                          type: "spring"
                        }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 10
                        }}
                      >
                        <Star className="h-5 w-5 fill-gold-accent text-gold-accent" />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Testimonial Text */}
                  <motion.p 
                    className="text-neutral-muted leading-relaxed mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    "{testimonial.text}"
                  </motion.p>
                  
                  {/* Service Badge */}
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="px-3 py-1 bg-gold-accent/10 text-gold-accent text-sm rounded-full inline-block"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(200, 134, 13, 0.2)"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {testimonial.service}
                    </motion.span>
                  </motion.div>
                  
                  {/* Client Info */}
                  <motion.div 
                    className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                    </motion.div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <motion.div 
                        className="font-semibold text-navy-primary"
                        whileHover={{ color: "#C8860D" }}
                        transition={{ duration: 0.2 }}
                      >
                        {testimonial.name}
                      </motion.div>
                      <motion.div 
                        className="text-sm text-neutral-muted"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.8 }}
                        viewport={{ once: true }}
                      >
                        {testimonial.position}
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Google Reviews Section */}
        <motion.div
          className="mt-20 bg-navy-primary rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 30px 60px rgba(0,0,0,0.2)"
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-gold-accent/10 to-transparent opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div 
            className="flex items-center justify-center space-x-4 mb-6 relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex space-x-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { scale: 0, rotate: -180 },
                    visible: { 
                      scale: 1, 
                      rotate: 0,
                      transition: { 
                        duration: 0.4,
                        type: "spring",
                        bounce: 0.6
                      }
                    }
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 15,
                    filter: "drop-shadow(0 0 10px rgba(200, 134, 13, 0.8))"
                  }}
                >
                  <Star className="h-6 w-6 fill-gold-accent text-gold-accent" />
                </motion.div>
              ))}
            </motion.div>
            <motion.span 
              className="text-2xl font-bold"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.1,
                color: "#C8860D"
              }}
            >
              4.9/5
            </motion.span>
          </motion.div>
          
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            {t('common.verifiedGoogleReviews')}
          </motion.h3>
          <motion.p 
            className="text-gray-200 mb-8 max-w-2xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t('common.seeWhatClientsSaying')}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="lg"
                className="bg-white text-navy-primary hover:bg-gray-100 hover:text-navy-primary px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t('common.viewGoogleReviews')}
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-black hover:bg-white hover:text-navy-primary backdrop-blur-sm px-8 font-semibold transition-all duration-300"
              >
                <PenTool className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                {t('testimonials.writeReview')}
              </Button>
            </motion.div>
          </motion.div>
          <motion.p 
            className="text-gray-300 mt-4 text-sm relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            viewport={{ once: true }}
          >
            {t('common.learnMoreVerified')}
          </motion.p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-navy-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.02,
              color: "#C8860D"
            }}
          >
            Ready to Join Our Success Stories?
          </motion.h3>
          <motion.p 
            className="text-neutral-muted mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Experience the same level of professional service and expertise 
            that our clients have come to trust and recommend.
          </motion.p>
          <motion.div
            whileHover={{ 
              scale: 1.05, 
              y: -3,
              boxShadow: "0 20px 40px rgba(200, 134, 13, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg"
              className="bg-gold-accent hover:bg-gold-accent/90 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Schedule Your Consultation Today
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;