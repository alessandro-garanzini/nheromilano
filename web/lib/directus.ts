import { createDirectus, rest, staticToken, readSingleton, readItems, readItem } from '@directus/sdk';
import type { DirectusSchema } from '@/types/directus';

/**
 * Directus Client Configuration
 * Initialized with REST API support and static token authentication
 */
const directus = createDirectus<DirectusSchema>(process.env.NEXT_PUBLIC_DIRECTUS_URL!)
  .with(staticToken(process.env.DIRECTUS_TOKEN!))
  .with(rest());

export default directus;

/**
 * Helper function to get the full URL for a Directus file
 * @param fileId - The file ID from Directus
 * @param options - Transformation options (width, height, quality, format)
 */
export function getDirectusFileUrl(
  fileId: string | undefined | null,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png' | 'auto';
    fit?: 'cover' | 'contain' | 'inside' | 'outside';
  }
): string | null {
  if (!fileId) return null;

  const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const params = new URLSearchParams();

  if (options?.width) params.append('width', options.width.toString());
  if (options?.height) params.append('height', options.height.toString());
  if (options?.quality) params.append('quality', options.quality.toString());
  if (options?.format) params.append('format', options.format);
  if (options?.fit) params.append('fit', options.fit);

  const queryString = params.toString();
  return `${baseUrl}/assets/${fileId}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Helper to get Directus asset URL for Next.js Image component
 * Optimized defaults: webp format, quality 75
 */
export function getOptimizedImageUrl(
  fileId: string | undefined | null,
  width?: number
): string | null {
  return getDirectusFileUrl(fileId, {
    width,
    quality: 75,
    format: 'auto',
    fit: 'cover'
  });
}

/**
 * Data fetching helpers with proper type safety
 */

export async function getGlobals() {
  try {
    return await directus.request(
      readSingleton('globals', {
        fields: ['*']
      })
    );
  } catch (error) {
    console.error('Error fetching globals:', error);
    return null;
  }
}

export async function getExperiences() {
  try {
    return await directus.request(
      readItems('experiences', {
        filter: { status: { _eq: 'published' } },
        sort: ['sort'],
        fields: ['*', 'hero_image.*', 'gallery.*']
      })
    );
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}

export async function getExperienceBySlug(slug: string) {
  try {
    const experiences = await directus.request(
      readItems('experiences', {
        filter: { 
          slug: { _eq: slug },
          status: { _eq: 'published' }
        },
        limit: 1,
        fields: ['*', 'hero_image.*', 'gallery.*', 'menu_categories.id', 'menu_categories.name', 'menu_categories.slug']
      })
    );
    return experiences[0] || null;
  } catch (error) {
    console.error('Error fetching experience:', error);
    return null;
  }
}

export async function getMenuItems(categoryId?: string) {
  try {
    const filter: any = { status: { _eq: 'published' } };
    if (categoryId) {
      filter.category = { _eq: categoryId };
    }
    
    return await directus.request(
      readItems('menu_items', {
        filter,
        sort: ['sort', 'name'],
        fields: ['*', 'image.*', 'category.name', 'category.slug']
      })
    );
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
}

export async function getMenuCategories(experienceId?: string) {
  try {
    const filter: any = { status: { _eq: 'published' } };
    if (experienceId) {
      filter.experience = { _eq: experienceId };
    }
    
    return await directus.request(
      readItems('menu_categories', {
        filter,
        sort: ['sort', 'name'],
        fields: ['*', 'experience.title', 'experience.slug']
      })
    );
  } catch (error) {
    console.error('Error fetching menu categories:', error);
    return [];
  }
}

export async function getEvents(includePast = false) {
  try {
    const filter: any = { status: { _eq: 'published' } };
    if (!includePast) {
      filter.is_past = { _neq: true };
    }
    
    return await directus.request(
      readItems('events', {
        filter,
        sort: ['-date_event'],
        fields: ['*', 'cover_image.*', 'gallery.*']
      })
    );
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getEventBySlug(slug: string) {
  try {
    const events = await directus.request(
      readItems('events', {
        filter: { 
          slug: { _eq: slug },
          status: { _eq: 'published' }
        },
        limit: 1,
        fields: ['*', 'cover_image.*', 'gallery.*']
      })
    );
    return events[0] || null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

export async function getBusinessServices() {
  try {
    return await directus.request(
      readItems('business_services', {
        filter: { status: { _eq: 'published' } },
        sort: ['sort'],
        fields: ['*', 'image.*']
      })
    );
  } catch (error) {
    console.error('Error fetching business services:', error);
    return [];
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const pages = await directus.request(
      readItems('pages', {
        filter: { 
          slug: { _eq: slug },
          status: { _eq: 'published' }
        },
        limit: 1,
        fields: ['*', 'hero_image.*']
      })
    );
    return pages[0] || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export async function getActiveAvvisi() {
  try {
    return await directus.request(
      readItems('avvisi', {
        filter: { status: { _eq: 'published' } },
        sort: ['sort'],
        fields: ['*', 'foto.*']
      })
    );
  } catch (error) {
    console.error('Error fetching avvisi:', error);
    return [];
  }
}

export async function getFAQs(category?: string) {
  try {
    const filter: any = { status: { _eq: 'published' } };
    if (category) {
      filter.category = { _eq: category };
    }
    
    return await directus.request(
      readItems('faqs', {
        filter,
        sort: ['sort'],
        fields: ['*']
      })
    );
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}
