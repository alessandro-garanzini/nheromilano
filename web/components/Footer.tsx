'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import type { Globals } from '@/types/directus';

interface FooterProps {
  globals?: Globals | null;
}

export default function Footer({ globals }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nhero-green">
      {/* Riga bianca sopra */}
      <div className="h-1 bg-white w-full" />

      {/* Contenuto footer */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social a sinistra */}
          <div className="flex gap-4 items-center">
            {globals?.instagram && (
              <a
                href={globals.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-nhero-cream hover:text-nhero-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            )}
            {globals?.facebook && (
              <a
                href={globals.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-nhero-cream hover:text-nhero-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
            )}
            {globals?.linkedin && (
              <a
                href={globals.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-nhero-cream hover:text-nhero-gold transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            )}
          </div>

          {/* Contatti al centro */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-nhero-cream text-sm">
            {globals?.address && (
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-nhero-cream flex-shrink-0" />
                <span>{globals.address}</span>
              </div>
            )}
            {globals?.email && (
              <a
                href={`mailto:${globals.email}`}
                className="flex items-center gap-2 hover:text-nhero-gold transition-colors duration-300"
              >
                <Mail size={18} className="text-nhero-cream flex-shrink-0" />
                <span>{globals.email}</span>
              </a>
            )}
            {globals?.phone && (
              <a
                href={`tel:${globals.phone}`}
                className="flex items-center gap-2 hover:text-nhero-gold transition-colors duration-300"
              >
                <Phone size={18} className="text-nhero-cream flex-shrink-0" />
                <span>{globals.phone}</span>
              </a>
            )}
          </div>

          {/* CTA Prenota a destra */}
          {globals?.reservation_url && (
            <a
              href={globals.reservation_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-nhero-cream text-nhero-green px-6 py-3 uppercase font-medium text-sm tracking-wider hover:bg-white transition-colors duration-300"
            >
              Prenota
            </a>
          )}
        </div>
      </div>

      {/* Riga bianca sotto */}
      <div className="h-1 bg-white w-full" />

      {/* year, mini logo, privacy and cookie policy*/}
      <div className="bg-nhero-dark-green text-nhero-cream text-sm py-4 mt-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-6">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Image
              src="/nhero_white_logo.png"
              alt="Nhero Milano"
              width={80}
              height={20}
              className="inline-block"
            />
            <div className="text-xs text-nhero-cream/80 text-center md:text-left leading-relaxed">
              <div>RIAL CAFE&apos; S.R.L.</div>
              <div>P.IVA & C.F.: 04338860960</div>
              <div>VIA FELICE CASATI 44, 20124, MILANO (MI)</div>
              <div>Rea: 1740237</div>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-nhero-gold transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/cookie" className="hover:text-nhero-gold transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
