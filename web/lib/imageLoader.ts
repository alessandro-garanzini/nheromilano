/**
 * Custom image loader for Next.js Image component
 * Bypasses Next.js image optimization and serves images directly from Directus
 * This allows images to be served with proper authentication
 */
export default function directusImageLoader({
  src,
  width,
  quality
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // For local images (from /public folder), return as-is
  if (src.startsWith('/')) {
    return src;
  }

  // If the src already has query parameters (from getOptimizedImageUrl),
  // return it as-is since Directus handles the optimization
  if (src.includes('?')) {
    return src;
  }

  // Otherwise, add width and quality parameters for Directus images
  const params = new URLSearchParams();
  params.set('width', width.toString());
  params.set('quality', (quality || 75).toString());
  params.set('format', 'auto');

  return `${src}?${params.toString()}`;
}
