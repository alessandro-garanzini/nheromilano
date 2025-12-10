'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  background?: 'vanilla' | 'cream' | 'green' | 'charcoal' | 'transparent';
  padding?: 'small' | 'medium' | 'large';
}

export default function Section({ 
  children, 
  className = '', 
  id,
  delay = 0,
  background = 'transparent',
  padding = 'large'
}: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const bgClasses = {
    vanilla: 'bg-nhero-vanilla',
    cream: 'bg-nhero-cream',
    green: 'bg-nhero-green text-white',
    charcoal: 'bg-nhero-charcoal text-white',
    transparent: 'bg-transparent'
  };

  const paddingClasses = {
    small: 'py-12 md:py-16',
    medium: 'py-16 md:py-24',
    large: 'py-20 md:py-32'
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`${paddingClasses[padding]} ${bgClasses[background]} ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
