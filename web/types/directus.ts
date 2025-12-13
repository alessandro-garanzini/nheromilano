/**
 * Directus Collection Types
 * Auto-generated from schema inspection
 */

export interface DirectusFile {
  id: string;
  title?: string;
  description?: string;
  filename_disk: string;
  filename_download: string;
  type: string;
  width?: number;
  height?: number;
  filesize: number;
  uploaded_on: string;
}

export interface Globals {
  id: string;
  site_name?: string;
  tagline?: string;
  address?: string;
  phone?: string;
  email?: string;
  google_maps_url?: string;
  opening_hours?: OpeningHour[];
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  linkedin?: string;
  reservation_url?: string;
  delivery_url?: string;
}

export interface OpeningHour {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  hours: string;
}

export interface Experience {
  id: string;
  status: 'published' | 'draft' | 'archived';
  sort?: number;
  date_created: string;
  date_updated: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  color?: string;
  hero_image?: string | DirectusFile;
  seo_title?: string;
  seo_description?: string;
  gallery?: string[] | DirectusFile[] | null;
  menu_categories?: MenuCategory[] | null;
}

export interface MenuCategory {
  id: string;
  status: 'published' | 'draft' | 'archived';
  sort?: number;
  name: string;
  slug?: string;
  description?: string;
  experience?: string | Experience;
  items?: MenuItem[] | null;
  items_count?: number;
}

export interface MenuItem {
  id: string;
  status: 'published' | 'draft' | 'archived';
  sort?: number;
  name: string;
  description?: string;
  price?: number;
  category: string | MenuCategory;
  image?: string | DirectusFile;
  is_vegetarian?: boolean;
  is_vegan?: boolean;
  is_gluten_free?: boolean;
  allergens?: string[];
  is_featured?: boolean;
}

export interface Event {
  id: string;
  status: 'published' | 'draft' | 'archived';
  sort?: number;
  date_created: string;
  title: string;
  slug?: string;
  date_event: string;
  time_start?: string;
  time_end?: string;
  description?: string;
  cover_image?: string | DirectusFile;
  is_past?: boolean;
  external_link?: string;
  gallery?: string[] | DirectusFile[] | null;
}

export interface BusinessService {
  id: string;
  status: 'published' | 'draft' | 'archived';
  sort?: number;
  title: string;
  description?: string;
  icon?: string;
  image?: string | DirectusFile;
}

export interface Page {
  id: string;
  status: 'published' | 'draft' | 'archived';
  sort?: number;
  date_updated: string;
  slug: string;
  title: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: string | DirectusFile;
  content?: string;
  seo_title?: string;
  seo_description?: string;
}

export interface FAQ {
  id: string;
  status: 'published' | 'draft' | 'archived';
  sort?: number;
  question: string;
  answer: string;
  category?: 'general' | 'reservations' | 'menu' | 'events' | 'business';
}

export interface Avviso {
  id: string;
  status: 'published' | 'draft' | 'archived';
  sort?: number;
  titolo: string;
  descrizione: string;
  foto?: string | DirectusFile;
  cta_label?: string;
  cta_url?: string;
  user_created?: string;
  date_created?: string;
  user_updated?: string;
  date_updated?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date_created?: string;
  status?: 'new' | 'read' | 'replied';
}

export interface BusinessQuoteSubmission {
  id?: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  event_type: string;
  event_date?: string;
  guests_number?: number;
  notes?: string;
  date_created?: string;
  status?: 'new' | 'contacted' | 'quoted' | 'confirmed' | 'rejected';
}

export interface DirectusSchema {
  globals: Globals;
  experiences: Experience[];
  menu_categories: MenuCategory[];
  menu_items: MenuItem[];
  events: Event[];
  business_services: BusinessService[];
  pages: Page[];
  faqs: FAQ[];
  avvisi: Avviso[];
  contact_submissions: ContactSubmission[];
  business_quote_submissions: BusinessQuoteSubmission[];
  directus_files: DirectusFile[];
}
