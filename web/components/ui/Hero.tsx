'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { TextAnimate } from '@/components/ui/text-animate';

interface HeroProps {
  title: string;
  subtitle?: string;
  image?: string | null;
  children?: ReactNode;
  height?: 'small' | 'medium' | 'large' | 'full';
  align?: 'left' | 'center' | 'right';
}

export default function Hero({
  title,
  subtitle,
  image,
  children,
  height = 'large',
  align = 'center'
}: HeroProps) {
  // Account for the 12px frame border on each side (24px total)
  const heightClasses = {
    small: 'min-h-[35vh]',
    medium: 'min-h-[50vh]',
    large: 'min-h-[70vh]',
    full: 'h-[calc(100vh-24px)]'
  };

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <section className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}>
      {/* Background Image - contained within hero section */}
      {image ? (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-nhero-charcoal" />
      )}

      {/* Green gradient overlay - fading from top */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(44, 49, 40, 0.85) 0%, rgba(44, 49, 40, 0.4) 40%, rgba(44, 49, 40, 0) 100%)'
        }}
      />

      {/* Content - centered */}
      <div className={`relative z-10 container flex flex-col ${alignClasses[align]} justify-center gap-6`}>
        {/* White Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          <Image
            src="/nhero_white_logo.png"
            alt="Nhero Milano"
            width={860}
            height={88}
            className="max-w-[280px] md:max-w-[350px] lg:max-w-[400px] h-auto"
            priority
            unoptimized
          />
        </motion.div>

        {/* Animated Text */}
        <TextAnimate
          animation="blurInUp"
          by="word"
          delay={0.5}
          className="text-white text-xl md:text-2xl lg:text-3xl font-light tracking-wider"
        >
          A TASTE OF GOOD TASTE
        </TextAnimate>
      </div>
    </section>
  );
}
