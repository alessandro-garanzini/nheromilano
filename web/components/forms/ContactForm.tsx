'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ContactForm() {
  const t = useTranslations('contacts.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `
    w-full px-4 py-3.5
    bg-white border border-nhero-cream
    text-nhero-charcoal placeholder:text-muted/50
    focus:outline-none focus:border-nhero-gold focus:ring-1 focus:ring-nhero-gold
    transition-colors duration-200
  `;

  const labelClasses = `
    block text-sm font-medium mb-2 text-nhero-charcoal
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClasses}>
            {t('name')} <span className="text-nhero-gold">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Mario Rossi"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            {t('email')} <span className="text-nhero-gold">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="mario@example.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelClasses}>
          {t('phone')}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+39 02 1234567"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          {t('message')} <span className="text-nhero-gold">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t('messagePlaceholder') || 'Come possiamo aiutarti?'}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-800"
          >
            <Check className="w-5 h-5 flex-shrink-0" />
            <span>{t('success')}</span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-800"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{t('error')}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="primary"
        size="large"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Invio in corso...
          </span>
        ) : (
          t('submit')
        )}
      </Button>
    </form>
  );
}
