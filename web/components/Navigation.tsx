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

  // Prevent body scroll when mobile menu is open and notify other components
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Dispatch custom event for other components (like FloatingDock)
    window.dispatchEvent(new CustomEvent('mobileMenuToggle', { detail: { isOpen: isMobileMenuOpen } }));

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
    <>
    <header className="fixed top-3 left-3 right-3 z-40">
      <BlurFade
        direction="down"
        duration={0.5}
        delay={0}
        offset={20}
        blur="4px"
      >
        <div className="bg-nhero-green transition-all duration-500">
        <nav className="container py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href={getLocalizedPath('')} 
            className="transition-opacity duration-300 hover:opacity-80"
          >
            <Image
              src="/nhero_white_logo.png"
              alt="Nhero Milano"
              width={160}
              height={48}
              className="h-10"
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
                  className="relative text-sm font-semibold tracking-wide uppercase transition-colors duration-300 text-nhero-cream hover:text-white"
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-px bg-nhero-cream"
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
              <LanguageSwitcher />
            </BlurFade>
          </div>

          {/* Mobile Menu Button - placeholder for layout */}
          <div className="lg:hidden w-12 h-12" />
        </div>
        </nav>
        </div>
      </BlurFade>
    </header>

      {/* Mobile Menu Button - Fixed position to stay on top of fullscreen menu */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-8 right-8 w-16 h-12 flex items-center justify-center text-nhero-cream z-60"
        aria-label="Toggle menu"
        style={{ right: '2.5rem' }}
      >
        <div className="relative w-6 h-5 flex flex-col justify-center items-center">
          <motion.span
            className="absolute w-6 h-[2px] bg-current rounded-full"
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 0 : -6,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="absolute w-6 h-[2px] bg-current rounded-full"
            animate={{
              opacity: isMobileMenuOpen ? 0 : 1,
              scaleX: isMobileMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="absolute w-6 h-[2px] bg-current rounded-full"
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? 0 : 6,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </button>

      {/* Fullscreen Mobile Navigation - Outside header for proper z-index */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 w-screen h-screen bg-nhero-green z-50 flex flex-col items-center justify-center overflow-hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 2rem) 1.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2rem) 1.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2rem) 1.5rem)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Centered navigation */}
            <nav className="flex flex-col items-center justify-center gap-6">
              {navItems.map((item, index) => (
                <BlurFade
                  key={item.href}
                  delay={0.15 + index * 0.08}
                  duration={0.4}
                  direction="up"
                  offset={30}
                  blur="4px"
                >
                  <Link
                    href={getLocalizedPath(item.href)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-3xl font-semibold uppercase tracking-wider transition-colors duration-300 ${
                      isActive(item.href) ? 'text-nhero-gold' : 'text-nhero-cream hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </BlurFade>
              ))}
              <BlurFade
                delay={0.15 + navItems.length * 0.08}
                duration={0.4}
                direction="up"
                offset={30}
                blur="4px"
              >
                <div className="mt-4">
                  <LanguageSwitcher />
                </div>
              </BlurFade>
            </nav>

            {/* Logo centered below nav items */}
            <BlurFade
              delay={0.15 + (navItems.length + 1) * 0.08}
              duration={0.4}
              direction="up"
              offset={30}
              blur="4px"
            >
              <Image
                src="/nhero_white_logo.png"
                alt="Nhero Milano"
                width={280}
                height={42}
                className="h-9 mt-10 "
              />
            </BlurFade>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
