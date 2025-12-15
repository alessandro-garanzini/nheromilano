import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingDock from '@/components/FloatingDock';
import { getGlobals } from '@/lib/directus';
import { locales } from '@/next-intl.config';
import type { Globals } from '@/types/directus';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const globals: Globals | null = await getGlobals();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="frame-content">
        <Navigation menuUrl={globals?.menu_url} />
        <main>
          {children}
        </main>
        <FloatingDock
          reservationUrl={globals?.reservation_url}
          deliveryUrl={globals?.delivery_url}
          mapsUrl={globals?.google_maps_url}
          phone={globals?.phone}
        />
      </div>
      <Footer globals={globals} />
    </NextIntlClientProvider>
  );
}
