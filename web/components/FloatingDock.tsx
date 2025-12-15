'use client';

import { motion } from 'framer-motion';
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
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const t = useTranslations('dock');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Listen for mobile menu toggle event
  useEffect(() => {
    const handleMobileMenuToggle = (event: CustomEvent<{ isOpen: boolean }>) => {
      setIsMobileMenuOpen(event.detail.isOpen);
    };

    window.addEventListener('mobileMenuToggle', handleMobileMenuToggle as EventListener);
    return () => window.removeEventListener('mobileMenuToggle', handleMobileMenuToggle as EventListener);
  }, []);

  const actions = [
    { 
      icon: Calendar, 
      label: t('book'), 
      href: reservationUrl || '#',
      external: true
    },
    { 
      icon: MenuIcon, 
      label: t('menu'), 
      href: '/menu',
      external: false
    },
    { 
      icon: Phone, 
      label: t('call'), 
      href: phone ? `tel:${phone}` : '#',
      external: false
    },
    { 
      icon: MapPin, 
      label: t('maps'), 
      href: mapsUrl || '#',
      external: true
    },
    { 
      icon: Truck, 
      label: t('delivery'), 
      href: deliveryUrl || '#',
      external: true
    },
  ];

  // Hide dock when mobile menu is open or when scrolling down
  const shouldShow = isVisible && !isMobileMenuOpen;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 bg-nhero-cream"
      initial={{ y: 100 }}
      animate={{ y: shouldShow ? 0 : 100 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-center gap-0 px-[var(--frame-border)] h-16">
        {actions.map((action, index) => {
          const ActionWrapper = action.external || action.href.startsWith('tel:') ? 'a' : Link;
          const linkProps = action.external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {};

          // Reduce padding on first and last items to prevent cutoff
          const isFirst = index === 0;
          const isLast = index === actions.length - 1;
          const horizontalPadding = isFirst || isLast ? 'px-3' : 'px-6';

          return (
            <motion.div
              key={action.label}
              className="flex-1"
              whileHover="hover"
              whileTap="hover"
              initial="initial"
            >
              <ActionWrapper
                href={action.href}
                {...linkProps}
                className={`flex flex-col items-center justify-center gap-0.5 ${horizontalPadding} h-full group flex-1`}
                style={{ color: 'var(--nhero-green)' }}
              >
                <motion.div
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.8 }
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <action.icon size={18} strokeWidth={2} />
                </motion.div>
                <motion.span
                  className="text-[9px] font-semibold uppercase tracking-wider"
                  variants={{
                    initial: { opacity: 1, y: 0 },
                    hover: { opacity: 0, y: 5 }
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {action.label}
                </motion.span>
              </ActionWrapper>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
