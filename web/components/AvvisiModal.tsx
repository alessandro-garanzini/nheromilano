'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface AvvisoWithImageUrl {
  id: string;
  titolo: string;
  descrizione: string;
  imageUrl: string | null;
  cta_label?: string;
  cta_url?: string;
}

interface AvvisiModalProps {
  avvisi: AvvisoWithImageUrl[];
}

export default function AvvisiModal({ avvisi }: AvvisiModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (avvisi.length > 0) {
      setIsOpen(true);
    }
  }, [avvisi.length]);

  if (avvisi.length === 0) return null;

  const currentAvviso = avvisi[currentIndex];
  const imageUrl = currentAvviso.imageUrl;

  const handleNext = () => {
    if (currentIndex < avvisi.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="bg-nhero-green border-8 border-nhero-green rounded-none p-0 sm:max-w-2xl max-h-[90vh] overflow-hidden"
        showCloseButton={false}
      >
        {imageUrl && (
          <div className="relative w-full aspect-[16/10]">
            <Image
              src={imageUrl}
              alt={currentAvviso.titolo}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="p-6 pt-4">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-nhero-cream text-xl font-medium">
              {currentAvviso.titolo}
            </DialogTitle>
          </DialogHeader>

          <DialogDescription asChild>
            <div
              className="text-nhero-cream/80 prose prose-sm prose-invert max-w-none [&_a]:text-nhero-gold [&_a]:underline [&_p]:text-nhero-cream/80"
              dangerouslySetInnerHTML={{ __html: currentAvviso.descrizione }}
            />
          </DialogDescription>

          <div className="mt-6 flex items-center justify-between gap-4">
            {avvisi.length > 1 && (
              <span className="text-nhero-cream/60 text-sm">
                {currentIndex + 1} / {avvisi.length}
              </span>
            )}

            <div className="ml-auto flex gap-3">
              {currentAvviso.cta_label && currentAvviso.cta_url && (
                <a
                  href={currentAvviso.cta_url}
                  target={currentAvviso.cta_url.startsWith('http') ? '_blank' : undefined}
                  rel={currentAvviso.cta_url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="bg-nhero-cream text-nhero-green px-6 py-2 font-medium text-sm uppercase tracking-wider hover:bg-nhero-cream/90 transition-colors focus:outline-none focus:ring-0 active:outline-none flex items-center justify-center"
                >
                  {currentAvviso.cta_label}
                </a>
              )}

              <button
                onClick={handleNext}
                className="bg-nhero-gold text-nhero-green px-6 py-2 font-medium text-sm uppercase tracking-wider focus:outline-none focus:ring-0 active:outline-none"
              >
                {currentIndex < avvisi.length - 1 ? 'Avanti' : 'Chiudi'}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
