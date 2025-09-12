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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-primary mb-6">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-neutral-muted max-w-3xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-accent mb-2">
                {stat.value}
              </div>
              <div className="text-neutral-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-neutral-bg hover:-translate-y-1">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-gold-accent mb-6" />
                  
                  {/* Rating */}
                  <div className="flex space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-gold-accent text-gold-accent" />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-neutral-muted leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Service Badge */}
                  <div className="mb-6">
                    <span className="px-3 py-1 bg-gold-accent/10 text-gold-accent text-sm rounded-full">
                      {testimonial.service}
                    </span>
                  </div>
                  
                  {/* Client Info */}
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <div className="font-semibold text-navy-primary">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-neutral-muted">
                        {testimonial.position}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Section */}
        <motion.div
          className="mt-20 bg-navy-primary rounded-3xl p-8 md:p-12 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-gold-accent text-gold-accent" />
              ))}
            </div>
            <span className="text-2xl font-bold">4.9/5</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {t('common.verifiedGoogleReviews')}
          </h3>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            {t('common.seeWhatClientsSaying')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-navy-primary hover:bg-gray-100 hover:text-navy-primary px-8"
            >
              {t('common.viewGoogleReviews')}
            </Button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-navy-primary backdrop-blur-sm px-8 font-semibold transition-all duration-300"
              >
                <PenTool className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                {t('testimonials.writeReview')}
              </Button>
            </motion.div>
          </div>
          <p className="text-gray-300 mt-4 text-sm">
            {t('common.learnMoreVerified')}
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-navy-primary mb-4">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-neutral-muted mb-8 max-w-2xl mx-auto">
            Experience the same level of professional service and expertise 
            that our clients have come to trust and recommend.
          </p>
          <Button 
            size="lg"
            className="bg-gold-accent hover:bg-gold-accent/90 text-white px-8"
          >
            Schedule Your Consultation Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;