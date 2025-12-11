# Nhero Milano - AI Coding Agent Instructions

## Project Architecture

This is a **Docker-based monorepo** for Nhero Milano restaurant website with three main services:
- **Directus CMS** (port 8055) - Headless CMS with PostgreSQL + Redis cache
- **Next.js Website** (port 3000) - Customer-facing site with i18n
- **Caddy** - Reverse proxy with automatic HTTPS

**Key architectural decisions:**
- Directus SDK with static token auth (server-side only, never client-side)
- ISR with 60-second revalidation (`export const revalidate = 60`)
- Locale-prefixed routing (`/it/*`, `/en/*`) with `localePrefix: 'always'`
- Standalone Next.js builds for containerized deployments

## Development Workflow

**Start the full stack:**
```bash
# Root: Start Directus, database, cache, and website
docker compose up --build

# Or just rebuild website after changes
docker compose up --build website
```

**Local Next.js development (faster hot-reload):**
```bash
cd web
npm run dev  # Requires .env.local with Directus credentials
```

**Environment setup:**
- `.env` (root) - Database and Directus config for Docker
- `web/.env.local` - Next.js connects to Directus CMS
  ```
  NEXT_PUBLIC_DIRECTUS_URL=https://cms.nheromilano.garanzini.dev
  DIRECTUS_TOKEN=your-static-token-here
  ```

## Directus Integration Patterns

**Always use typed SDK calls via `lib/directus.ts`:**
```typescript
// ✅ Correct - Use helper functions
const experiences = await getExperiences();
const item = await getExperienceBySlug(slug);

// ✅ Image URLs - Use transformation helpers
const url = getOptimizedImageUrl(fileId, width); // Auto webp, quality 80
const url = getDirectusFileUrl(fileId, { width, height, quality, format });
```

**Key conventions:**
- All collections fetch with `status: 'published'` filter
- Relations load with nested field syntax: `fields: ['*', 'hero_image.*', 'gallery.*']`
- File IDs can be strings OR `DirectusFile` objects - always check with type guards
- API routes use separate Directus client (no static token for security)

**Image handling:**
```tsx
// For server components
const url = getOptimizedImageUrl(
  typeof image === 'string' ? image : image.id, 
  1920
);

// For client components
<DirectusImage src={image} width={800} height={600} alt="..." />
```

## Internationalization (i18n)

**Structure:**
- Default locale: Italian (`it`)
- Supported: `it`, `en`
- All routes MUST have locale prefix (middleware enforces)
- Messages in `web/messages/{locale}.json`

**Usage patterns:**
```tsx
// Server components
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('namespace');

// Client components
import { useTranslations } from 'next-intl';
const t = useTranslations('namespace');

// Navigation
import Link from 'next/link';
<Link href="/menu">Menu</Link>  // Auto-prefixes with current locale
```

## Brand Design System

**Colors** (defined in `globals.css`):
- Primary: `nhero-green` (#2C3128), `nhero-gold` (#B8975C)
- Backgrounds: `nhero-vanilla` (#FAFAF8), `nhero-cream` (#F2F1ED)
- Text: `nhero-charcoal` (#1A1D17)

**Key UI patterns:**
- **Frame Border**: 12px Manhattan-style border around entire site (FrameBorder component)
- **Floating Dock**: Auto-hiding action buttons (Maps, Call, Delivery, Menu, Book) with scroll detection
- **Animations**: Framer Motion with `ease: [0.22, 1, 0.36, 1]` for smooth transitions
- **Sections**: Use `<Section background="vanilla|cream" padding="medium|large">`

## File Structure Conventions

**Page structure:**
```
app/[locale]/              # Locale-based routing
  ├── page.tsx             # Homepage
  ├── menu/page.tsx        # Static pages
  └── esperienze/
      ├── page.tsx         # List view
      └── [slug]/page.tsx  # Dynamic detail pages
```

**Component organization:**
- `components/ui/` - Reusable UI primitives (Hero, Section, Card, Button)
- `components/` - Feature components (Navigation, Footer, FloatingDock)
- `components/forms/` - Form components with validation
- `lib/` - Utilities (directus.ts for CMS, imageLoader.ts for Next.js)
- `types/` - TypeScript definitions (directus.ts mirrors CMS schema)

## Common Gotchas

1. **Image optimization:** Next.js needs `remotePatterns` in `next.config.ts` for Directus CDN
2. **API routes:** Use PUBLIC Directus URL without static token (let users authenticate)
3. **Locale params:** Always `await params` in server components (Next.js 15+ requirement)
4. **Static generation:** Use `generateStaticParams` for dynamic routes with ISR
5. **Docker volumes:** Database persists in `data/database/`, uploads in `uploads/`

## Production Deployment

**Build commands:**
```bash
# Production Docker Compose (uses prod.Dockerfile)
docker compose -f prod.compose.yml up --build

# Caddy handles HTTPS and routing:
# - cms.nheromilano.garanzini.dev → directus:8055
# - nheromilano.garanzini.dev → website:3000
```

**Next.js config for containers:**
- `output: "standalone"` enables optimized Docker builds
- Image optimization configured with device sizes and webp format
- `minimumCacheTTL: 60` for CDN-friendly caching

## Type Safety

**Always sync types when Directus schema changes:**
1. Inspect Directus collections structure
2. Update `types/directus.ts` with new fields/collections
3. Update `lib/directus.ts` helper functions if needed
4. Check TypeScript errors in pages consuming the data

**Example type pattern:**
```typescript
export interface Experience {
  id: string;
  slug: string;
  title: string;
  hero_image?: string | DirectusFile;  // Handle both ID and populated object
  gallery?: string[] | DirectusFile[];
  // ...
}
```

## Directus Collections Schema

### Content Organization

Collections are organized in two folders:
- **content**: Main website content (experiences, events, pages, avvisi, FAQs)
- **menu**: Menu management (categories and items)

### Core Collections

#### **experiences** (Esperienze Nhero)
Main content collection for the different restaurant experiences (Bakery, Ristorante, Pizzeria, Cocktail).

**Key fields:**
- `slug` (string, required): URL identifier (e.g., "bakery", "ristorante", "pizzeria", "cocktail")
- `title` (string, required): Display name (e.g., "Bakery", "Ristorante")
- `subtitle` (string): Brief tagline (e.g., "Pasticceria & Caffetteria")
- `description` (rich text HTML): Full description of the experience
- `icon` (icon): Visual icon identifier
- `color` (color): Accent color for theming
- `hero_image` (M2O → directus_files): Main hero image
- `seo_title`, `seo_description`: SEO metadata
- `gallery` (M2M → directus_files via experiences_gallery): Image gallery
- `menu_categories` (O2M → menu_categories): Associated menu sections

**Relations:**
- Many-to-Many with `directus_files` through `experiences_gallery` junction
- One-to-Many with `menu_categories` (reverse of category.experience)

#### **menu_categories** (Categorie Menu)
Menu sections like "Antipasti", "Pizze Classiche", "Dolci", "Cocktail".

**Key fields:**
- `name` (string, required): Category name
- `slug` (string): URL-friendly identifier
- `description` (text): Category description
- `experience` (M2O → experiences): Parent experience
- `items` (O2M → menu_items): Menu items in this category

**Relations:**
- Many-to-One with `experiences` (belongs to one experience)
- One-to-Many with `menu_items` (has many dishes)

#### **menu_items** (Piatti e Prodotti)
Individual dishes, drinks, and products on the menu.

**Key fields:**
- `name` (string, required): Dish name
- `description` (text): Ingredients and details
- `price` (decimal): Price in euros
- `category` (M2O → menu_categories, required): Parent category
- `image` (M2O → directus_files): Dish photo
- `is_vegetarian`, `is_vegan`, `is_gluten_free` (boolean): Dietary flags
- `allergens` (json/tags): List of allergens
- `is_featured` (boolean): Highlight as recommended

**Relations:**
- Many-to-One with `menu_categories` (belongs to one category)
- Many-to-One with `directus_files` for image

#### **events** (Eventi e Serate Speciali)
Special events, themed nights, and restaurant happenings.

**Key fields:**
- `title` (string, required): Event name
- `slug` (string): URL identifier
- `date_event` (date, required): Event date
- `time_start`, `time_end` (time): Event schedule
- `description` (rich text HTML): Full event details
- `cover_image` (M2O → directus_files): Event cover
- `is_past` (boolean): Archive flag for past events
- `external_link` (string): External booking link (e.g., Eventbrite)
- `gallery` (M2M → directus_files via events_gallery): Event photos

**Relations:**
- Many-to-Many with `directus_files` through `events_gallery` junction

#### **business_services** (Servizi Business)
Business offerings like Fidelity Card, Catering, Corporate Events.

**Key fields:**
- `title` (string, required): Service name (e.g., "Fidelity Card Aziendale")
- `description` (text): Service description
- `icon` (icon): Service icon
- `image` (M2O → directus_files): Representative image

**Relations:**
- Many-to-One with `directus_files` for image

#### **pages** (Pagine Statiche)
Static content pages like "Business", "About", "Contatti".

**Key fields:**
- `slug` (string, required): Page URL (e.g., "home", "business", "contatti")
- `title` (string, required): Page title
- `hero_title`, `hero_subtitle` (string): Hero section content
- `hero_image` (M2O → directus_files): Hero background
- `content` (rich text HTML): Main page content
- `seo_title`, `seo_description`: SEO metadata

**Relations:**
- Many-to-One with `directus_files` for hero image

#### **faqs** (Domande Frequenti)
Frequently asked questions organized by category.

**Key fields:**
- `question` (string, required): The question
- `answer` (rich text HTML, required): Detailed answer
- `category` (select): FAQ category ("general", "reservations", "menu", "events", "business")

**No relations**

#### **avvisi** (Avvisi Homepage)
Popup notifications/alerts shown on homepage.

**Key fields:**
- `titolo` (string, required): Alert title
- `descrizione` (rich text HTML, required): Alert description (supports HTML)
- `foto` (M2O → directus_files): Optional alert image
- System fields: `user_created`, `date_created`, `user_updated`, `date_updated`

**Relations:**
- Many-to-One with `directus_files` for photo

#### **globals** (Impostazioni Globali) - Singleton
Site-wide settings like contact info, hours, social links.

**Key fields:**
- `site_name`, `tagline`: Brand identity
- `address`, `phone`, `email`: Contact information
- `google_maps_url`: Location link
- `opening_hours` (JSON list): Schedule with day/hours pairs
  ```typescript
  [{
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
    hours: string  // e.g., "07:00 - 24:00"
  }]
  ```
- `instagram`, `facebook`, `tiktok`: Social media URLs
- `reservation_url`: Booking platform link (TheFork)
- `delivery_url`: Delivery service link (Glovo, Deliveroo)

**No relations** (singleton collection)

### Form Submissions

#### **contact_submissions** (Richieste Contatto)
Contact form submissions from the website.

**Key fields:**
- `name`, `email` (string, required): Contact info
- `phone` (string): Optional phone
- `message` (text, required): User message
- `status` (select): Submission status ("new", "read", "replied", "archived")
- `date_created` (timestamp, readonly): Auto-tracked

**No relations**

#### **business_quote_submissions** (Richieste Preventivi Business)
Business inquiry form submissions.

**Key fields:**
- `name`, `email` (string, required): Contact info
- `company` (string, required): Business name
- `phone` (string): Optional phone
- `event_type` (select, required): Service type ("fidelity", "catering", "events", "meeting", "other")
- `event_date` (date): Indicative date
- `guests_number` (integer): Number of people
- `notes` (text): Additional details
- `status` (select): Quote status ("new", "contacted", "quoted", "confirmed", "rejected")
- `date_created` (timestamp, readonly): Auto-tracked

**No relations**

### Junction Collections

#### **experiences_gallery**
Many-to-Many junction for experience image galleries.

**Fields:**
- `id`, `experiences_id`, `directus_files_id`, `sort`

#### **events_gallery**
Many-to-Many junction for event image galleries.

**Fields:**
- `id`, `events_id`, `directus_files_id`, `sort`

### Standard Fields Pattern

All content collections include:
- `id` (UUID, primary key)
- `status` ("published", "draft", "archived")
- `sort` (integer) - Manual ordering
- System timestamps: `date_created`, `date_updated` (where applicable)
- System users: `user_created`, `user_updated` (for tracked collections)

### Query Patterns

**Fetching with relations:**
```typescript
// Experience with gallery and categories
const experience = await directus.request(
  readItem('experiences', slug, {
    fields: ['*', 'hero_image.*', 'gallery.*', 'menu_categories.*']
  })
);

// Menu category with items and parent experience
const category = await directus.request(
  readItem('menu_categories', id, {
    fields: ['*', 'experience.*', 'items.*.image.*']
  })
);
```

**Filtering published content:**
```typescript
// Always filter by status for public-facing queries
const items = await directus.request(
  readItems('experiences', {
    filter: { status: { _eq: 'published' } },
    sort: ['sort']
  })
);
```

**Globals singleton access:**
```typescript
// Globals is a singleton - fetch first item
const globals = await directus.request(
  readItems('globals', { limit: 1 })
);
```
