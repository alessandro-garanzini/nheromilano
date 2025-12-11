'use client';

import Image, { ImageProps } from 'next/image';
import { getOptimizedImageUrl } from '@/lib/directus';
import type { DirectusFile } from '@/types/directus';

interface DirectusImageProps extends Omit<ImageProps, 'src'> {
  src: string | DirectusFile | null | undefined;
  width?: number;
  height?: number;
  quality?: number;
}

/**
 * Optimized Image component for Directus assets
 * Automatically handles image transformations and Next.js Image optimization
 */
export default function DirectusImage({
  src,
  width,
  height,
  quality = 75,
  alt,
  ...props
}: DirectusImageProps) {
  // Handle different src types
  let imageUrl: string | null = null;
  
  if (typeof src === 'string') {
    imageUrl = getOptimizedImageUrl(src, width);
  } else if (src && typeof src === 'object' && 'id' in src) {
    imageUrl = getOptimizedImageUrl(src.id, width);
  }

  // Fallback if no valid image URL
  if (!imageUrl) {
    return (
      <div 
        className="bg-nhero-cream flex items-center justify-center text-nhero-green/30"
        style={{ width: width || '100%', height: height || '100%' }}
      >
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      {...props}
    />
  );
}
