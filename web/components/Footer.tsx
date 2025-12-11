'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Instagram, Facebook } from 'lucide-react';
import type { Globals } from '@/types/directus';

interface FooterProps {
  globals?: Globals | null;
}

export default function Footer({ globals }: FooterProps) {
  const t = useTranslations('footer');
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const locale = pathname.split('/')[1] || 'it';

  return (
    <footer className="bg-nhero-green text-nhero-cream">
      <div className="py-20 md:py-24 lg:py-28" style={{ maxWidth: '1400px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div className="flex flex-col lg:flex-row lg:items-start" style={{ gap: 'clamp(5rem, 10vw, 12rem)' }}>
          {/* Brand */}
          <div className="flex-shrink-0" style={{ flexBasis: '350px', maxWidth: '350px' }}>
            <div className="w-48 md:w-56 mb-8">
              <Image
                src="/nhero_white_logo.png"
                alt="Nhero Milano"
                width={224}
                height={60}
                className="w-full h-auto"
                priority
              />
            </div>
            <p className="text-nhero-cream/70 text-base leading-relaxed max-w-md mb-8">
              Bar, Ristorante, Bakery e Pizzeria nel cuore di Milano.
              Un&apos;esperienza unica di gusto e accoglienza.
            </p>
            {/* Social */}
            <div className="flex gap-4">
              {globals?.instagram && (
                <a
                  href={globals.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-nhero-cream/10 flex items-center justify-center hover:bg-nhero-cream/20 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={20} className="text-nhero-cream" />
                </a>
              )}
              {globals?.facebook && (
                <a
                  href={globals.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-nhero-cream/10 flex items-center justify-center hover:bg-nhero-cream/20 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={20} className="text-nhero-cream" />
                </a>
              )}
              {globals?.tiktok && (
                <a
                  href={globals.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-nhero-cream/10 flex items-center justify-center hover:bg-nhero-cream/20 transition-all duration-300"
                  aria-label="TikTok"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-nhero-cream">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Links Grid */}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-3" style={{ marginTop: '3.5rem', gap: '3rem' }}>
            {/* Menu */}
            <div>
              <h4 className="text-base font-medium uppercase tracking-wider text-nhero-cream mb-6">
                Menu
              </h4>
              <div className="space-y-4 text-base text-nhero-cream/70">
                <Link
                  href={`/${locale}/menu`}
                  className="block hover:text-nhero-cream transition-colors duration-300"
                >
                  Il Nostro Menu
                </Link>
                <Link
                  href={`/${locale}/carta-vini`}
                  className="block hover:text-nhero-cream transition-colors duration-300"
                >
                  Carta dei Vini
                </Link>
                <Link
                  href={`/${locale}/cocktail`}
                  className="block hover:text-nhero-cream transition-colors duration-300"
                >
                  Cocktail Bar
                </Link>
                <Link
                  href={`/${locale}/bakery`}
                  className="block hover:text-nhero-cream transition-colors duration-300"
                >
                  Bakery
                </Link>
              </div>
            </div>

            {/* Servizi */}
            <div>
              <h4 className="text-base font-medium uppercase tracking-wider text-nhero-cream mb-6">
                Servizi
              </h4>
              <div className="space-y-4 text-base text-nhero-cream/70">
                <Link
                  href={`/${locale}/prenota`}
                  className="block hover:text-nhero-cream transition-colors duration-300"
                >
                  Prenota un Tavolo
                </Link>
                <Link
                  href={`/${locale}/delivery`}
                  className="block hover:text-nhero-cream transition-colors duration-300"
                >
                  Delivery
                </Link>
                <Link
                  href={`/${locale}/eventi`}
                  className="block hover:text-nhero-cream transition-colors duration-300"
                >
                  Eventi Privati
                </Link>
                <Link
                  href={`/${locale}/catering`}
                  className="block hover:text-nhero-cream transition-colors duration-300"
                >
                  Catering
                </Link>
              </div>
            </div>

            {/* Info */}
            <div>
              <h4 className="text-base font-medium uppercase tracking-wider text-nhero-cream mb-6">
                Info
              </h4>
              <div className="space-y-4 text-base text-nhero-cream/70">
                {globals?.address && (
                  <p className="leading-relaxed">{globals.address}</p>
                )}
                {globals?.phone && (
                  <a
                    href={`tel:${globals.phone}`}
                    className="block hover:text-nhero-cream transition-colors duration-300"
                  >
                    {globals.phone}
                  </a>
                )}
                {globals?.email && (
                  <a
                    href={`mailto:${globals.email}`}
                    className="block hover:text-nhero-cream transition-colors duration-300"
                  >
                    {globals.email}
                  </a>
                )}
                <Link
                  href={`/${locale}/privacy`}
                  className="block hover:text-nhero-cream transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link
                  href={`/${locale}/cookie`}
                  className="block hover:text-nhero-cream transition-colors duration-300"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 text-center text-base text-nhero-cream/50">
          <p>{t('copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
