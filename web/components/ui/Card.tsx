'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  description?: string;
  image?: string | null;
  href?: string;
  children?: ReactNode;
  variant?: 'default' | 'hover' | 'overlay';
  className?: string;
  imageHeight?: string;
}

export default function Card({
  title,
  description,
  image,
  href,
  children,
  variant = 'default',
  className = '',
  imageHeight = 'aspect-[4/3]'
}: CardProps) {
  const content = (
    <motion.article
      className={`group bg-white overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {image && (
        <div className={`relative ${imageHeight} overflow-hidden`}>
          <Image
            src={image}
            alt={title || ''}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {variant === 'overlay' && title && (
            <div className="absolute inset-0 image-overlay flex items-end p-6">
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-white">{title}</h3>
                {description && (
                  <p className="text-white/70 mt-2 text-sm">{description}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {variant !== 'overlay' && (title || description || children) && (
        <div className="p-6">
          {title && (
            <h3 className="text-lg font-medium text-nhero-charcoal mb-2 group-hover:text-nhero-gold transition-colors duration-300">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-muted text-sm leading-relaxed mb-4">{description}</p>
          )}
          {children}
        </div>
      )}
    </motion.article>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }

  return content;
}
