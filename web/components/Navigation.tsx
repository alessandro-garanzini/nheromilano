'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { BlurFade } from './ui/BlurFade';

export default function Navigation() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '', label: t('home') },
    { href: '/esperienze', label: t('experiences') },
    { href: '/menu', label: t('menu') },
    { href: '/eventi', label: t('events') },
    { href: '/business', label: t('business') },
    { href: '/contatti', label: t('contacts') },
  ];

  const getLocalizedPath = (href: string) => {
    const locale = pathname.split('/')[1];
    return `/${locale}${href}`;
  };

  const isActive = (href: string) => {
    const localizedPath = getLocalizedPath(href);
    if (href === '') {
      return pathname === localizedPath;
    }
    return pathname.startsWith(localizedPath);
  };

  return (
    <BlurFade
      direction="down"
      duration={0.5}
      delay={0}
      offset={20}
      blur="4px"
    >
      <header className="sticky top-0 left-0 right-0 z-40 bg-nhero-green transition-all duration-500">
        <nav className="container py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href={getLocalizedPath('')} 
            className="transition-opacity duration-300 hover:opacity-80"
          >
            <Image
              src="/nhero_white_logo.png"
              alt="Nhero Milano"
              width={150}
              height={48}
              className="w-auto h-10"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item, index) => (
              <BlurFade
                key={item.href}
                delay={0.1 + index * 0.05}
                duration={0.4}
                direction="down"
                offset={10}
                blur="3px"
              >
                <Link
                  href={getLocalizedPath(item.href)}
                  className="relative text-sm font-semibold tracking-wide uppercase transition-colors duration-300 text-nhero-gold hover:text-white"
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-px bg-nhero-gold"
                      layoutId="nav-underline"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </Link>
              </BlurFade>
            ))}
            <BlurFade
              delay={0.1 + navItems.length * 0.05}
              duration={0.4}
              direction="down"
              offset={10}
              blur="3px"
            >
              <LanguageSwitcher isScrolled={false} />
            </BlurFade>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pt-6 pb-4 flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <BlurFade
                    key={item.href}
                    delay={index * 0.05}
                    duration={0.3}
                    direction="left"
                    offset={15}
                    blur="4px"
                  >
                    <Link
                      href={getLocalizedPath(item.href)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-lg font-semibold transition-colors duration-300 ${
                        isActive(item.href) ? 'text-nhero-gold' : 'text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </BlurFade>
                ))}
                <BlurFade
                  delay={navItems.length * 0.05}
                  duration={0.3}
                  direction="left"
                  offset={15}
                  blur="4px"
                >
                  <LanguageSwitcher isScrolled={false} />
                </BlurFade>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </nav>
      </header>
    </BlurFade>
  );
}
