import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.whyUs': 'Why Choose Us',
    'nav.team': 'Our Team',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'nav.language': 'العربية',
    
    // Hero Section
    'hero.title': 'Premier Legal Excellence in Saudi Arabia',
    'hero.subtitle': 'Ali Bin Fahad Law Firm & Intellectual Property LLC',
    'hero.description': 'Providing comprehensive legal solutions with unmatched expertise in corporate law, intellectual property, and regulatory compliance. Your trusted legal partner in the Kingdom of Saudi Arabia.',
    'hero.consultation': 'Schedule Consultation',
    'hero.services': 'Our Services',
    
    // About Section
    'about.title': 'Our Legal Excellence',
    'about.description': 'Ali Bin Fahad Law Firm & Intellectual Property LLC stands as a beacon of legal excellence in Saudi Arabia. With deep-rooted expertise and unwavering commitment to our clients, we provide comprehensive legal solutions that drive success and protect your interests.',
    'about.goal.title': 'Our Core Values',
    'about.goal.excellence.title': 'Legal Excellence',
    'about.goal.excellence.desc': 'Delivering exceptional legal services with precision, expertise, and unwavering attention to detail in every case we handle.',
    'about.goal.integrity.title': 'Professional Integrity',
    'about.goal.integrity.desc': 'Maintaining the highest ethical standards and building trust through transparent, honest, and reliable legal counsel.',
    'about.goal.innovation.title': 'Innovative Solutions',
    'about.goal.innovation.desc': 'Leveraging cutting-edge legal strategies and modern technology to provide efficient and effective solutions.',
    'about.goal.clientFocus.title': 'Client-Centered Approach',
    'about.goal.clientFocus.desc': 'Placing our clients at the heart of everything we do, ensuring personalized service and exceptional results.',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'To be the leading law firm in Saudi Arabia, recognized for our expertise, integrity, and commitment to delivering exceptional legal services that exceed client expectations.',
    'about.consultation.title': 'Ready to Get Started?',
    'about.consultation.desc': 'Schedule a consultation with our expert legal team today.',
    'about.consultation.button': 'Schedule Consultation',
    
    // Services
    'services.title': 'Our Legal Services',
    'services.subtitle': 'Comprehensive legal solutions tailored to meet your business and personal needs with the highest standards of professional excellence.',
    'services.cta.title': 'Need Legal Assistance?',
    'services.cta.desc': 'Our experienced legal team is ready to provide you with expert advice and representation. Contact us today for a confidential consultation.',
    'services.cta.consultation': 'Schedule Consultation',
    'services.cta.call': 'Call: +966 55 753 6255',
    
    // Why Us
    'whyus.title': 'Why Choose Ali Bin Fahad Law Firm',
    'whyus.subtitle': 'Discover what sets us apart as your trusted legal partner in Saudi Arabia',
    
    // Team
    'team.title': 'Our Expert Legal Team',
    'team.subtitle': 'Meet the experienced professionals dedicated to your success',
    'team.consultation': 'Schedule Consultation',
    
    // Testimonials
    'testimonials.title': 'Client Testimonials',
    'testimonials.subtitle': 'What our clients say about our legal services',
    'testimonials.writeReview': 'Write a Review',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our legal experts',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.office': 'Our Office',
    'contact.hours': 'Business Hours',
    'contact.phone.label': 'Phone',
    'contact.email.label': 'Email',
    
    // Footer
    'footer.description': 'Your trusted legal partner in Saudi Arabia, providing comprehensive legal solutions with excellence and integrity.',
    'footer.quickLinks': 'Quick Links',
    'footer.services.title': 'Legal Services',
    'footer.contact.title': 'Contact Info',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.contactUs': 'Contact Us',
    'common.readMore': 'Read More',
    'common.viewAll': 'View All',
    'common.getStarted': 'Get Started',
    'common.schedule': 'Schedule Consultation',
    'common.readyToWorkWithTeam': 'Ready to Work with Our Team?',
    'common.connectWithProfessionals': 'Connect with our experienced legal professionals who are committed to providing exceptional service and results.',
    'common.viewAllServices': 'View All Services',
    'common.experienceLegalExcellence': 'Experience Legal Excellence',
    'common.yearsOfSuccess': 'With years of proven success and a commitment to excellence, we deliver unparalleled legal services throughout Saudi Arabia.',
    'common.getStartedToday': 'Get Started Today',
    'common.readyToJoinSuccessStories': 'Ready to Join Our Success Stories?',
    'common.experienceSameLevel': 'Experience the same level of professional service and expertise that our clients have come to trust and recommend.',
    'common.scheduleConsultationToday': 'Schedule Your Consultation Today',
    'common.verifiedGoogleReviews': 'Verified Google Reviews',
    'common.seeWhatClientsSaying': 'See what our clients are saying about us on Google Reviews. Your satisfaction is our priority, and we\'re proud of the trust our clients place in our services.',
    'common.viewGoogleReviews': 'View Google Reviews',
    'common.learnMoreVerified': 'Learn more about our verified client testimonials and success stories',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.whyUs': 'لماذا نحن',
    'nav.team': 'فريقنا',
    'nav.testimonials': 'الشهادات',
    'nav.contact': 'اتصل بنا',
    'nav.language': 'English',
    
    // Hero Section
    'hero.title': 'التميز القانوني الرائد في المملكة العربية السعودية',
    'hero.subtitle': 'مكتب علي بن فهد للمحاماة والملكية الفكرية ش.م.م',
    'hero.description': 'نقدم حلولاً قانونية شاملة بخبرة لا مثيل لها في القانون التجاري والملكية الفكرية والامتثال التنظيمي. شريكك القانوني الموثوق في المملكة العربية السعودية.',
    'hero.consultation': 'حدد موعد استشارة',
    'hero.services': 'خدماتنا',
    
    // About Section
    'about.title': 'تميزنا القانوني',
    'about.description': 'يقف مكتب علي بن فهد للمحاماة والملكية الفكرية ش.م.م كمنارة للتميز القانوني في المملكة العربية السعودية. بخبرة راسخة والتزام لا يتزعزع بعملائنا، نقدم حلولاً قانونية شاملة تدفع النجاح وتحمي مصالحكم.',
    'about.goal.title': 'قيمنا الأساسية',
    'about.goal.excellence.title': 'التميز القانوني',
    'about.goal.excellence.desc': 'تقديم خدمات قانونية استثنائية بدقة وخبرة واهتمام لا يتزعزع بالتفاصيل في كل قضية نتعامل معها.',
    'about.goal.integrity.title': 'النزاهة المهنية',
    'about.goal.integrity.desc': 'الحفاظ على أعلى المعايير الأخلاقية وبناء الثقة من خلال المشورة القانونية الشفافة والصادقة والموثوقة.',
    'about.goal.innovation.title': 'الحلول المبتكرة',
    'about.goal.innovation.desc': 'الاستفادة من الاستراتيجيات القانونية المتطورة والتكنولوجيا الحديثة لتقديم حلول فعالة وكفؤة.',
    'about.goal.clientFocus.title': 'النهج المتمحور حول العميل',
    'about.goal.clientFocus.desc': 'وضع عملائنا في قلب كل ما نقوم به، مما يضمن خدمة شخصية ونتائج استثنائية.',
    'about.mission.title': 'مهمتنا',
    'about.mission.desc': 'أن نكون شركة المحاماة الرائدة في المملكة العربية السعودية، معترف بها لخبرتنا ونزاهتنا والتزامنا بتقديم خدمات قانونية استثنائية تفوق توقعات العملاء.',
    'about.consultation.title': 'مستعد للبدء؟',
    'about.consultation.desc': 'حدد موعد استشارة مع فريقنا القانوني الخبير اليوم.',
    'about.consultation.button': 'حدد موعد استشارة',
    
    // Services
    'services.title': 'خدماتنا القانونية',
    'services.subtitle': 'حلول قانونية شاملة مصممة لتلبية احتياجاتك التجارية والشخصية بأعلى معايير التميز المهني.',
    'services.cta.title': 'تحتاج مساعدة قانونية؟',
    'services.cta.desc': 'فريقنا القانوني ذو الخبرة مستعد لتزويدك بالمشورة والتمثيل الخبير. اتصل بنا اليوم للحصول على استشارة سرية.',
    'services.cta.consultation': 'حدد موعد استشارة',
    'services.cta.call': 'اتصل: +966 55 753 6255',
    
    // Why Us
    'whyus.title': 'لماذا تختار مكتب علي بن فهد للمحاماة',
    'whyus.subtitle': 'اكتشف ما يميزنا كشريكك القانوني الموثوق في المملكة العربية السعودية',
    
    // Team
    'team.title': 'فريقنا القانوني الخبير',
    'team.subtitle': 'تعرف على المهنيين ذوي الخبرة المكرسين لنجاحك',
    'team.consultation': 'حدد موعد استشارة',
    
    // Testimonials
    'testimonials.title': 'شهادات العملاء',
    'testimonials.subtitle': 'ما يقوله عملاؤنا عن خدماتنا القانونية',
    'testimonials.writeReview': 'اكتب مراجعة',
    
    // Contact
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل مع خبرائنا القانونيين',
    'contact.name': 'الاسم الكامل',
    'contact.email': 'عنوان البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال الرسالة',
    'contact.office': 'مكتبنا',
    'contact.hours': 'ساعات العمل',
    'contact.phone.label': 'الهاتف',
    'contact.email.label': 'البريد الإلكتروني',
    
    // Footer
    'footer.description': 'شريكك القانوني الموثوق في المملكة العربية السعودية، نقدم حلولاً قانونية شاملة بتميز ونزاهة.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.services.title': 'الخدمات القانونية',
    'footer.contact.title': 'معلومات الاتصال',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    
    // Common
    'common.learnMore': 'اعرف المزيد',
    'common.contactUs': 'اتصل بنا',
    'common.readMore': 'اقرأ المزيد',
    'common.viewAll': 'عرض الكل',
    'common.getStarted': 'ابدأ الآن',
    'common.schedule': 'حدد موعد استشارة',
    'common.readyToWorkWithTeam': 'مستعد للعمل مع فريقنا؟',
    'common.connectWithProfessionals': 'تواصل مع المهنيين ذوي الخبرة لدينا والملتزمين بتقديم خدمة وجتائج استثنائية.',
    'common.viewAllServices': 'عرض جميع الخدمات',
    'common.experienceLegalExcellence': 'اختبر التميز القانوني',
    'common.yearsOfSuccess': 'بسنوات من النجاح المثبت والالتزام بالتميز، نقدم خدمات قانونية لا مثيل لها في جميع أنحاء المملكة العربية السعودية.',
    'common.getStartedToday': 'ابدأ اليوم',
    'common.readyToJoinSuccessStories': 'مستعد للانضمام إلى قصص نجاحنا؟',
    'common.experienceSameLevel': 'اختبر نفس مستوى الخدمة المهنية والخبرة التي يثق بها عملاؤنا ويوصون بها.',
    'common.scheduleConsultationToday': 'حدد موعد استشارتك اليوم',
    'common.verifiedGoogleReviews': 'مراجعات جوجل المتحققة',
    'common.seeWhatClientsSaying': 'اطلع على ما يقوله عملاؤنا عنا في مراجعات جوجل. رضاكم أولوياتنا، ونحن فخورون بالثقة التي يضعها عملاؤنا في خدماتنا.',
    'common.viewGoogleReviews': 'عرض مراجعات جوجل',
    'common.learnMoreVerified': 'تعرف على المزيد حول شهادات عملائنا المتحققة وقصص النجاح',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check for saved language preference
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedLanguage = localStorage.getItem('preferred-language') as Language;
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
          setLanguage(savedLanguage);
        }
      }
    } catch (error) {
      console.warn('Failed to load language preference:', error);
    }
  }, []);

  useEffect(() => {
    try {
      // Save language preference
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('preferred-language', language);
      }
      
      // Update document direction and lang attribute
      if (typeof document !== 'undefined') {
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
      }
    } catch (error) {
      console.warn('Failed to save language preference or update document:', error);
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isRTL: language === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}