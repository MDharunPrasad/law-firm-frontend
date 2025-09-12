import { motion } from 'motion/react';
import { 
  Building2, 
  Scale, 
  FileText, 
  Users, 
  Banknote, 
  Briefcase,
  Globe,
  Copyright,
  Store,
  ArrowRight,
  Phone,
  MessageCircle,
  Calendar
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';

interface ServicesProps {
  onServiceClick: (service: string) => void;
  showHeader?: boolean;
}

function Services({ onServiceClick, showHeader = false }: ServicesProps) {
  const { t, isRTL } = useLanguage();
  
  const services = [
    {
      icon: Building2,
      title: 'Company Formation',
      description: 'Complete business setup and registration services in Saudi Arabia',
      features: ['License Registration', 'Corporate Structure', 'Compliance Setup']
    },
    {
      icon: Scale,
      title: 'Litigation & Representation',
      description: 'Expert legal representation in courts and dispute resolution',
      features: ['Court Representation', 'Legal Disputes', 'Arbitration']
    },
    {
      icon: Banknote,
      title: 'Bankruptcy & Debt Restructuring',
      description: 'Professional guidance through financial restructuring processes',
      features: ['Debt Restructuring', 'Bankruptcy Filing', 'Creditor Negotiation']
    },
    {
      icon: Users,
      title: 'Estate Liquidation',
      description: 'Comprehensive estate planning and liquidation services',
      features: ['Asset Distribution', 'Will Preparation', 'Estate Planning']
    },
    {
      icon: FileText,
      title: 'Drafting & Notarization',
      description: 'Professional document drafting and legal notarization',
      features: ['Contract Drafting', 'Legal Documents', 'Notary Services']
    },
    {
      icon: Briefcase,
      title: 'Debt Collection',
      description: 'Efficient debt recovery and collection services',
      features: ['Payment Recovery', 'Legal Action', 'Negotiation']
    },
    {
      icon: Globe,
      title: 'Legal Translation',
      description: 'Certified translation of legal documents',
      features: ['Document Translation', 'Certified Translation', 'Legal Interpretation']
    },
    {
      icon: Copyright,
      title: 'Trademark Services',
      description: 'Intellectual property protection and trademark registration',
      features: ['Trademark Registration', 'IP Protection', 'Brand Defense']
    },
    {
      icon: Store,
      title: 'E-Store & Compliance',
      description: 'E-commerce legal compliance and online business setup',
      features: ['E-commerce Setup', 'Digital Compliance', 'Online Licensing']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-bg to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - only show when specified */}
        {showHeader && (
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-primary mb-6">
              Our Legal Services
            </h2>
            <p className="text-xl text-neutral-muted max-w-3xl mx-auto leading-relaxed">
              Comprehensive legal solutions tailored to meet your business and personal needs 
              with the highest standards of professional excellence.
            </p>
          </motion.div>
        )}

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0.8, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border border-neutral-muted/10 bg-white shadow-md hover:-translate-y-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gold-accent/10 rounded-xl group-hover:bg-gold-accent/20 transition-colors">
                        <Icon className="h-6 w-6 text-gold-accent" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-navy-primary group-hover:text-gold-accent transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-neutral-muted">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-neutral-muted">
                          <div className="w-1.5 h-1.5 bg-gold-accent rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="ghost"
                      onClick={() => onServiceClick(service.title.toLowerCase().replace(/\s+/g, '-'))}
                      className="w-full text-black hover:text-black hover:bg-gold-accent/5 group/btn"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Professional CTA Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-gradient-to-br from-navy-primary via-blue-supportive to-navy-deep rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden shadow-2xl">
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
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {t('services.cta.title')}
                  </motion.h3>
                  <motion.p 
                    className="text-white/90 text-lg mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {t('services.cta.desc')}
                  </motion.p>
                  
                  {/* Action Buttons */}
                  <motion.div 
                    className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse lg:justify-start' : 'lg:justify-start'} justify-center`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Button
                      size="lg"
                      className="bg-gold-accent hover:bg-accent-hover text-navy-primary font-semibold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      onClick={() => onServiceClick('contact')}
                    >
                      <Calendar className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                      {t('services.cta.consultation')}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg" 
                      className="border-2 border-white text-white hover:bg-white hover:text-navy-primary backdrop-blur-sm px-8 py-4 font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <Phone className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                      <span className="text-white group-hover:text-navy-primary">{t('services.cta.call')}</span>
                    </Button>
                  </motion.div>
                </div>
                
                {/* Professional Visual Element */}
                <motion.div 
                  className="hidden lg:block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    {/* Certification Cards */}
                    <div className="grid gap-4">
                      <motion.div 
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gold-accent rounded-lg flex items-center justify-center">
                            <Scale className="h-6 w-6 text-navy-primary" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">Saudi Bar Association</h4>
                            <p className="text-white/70 text-sm">Licensed & Certified</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gold-accent rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-navy-primary" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">Ministry of Justice</h4>
                            <p className="text-white/70 text-sm">Authorized Practice</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gold-accent rounded-lg flex items-center justify-center">
                            <Copyright className="h-6 w-6 text-navy-primary" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">SAIP Registered</h4>
                            <p className="text-white/70 text-sm">Intellectual Property</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;