'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/next-intl.config';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const getCurrentLocale = (): Locale => {
    const locale = pathname.split('/')[1];
    return locales.includes(locale as Locale) ? (locale as Locale) : 'it';
  };

  const switchLanguage = (newLocale: Locale) => {
    const currentLocale = getCurrentLocale();
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  const currentLocale = getCurrentLocale();

  return (
    <div className="flex items-center gap-1">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          <button
            onClick={() => switchLanguage(locale)}
            className={`px-1.5 py-0.5 text-xs tracking-wider uppercase transition-all duration-300 ${
              currentLocale === locale
                ? 'text-nhero-gold'
                : 'hover:opacity-100'
            }`}
            style={{ color: currentLocale === locale ? undefined : 'rgba(255, 255, 255, 0.6)' }}
          >
            {locale}
          </button>
          {index < locales.length - 1 && (
            <span className="text-xs text-white/60">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
