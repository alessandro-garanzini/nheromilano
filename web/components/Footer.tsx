'use client';

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

          {/* Contatti a destra */}
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
        </div>
      </div>

      {/* Riga bianca sotto */}
      <div className="h-1 bg-white w-full" />
    </footer>
  );
}
