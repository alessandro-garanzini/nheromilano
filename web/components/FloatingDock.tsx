'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Truck, MenuIcon, Calendar } from 'lucide-react';
import Link from 'next/link';

interface FloatingDockProps {
  reservationUrl?: string;
  deliveryUrl?: string;
  mapsUrl?: string;
  phone?: string;
}

export default function FloatingDock({ 
  reservationUrl, 
  deliveryUrl, 
  mapsUrl, 
  phone 
}: FloatingDockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const t = useTranslations('dock');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsOpen(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const actions = [
    { 
      icon: MapPin, 
      label: t('maps'), 
      href: mapsUrl || '#',
      external: true
    },
    { 
      icon: Phone, 
      label: t('call'), 
      href: phone ? `tel:${phone}` : '#',
      external: false
    },
    { 
      icon: Truck, 
      label: t('delivery'), 
      href: deliveryUrl || '#',
      external: true
    },
    { 
      icon: MenuIcon, 
      label: t('menu'), 
      href: '/menu',
      external: false
    },
    { 
      icon: Calendar, 
      label: t('book'), 
      href: reservationUrl || '#',
      external: true,
      highlight: true
    },
  ];

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 flex flex-col-reverse items-end gap-3"
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 50 
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: 'var(--frame-border)', marginRight: 'var(--frame-border)' }}
    >
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col-reverse items-end gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {actions.map((action, index) => {
              const ActionWrapper = action.external || action.href.startsWith('tel:') ? 'a' : Link;
              const linkProps = action.external 
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {};
              
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={{ 
                    delay: index * 0.04,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <ActionWrapper
                    href={action.href}
                    {...linkProps}
                    className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg transition-all duration-300 ${
                      action.highlight 
                        ? 'bg-nhero-gold text-white hover:bg-nhero-charcoal' 
                        : 'bg-white text-nhero-charcoal hover:bg-nhero-charcoal hover:text-white'
                    }`}
                  >
                    <action.icon size={18} strokeWidth={1.5} />
                    <span className="text-sm font-medium whitespace-nowrap">
                      {action.label}
                    </span>
                  </ActionWrapper>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-nhero-charcoal text-white' 
            : 'bg-nhero-gold text-white hover:bg-nhero-charcoal'
        }`}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle quick actions"
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </motion.svg>
      </motion.button>
    </motion.div>
  );
}
