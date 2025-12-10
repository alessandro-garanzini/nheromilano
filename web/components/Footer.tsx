'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Instagram } from 'lucide-react';
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
    <footer className="bg-nhero-charcoal text-white">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-medium mb-4">
              Nhero Milano
            </h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mb-6">
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
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-nhero-gold transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
              {globals?.facebook && (
                <a
                  href={globals.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-nhero-gold transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {globals?.tiktok && (
                <a
                  href={globals.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-nhero-gold transition-colors duration-300"
                  aria-label="TikTok"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-nhero-gold mb-4">
              Contatti
            </h4>
            <div className="space-y-3 text-sm text-white/60">
              {globals?.address && (
                <p>{globals.address}</p>
              )}
              {globals?.phone && (
                <a 
                  href={`tel:${globals.phone}`} 
                  className="block hover:text-white transition-colors duration-300"
                >
                  {globals.phone}
                </a>
              )}
              {globals?.email && (
                <a 
                  href={`mailto:${globals.email}`} 
                  className="block hover:text-white transition-colors duration-300"
                >
                  {globals.email}
                </a>
              )}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-nhero-gold mb-4">
              {t('legal')}
            </h4>
            <div className="space-y-3 text-sm text-white/60">
              <Link 
                href={`/${locale}/privacy`} 
                className="block hover:text-white transition-colors duration-300"
              >
                {t('privacy')}
              </Link>
              <Link 
                href={`/${locale}/cookie`} 
                className="block hover:text-white transition-colors duration-300"
              >
                {t('cookie')}
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>{t('copyright', { year: currentYear })}</p>
          <p>
            Design by{' '}
            <a 
              href="https://garanzini.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-nhero-gold transition-colors duration-300"
            >
              Garanzini.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
