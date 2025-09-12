import { motion } from "motion/react";
import { Mail, Phone, Linkedin, Award, GraduationCap, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";

interface TeamProps {
  onContactClick?: () => void;
}

function Team({ onContactClick }: TeamProps = {}) {
  const { t, isRTL } = useLanguage();
  
  const teamMembers = [
    {
      name: "Ali Bin Fahad",
      position: "Managing Partner & Founder",
      image:
        "https://images.unsplash.com/photo-1756412066323-a336d2becc10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0JTIwYXJhYiUyMHNhdWRpfGVufDF8fHx8MTc1NzQ5MTk2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "A distinguished legal practitioner with over 15 years of experience in Saudi Arabian law, specializing in corporate law, intellectual property, and commercial litigation.",
      specialties: [
        "Corporate Law",
        "Intellectual Property",
        "Commercial Litigation",
        "Mergers & Acquisitions",
      ],
      education:
        "LL.B. King Saud University, Master of Laws (LL.M.) Harvard Law School",
      certifications: [
        "Saudi Bar Association",
        "Ministry of Justice",
        "SAIP Registered Agent",
      ],
    },
    {
      name: "Dr. Sarah Al-Rashid",
      position: "Senior Partner - IP Law",
      image:
        "https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwbGF3eWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU3NDkxOTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Leading expert in intellectual property law with extensive experience in trademark registration, patent protection, and IP litigation across the GCC region.",
      specialties: [
        "Trademark Law",
        "Patent Protection",
        "Copyright Law",
        "IP Litigation",
      ],
      education:
        "LL.B. King Abdulaziz University, Ph.D. in IP Law, University of Oxford",
      certifications: [
        "SAIP Certified",
        "WIPO Arbitrator",
        "IP Specialist License",
      ],
    },
    {
      name: "Ahmed Al-Mansouri",
      position: "Senior Associate - Corporate Law",
      image:
        "https://images.unsplash.com/photo-1614468500745-9bc401dbf0ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtaWRkbGUlMjBlYXN0ZXJuJTIwYnVzaW5lc3NtYW4lMjBzdWl0fGVufDF8fHx8MTc1NzQ5MTk3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Specializes in corporate formations, regulatory compliance, and business restructuring with a focus on helping international companies establish operations in Saudi Arabia.",
      specialties: [
        "Corporate Formation",
        "Regulatory Compliance",
        "Foreign Investment",
        "Contract Law",
      ],
      education:
        "LL.B. Prince Sultan University, LL.M. Commercial Law, London School of Economics",
      certifications: [
        "Licensed Attorney",
        "Certified Corporate Counselor",
        "SAMA Compliance Expert",
      ],
    },
    {
      name: "Fatima Al-Zahra",
      position: "Partner - Family & Estate Law",
      image:
        "https://images.unsplash.com/photo-1659353218851-abe20addb330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGF0dG9ybmV5JTIwaGVhZHNob3R8ZW58MXx8fHwxNzU3NDkxOTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Dedicated to family law matters, estate planning, and succession law with a compassionate approach to sensitive legal issues affecting families.",
      specialties: [
        "Family Law",
        "Estate Planning",
        "Succession Law",
        "Mediation",
      ],
      education:
        "LL.B. Imam Muhammad Ibn Saud University, Certified Family Law Mediator",
      certifications: [
        "Family Law Specialist",
        "Certified Mediator",
        "Estate Planning Expert",
      ],
    },
  ];

  return (
    <section className="py-20 bg-neutral-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className={`text-center mb-12 lg:mb-16 ${isRTL ? 'text-right' : 'text-left'}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-primary mb-6">
            {t('team.title')}
          </h2>
          <p className="text-xl text-neutral-muted max-w-3xl mx-auto leading-relaxed">
            {t('team.subtitle')}
          </p>
        </motion.div>

        {/* Team Grid - Optimized for smaller, more balanced layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="group bg-surface-elevated rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform-gpu"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="flex flex-col">
                {/* Compact Square Image Container */}
                <div className="relative w-full aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={`${member.name} - ${member.position}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-primary/70 via-transparent to-transparent group-hover:from-navy-primary/50 transition-all duration-500"></div>
                  
                  {/* Compact Name Tag */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className={`text-lg font-bold text-navy-primary leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
                        {member.name}
                      </h3>
                      <p className={`text-gold-accent font-medium text-sm leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
                        {member.position}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Compact Content */}
                <div className="p-4 flex flex-col">
                  {/* Brief Bio */}
                  <div className="mb-4">
                    <p className={`text-neutral-muted leading-relaxed text-sm line-clamp-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {member.bio}
                    </p>
                  </div>

                  {/* Key Specialties - Limited to 2 */}
                  <div className="mb-4">
                    <div className={`flex flex-wrap gap-1.5 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                      {member.specialties.slice(0, 2).map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gold-accent/10 text-gold-accent text-xs rounded-md font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                      {member.specialties.length > 2 && (
                        <span className="px-2 py-1 bg-neutral-bg text-neutral-muted text-xs rounded-md">
                          +{member.specialties.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Primary Certification */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs text-neutral-muted font-medium">
                        {member.certifications[0]}
                      </span>
                    </div>
                  </div>

                  {/* Compact Contact */}
                  <div className={`flex justify-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} pt-3 border-t border-neutral-bg/50`}>
                    <motion.div 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 h-8 w-8 bg-gold-accent/10 text-gold-accent hover:bg-gold-accent hover:text-white rounded-lg transition-all duration-300"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail size={14} />
                      </Button>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 h-8 w-8 bg-blue-supportive/10 text-blue-supportive hover:bg-blue-supportive hover:text-white rounded-lg transition-all duration-300"
                        aria-label={`Call ${member.name}`}
                      >
                        <Phone size={14} />
                      </Button>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 h-8 w-8 bg-navy-primary/10 text-navy-primary hover:bg-navy-primary hover:text-white rounded-lg transition-all duration-300"
                        aria-label={`${member.name} LinkedIn profile`}
                      >
                        <Linkedin size={14} />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-navy-primary to-blue-supportive rounded-2xl p-8 lg:p-12 shadow-2xl text-white">
            <h3 className={`text-2xl lg:text-3xl font-bold mb-4 text-center`}>
              {t('common.readyToWorkWithTeam')}
            </h3>
            <p className={`text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed text-center`}>
              {t('common.connectWithProfessionals')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={onContactClick}
                  size="lg"
                  className="bg-gold-accent hover:bg-accent-hover text-navy-primary font-semibold px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t('team.consultation')}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-navy-primary backdrop-blur-sm px-8 font-semibold transition-all duration-300"
                >
                  {t('common.viewAllServices')}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Team;