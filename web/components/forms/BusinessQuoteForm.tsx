'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function BusinessQuoteForm() {
  const t = useTranslations('business.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      event_type: formData.get('event_type') as string,
      event_date: formData.get('event_date') as string,
      guests_number: formData.get('guests_number') ? parseInt(formData.get('guests_number') as string) : undefined,
      notes: formData.get('notes') as string,
    };

    try {
      const response = await fetch('/api/business-quote', {
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
          <label htmlFor="company" className={labelClasses}>
            {t('company')} <span className="text-nhero-gold">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            placeholder="Azienda S.r.l."
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
            placeholder="mario@azienda.com"
            className={inputClasses}
          />
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

        <div className="relative">
          <label htmlFor="event_type" className={labelClasses}>
            {t('eventType')} <span className="text-nhero-gold">*</span>
          </label>
          <div className="relative">
            <select
              id="event_type"
              name="event_type"
              required
              className={`${inputClasses} appearance-none pr-10 cursor-pointer`}
            >
              <option value="">Seleziona tipo...</option>
              <option value="fidelity">Fidelity Card</option>
              <option value="catering">Catering Aziendale</option>
              <option value="events">Eventi Aziendali</option>
              <option value="meeting">Meeting & Pranzi</option>
              <option value="other">Altro</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          </div>
        </div>

        <div>
          <label htmlFor="event_date" className={labelClasses}>
            {t('eventDate')}
          </label>
          <input
            type="date"
            id="event_date"
            name="event_date"
            className={inputClasses}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="guests_number" className={labelClasses}>
            {t('guestsNumber')}
          </label>
          <input
            type="number"
            id="guests_number"
            name="guests_number"
            min="1"
            placeholder="20"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={labelClasses}>
          {t('notes')}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Descrivi le tue esigenze..."
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
