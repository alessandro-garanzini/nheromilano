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
        className="bg-nhero-cream border-none rounded-none p-0 w-full h-full max-w-full max-h-full sm:w-auto sm:h-auto sm:max-w-4xl sm:max-h-[90vh] overflow-hidden outline-none focus:outline-none focus-visible:outline-none shadow-2xl"
        showCloseButton={true}
      >
        <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden">
          {/* Always show image container on mobile, conditionally on desktop */}
          <div
            className={`relative w-full md:w-1/2 min-h-[40vh] md:min-h-[500px] shrink-0 bg-nhero-green/10 ${!imageUrl ? 'md:hidden' : ''}`}
            style={{ height: '40vh' }}
          >
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={currentAvviso.titolo}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            )}
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between md:overflow-y-auto">
            <div className="flex-1">
              <DialogHeader className="mb-4 md:mb-6">
                <DialogTitle className="text-nhero-green text-2xl md:text-4xl leading-tight">
                  {currentAvviso.titolo}
                </DialogTitle>
              </DialogHeader>

              <DialogDescription asChild>
                <div
                  className="text-nhero-charcoal/80 prose prose-sm max-w-none [&_a]:text-nhero-gold [&_a]:underline [&_p]:text-nhero-charcoal/80 [&_p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: currentAvviso.descrizione }}
                />
              </DialogDescription>
            </div>

            <div className="mt-6 md:mt-4 space-y-3 md:space-y-10 flex-shrink-0">
              {currentAvviso.cta_label && currentAvviso.cta_url && (
                <a
                  href={currentAvviso.cta_url}
                  target={currentAvviso.cta_url.startsWith('http') ? '_blank' : undefined}
                  rel={currentAvviso.cta_url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block w-full bg-nhero-green text-nhero-cream px-6 md:px-8 py-3 font-medium text-sm uppercase tracking-wider hover:bg-nhero-green/90 transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 active:outline-none text-center"
                >
                  {currentAvviso.cta_label}
                </a>
              )}

              <div className="flex items-center justify-between gap-4">
                {avvisi.length > 1 && (
                  <span className="text-nhero-charcoal/60 text-sm">
                    {currentIndex + 1} / {avvisi.length}
                  </span>
                )}

                {currentIndex < avvisi.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="ml-auto bg-transparent text-nhero-green px-6 md:px-8 py-3 font-medium text-sm uppercase tracking-wider border border-nhero-green hover:bg-nhero-green/5 transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 active:outline-none"
                  >
                    Avanti
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
