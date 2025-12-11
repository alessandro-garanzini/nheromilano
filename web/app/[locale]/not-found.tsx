'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

export default function NotFound() {
  const t = useTranslations('notFound');

  useEffect(() => {
    // Lock scroll on both body and html for mobile
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#2C3128] flex flex-col items-center justify-center overflow-hidden" style={{ touchAction: 'none' }}>
      <div className="flex flex-col items-center" style={{ padding: '1rem' }}>
        {/* Logo */}
        <div style={{ marginBottom: '1rem' }}>
          <Image
            src="/nhero_white_logo.png"
            alt="Nhero Milano"
            width={420}
            height={60}
            className="h-auto"
            priority
          />
        </div>

        {/* 404 Number */}
        <h1 className="text-[6rem] md:text-[10rem] font-bold leading-none tracking-tighter text-white" style={{ marginBottom: '1rem' }}>
          404
        </h1>

        {/* Message */}
        <p className="text-xl md:text-2xl text-nhero-cream font-semibold uppercase text-center" style={{ marginBottom: '1rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
          {t('title')}
        </p>
        <p className="text-sm md:text-base text-nhero-cream max-w-md text-center uppercase" style={{ marginBottom: '0.5rem', marginTop: '2rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
          {t('subtitle')}
        </p>

        {/* Back Home Button */}
        <Link
          href="/"
          className="bg-white text-nhero-green uppercase"
          style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', marginTop: '2rem' }}
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
