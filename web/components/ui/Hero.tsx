'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { ReactNode } from 'react';

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
  const heightClasses = {
    small: 'min-h-[35vh]',
    medium: 'min-h-[50vh]',
    large: 'min-h-[70vh]',
    full: 'min-h-[100vh]'
  };

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <section className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}>
      {/* Background Image */}
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

      {/* Content */}
      <div className={`relative z-10 container flex flex-col ${alignClasses[align]} py-24`}>
        {/* White Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/nhero_white_logo.png"
            alt="Nhero Milano"
            width={220}
            height={48}
            className="w-[960px] h-auto"
            priority
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
}
