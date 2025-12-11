'use client';

import Image, { ImageProps } from 'next/image';
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
  // Handle different src types - extract file ID and build base URL
  let imageUrl: string | null = null;
  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  
  if (typeof src === 'string') {
    // src is already a file ID
    imageUrl = `${baseUrl}/assets/${src}`;
  } else if (src && typeof src === 'object' && 'id' in src) {
    // src is a DirectusFile object
    imageUrl = `${baseUrl}/assets/${src.id}`;
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
