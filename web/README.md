# Nhero Milano Website

Modern, elegant website for Nhero Milano - Bar, Ristorante, Bakery, and Pizzeria in the heart of Milan.

## 🎨 Design Features

- **Manhattan-style border frame** wrapping the entire site
- **Floating action dock** with quick access buttons (Maps, Call, Delivery, Menu, Book) - auto-hides on scroll
- **Smooth scroll animations** with Framer Motion
- **Full i18n support** (Italian/English) with next-intl
- **Brand colors**: Green (#393F33), Gold (#c9a962), Vanilla White (#FFFEF9)
- **Directus CMS integration** for dynamic content management

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **CMS**: Directus
- **Animations**: Framer Motion
- **i18n**: next-intl
- **Language**: TypeScript
- **Icons**: Lucide React

## 🛠️ Setup Instructions

### 1. Environment Variables

Create `.env.local` in the `web/` directory:

```bash
NEXT_PUBLIC_DIRECTUS_URL=https://cms.nheromilano.garanzini.dev
DIRECTUS_TOKEN=your-directus-static-token-here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` - it will redirect to `/it` (default locale).

### 4. Build for Production

```bash
npm run build
npm start
```

## 📄 Key Pages

| Route | Description | CMS Integration |
|-------|-------------|-----------------|
| `/` | Homepage with experiences preview | `pages`, `avvisi`, `experiences` |
| `/esperienze` | Experiences hub | `experiences` |
| `/esperienze/[slug]` | Individual experience detail | `experiences` |
| `/menu` | Dynamic menu with filters | `menu_items`, `menu_categories` |
| `/eventi` | Events listing | `events` |
| `/eventi/[slug]` | Event detail page | `events` |
| `/business` | Business services & quote form | `business_services` |
| `/contatti` | Contact page with form & map | `globals` |

## 🌐 Internationalization

- Default locale: Italian (`it`)
- Supported locales: Italian (`it`), English (`en`)
- Routes: `/it/...` and `/en/...`
- Language switcher in navigation

## 🎯 Floating Dock Actions

The dock provides quick access to:
1. **Maps** - Opens Google Maps location
2. **Call** - Direct phone call
3. **Delivery** - Link to delivery service
4. **Menu** - Navigate to menu page
5. **Book** - Reservation link

Auto-hides when scrolling down, reappears when scrolling up.

## 📝 License

Copyright © 2025 Nhero Milano. All rights reserved.
