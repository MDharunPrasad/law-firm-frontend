import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { WhatsAppIcon } from './WhatsAppIcon';

export function FloatingActions() {
  const actions = [
    {
      icon: 'whatsapp' as const,
      label: 'WhatsApp',
      href: 'https://wa.me/966557536255',
      bg: 'bg-green-500 hover:bg-green-600',
      delay: 0
    },
    {
      icon: Phone,
      label: 'Call',
      href: 'tel:+966557536255',
      bg: 'bg-blue-700 hover:bg-blue-800',
      delay: 0.1
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:info@abf.sa',
      bg: 'bg-gold-accent hover:bg-gold-accent/90',
      delay: 0.2
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {actions.map((action, index) => {
        return (
          <motion.a
            key={action.label}
            href={action.href}
            target={action.href.startsWith('http') ? '_blank' : undefined}
            rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`${action.bg} text-white p-3 rounded-full shadow-lg transition-all duration-200 group relative`}
            whileHover={{ 
              scale: 1.1, 
              y: -3,
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: action.delay,
              duration: 0.5,
              type: 'spring',
              stiffness: 260,
              damping: 20
            }}
            aria-label={action.label}
          >
            {action.icon === 'whatsapp' ? (
              <WhatsAppIcon className="w-5 h-5" />
            ) : (
              React.createElement(action.icon, { size: 20 })
            )}
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-navy-primary text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {action.label}
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-l-4 border-l-navy-primary border-y-4 border-y-transparent"></div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}