'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { X } from 'lucide-react';

type ConsentType = 'all' | 'necessary' | 'none' | null;

export default function CookieBanner() {
  const t = useTranslations('cookieBanner');
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentType>(null);

  useEffect(() => {
    // Check if user has already given consent
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleConsent = (type: ConsentType) => {
    if (type) {
      localStorage.setItem('cookie-consent', type);
      localStorage.setItem('cookie-consent-date', new Date().toISOString());
    }
    setConsent(type);
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto bg-nhero-green shadow-2xl rounded-2xl border-2 border-nhero-gold/30 overflow-hidden">
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setShowBanner(false)}
                className="absolute top-4 right-4 text-nhero-cream hover:text-nhero-gold transition-colors"
                aria-label="Close banner"
              >
                <X size={20} />
              </button>

              <div className="p-6 md:p-8">
                {!showDetails ? (
                  // Main banner view
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-3xl">🍪</div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl md:text-2xl text-nhero-cream">
                          {t('title')}
                        </h3>
                        <p className="text-sm md:text-base text-nhero-cream/90 leading-relaxed">
                          {t('description')}
                        </p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <Link
                            href="/privacy"
                            className="text-nhero-gold hover:underline"
                          >
                            {t('privacyPolicy')}
                          </Link>
                          <span className="text-nhero-cream/50">•</span>
                          <Link
                            href="/cookie"
                            className="text-nhero-gold hover:underline"
                          >
                            {t('cookiePolicy')}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={() => handleConsent('all')}
                        className="flex-1 bg-nhero-gold text-nhero-green px-6 py-3 rounded-lg font-semibold hover:bg-nhero-gold/90 transition-colors"
                      >
                        {t('acceptAll')}
                      </button>
                      <button
                        onClick={() => handleConsent('necessary')}
                        className="flex-1 bg-nhero-cream/10 text-nhero-cream border border-nhero-cream/30 px-6 py-3 rounded-lg font-semibold hover:bg-nhero-cream/20 transition-colors"
                      >
                        {t('necessaryOnly')}
                      </button>
                      <button
                        onClick={() => setShowDetails(true)}
                        className="flex-1 text-nhero-cream border border-nhero-cream/30 px-6 py-3 rounded-lg font-semibold hover:bg-nhero-cream/10 transition-colors"
                      >
                        {t('customize')}
                      </button>
                    </div>
                  </div>
                ) : (
                  // Detailed settings view
                  <div className="space-y-6">
                    <div>
                      <button
                        onClick={() => setShowDetails(false)}
                        className="text-nhero-gold hover:underline text-sm mb-4"
                      >
                        ← {t('back')}
                      </button>
                      <h3 className="text-xl md:text-2xl text-nhero-cream mb-2">
                        {t('customizeTitle')}
                      </h3>
                      <p className="text-sm text-nhero-cream/80">
                        {t('customizeDescription')}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Necessary cookies - always enabled */}
                      <div className="bg-nhero-cream/5 p-4 rounded-lg border border-nhero-cream/20">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-nhero-cream mb-1">
                              {t('necessary')}
                            </h4>
                            <p className="text-sm text-nhero-cream/70">
                              {t('necessaryDescription')}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="px-3 py-1 bg-nhero-gold/20 text-nhero-gold text-xs rounded-full font-semibold">
                              {t('alwaysActive')}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Analytics cookies - optional */}
                      <div className="bg-nhero-cream/5 p-4 rounded-lg border border-nhero-cream/20">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-nhero-cream mb-1">
                              {t('analytics')}
                            </h4>
                            <p className="text-sm text-nhero-cream/70">
                              {t('analyticsDescription')}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <label className="relative inline-block w-12 h-6">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                defaultChecked
                              />
                              <div className="w-full h-full bg-nhero-cream/20 rounded-full peer-checked:bg-nhero-gold transition-colors cursor-pointer"></div>
                              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Marketing cookies - optional */}
                      <div className="bg-nhero-cream/5 p-4 rounded-lg border border-nhero-cream/20">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-nhero-cream mb-1">
                              {t('marketing')}
                            </h4>
                            <p className="text-sm text-nhero-cream/70">
                              {t('marketingDescription')}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <label className="relative inline-block w-12 h-6">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                              />
                              <div className="w-full h-full bg-nhero-cream/20 rounded-full peer-checked:bg-nhero-gold transition-colors cursor-pointer"></div>
                              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={() => handleConsent('all')}
                        className="flex-1 bg-nhero-gold text-nhero-green px-6 py-3 rounded-lg font-semibold hover:bg-nhero-gold/90 transition-colors"
                      >
                        {t('acceptAll')}
                      </button>
                      <button
                        onClick={() => handleConsent('necessary')}
                        className="flex-1 bg-nhero-cream/10 text-nhero-cream border border-nhero-cream/30 px-6 py-3 rounded-lg font-semibold hover:bg-nhero-cream/20 transition-colors"
                      >
                        {t('savePreferences')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
