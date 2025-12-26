'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

// Schema will be created dynamically with correct error messages
const createContactSchema = (t: (key: string) => string, captchaAnswer: number) => z.object({
  name: z.string().min(2, t('contacts.form.validation.nameMin')),
  email: z.string().email(t('contacts.form.validation.emailInvalid')),
  phone: z.string().optional(),
  message: z.string().min(10, t('contacts.form.validation.messageMin')),
  captcha: z.string().refine(
    (val) => parseInt(val) === captchaAnswer,
    { message: t('contacts.form.validation.captchaWrong') }
  ),
  privacyPolicy: z.literal('on', {
    message: t('contacts.form.validation.privacyRequired')
  }),
});

interface ContactModalProps {
  trigger: React.ReactNode;
}

type CaptchaQuestion = {
  num1: number;
  num2: number;
  answer: number;
  question: string;
};

export default function ContactModal({ trigger }: ContactModalProps) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [captcha, setCaptcha] = useState<CaptchaQuestion | null>(null);

  // Generate a simple math captcha
  const generateCaptcha = (): CaptchaQuestion => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return {
      num1,
      num2,
      answer: num1 + num2,
      question: `${num1} + ${num2}`,
    };
  };

  useEffect(() => {
    if (open) {
      setCaptcha(generateCaptcha());
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submit triggered');
    e.preventDefault();
    setErrors({});
    setStatus('idle');

    if (!captcha) {
      console.error('Captcha not initialized');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      captcha: formData.get('captcha') as string,
      privacyPolicy: formData.get('privacyPolicy') as string,
    };

    console.log('Form data:', data);

    // Validate with zod
    const contactSchema = createContactSchema(t, captcha.answer);
    const result = contactSchema.safeParse(data);
    console.log('Validation result:', result);
    
    if (!result.success) {
      console.log('Validation failed:', result.error);
      const fieldErrors: Record<string, string> = {};
      if (result.error?.issues) {
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as string;
          fieldErrors[field] = issue.message;
        });
      }
      console.log('Setting field errors:', fieldErrors);
      setErrors(fieldErrors);
      setStatus('idle');
      return;
    }

    console.log('Validation passed, starting submission');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setCaptcha(generateCaptcha());
        // Close modal after success
        setTimeout(() => {
          setOpen(false);
          setStatus('idle');
        }, 2000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('API error:', errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus('error');
      setCaptcha(generateCaptcha());
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `
    w-full px-4 py-3
    bg-transparent border border-nhero-cream/30
    text-nhero-cream placeholder:text-nhero-cream/50
    outline-none focus:outline-none focus-visible:outline-none
    focus:border-nhero-cream focus:border-2
    ring-0 focus:ring-0 focus-visible:ring-0 focus:ring-offset-0
    shadow-none focus:shadow-none
    transition-colors duration-200
  `;

  const labelClasses = `
    block text-sm font-medium mb-2 text-nhero-cream uppercase tracking-wide
  `;

  const errorClasses = `
    text-xs text-red-400 mt-1 font-medium
  `;

  const getInputClasses = (fieldName: string) => `
    ${inputClasses} ${errors[fieldName] ? 'border-red-400 border-2' : ''}
  `;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent
        className="bg-nhero-green border-nhero-cream/20 text-nhero-cream max-w-lg"
        showCloseButton={true}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium uppercase tracking-wide text-nhero-cream">
            Contattaci
          </DialogTitle>
          <DialogDescription className="text-nhero-cream/70 text-sm uppercase tracking-wide">
            Compila il form per inviarci un messaggio
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="modal-name" className={labelClasses}>
                Nome <span className="text-nhero-gold">*</span>
              </label>
              <input
                type="text"
                id="modal-name"
                name="name"
                placeholder="Mario Rossi"
                className={getInputClasses('name')}
              />
              {errors.name && <p className={errorClasses}>{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="modal-email" className={labelClasses}>
                Email <span className="text-nhero-gold">*</span>
              </label>
              <input
                type="email"
                id="modal-email"
                name="email"
                placeholder="mario@example.com"
                className={getInputClasses('email')}
              />
              {errors.email && <p className={errorClasses}>{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="modal-phone" className={labelClasses}>
              Telefono
            </label>
            <input
              type="tel"
              id="modal-phone"
              name="phone"
              placeholder="+39 02 1234567"
              className={getInputClasses('phone')}
            />
            {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="modal-message" className={labelClasses}>
              {t('contacts.form.message')} <span className="text-nhero-gold">*</span>
            </label>
            <textarea
              id="modal-message"
              name="message"
              rows={4}
              placeholder={t('contacts.form.messagePlaceholder')}
              className={`${getInputClasses('message')} resize-none`}
            />
            {errors.message && <p className={errorClasses}>{errors.message}</p>}
          </div>

          {/* Captcha */}
          <div>
            <label htmlFor="modal-captcha" className={labelClasses}>
              {t('contacts.form.captcha')} <span className="text-nhero-gold">*</span>
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  id="modal-captcha"
                  name="captcha"
                  placeholder={t('contacts.form.captchaPlaceholder')}
                  className={getInputClasses('captcha')}
                  autoComplete="off"
                />
              </div>
              <div className="px-4 py-3 bg-nhero-cream/10 border border-nhero-cream/30 text-nhero-cream font-mono text-lg whitespace-nowrap">
                {captcha?.question || '...'}
              </div>
            </div>
            {errors.captcha && <p className={errorClasses}>{errors.captcha}</p>}
          </div>

          {/* Privacy Policy Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="modal-privacy"
              name="privacyPolicy"
              className="mt-1 w-4 h-4 bg-transparent border-2 border-nhero-cream/30 checked:bg-nhero-gold checked:border-nhero-gold focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <label htmlFor="modal-privacy" className="text-xs text-nhero-cream/80 leading-relaxed cursor-pointer">
              {t('contacts.form.privacyAccept')}{' '}
              <a 
                href="/privacy-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-nhero-gold hover:text-nhero-cream underline transition-colors"
              >
                {t('contacts.form.privacyLink')}
              </a>
              {' '}<span className="text-nhero-gold">*</span>
            </label>
          </div>
          {errors.privacyPolicy && <p className={errorClasses}>{errors.privacyPolicy}</p>}

          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 p-3 bg-nhero-cream/10 border border-nhero-cream/30 text-nhero-cream"
              >
                <Check className="w-5 h-5 flex-shrink-0 text-nhero-gold" />
                <span className="text-sm">{t('contacts.form.success')}</span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 text-red-400"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{t('contacts.form.error')}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isSubmitting || !captcha}
            className="w-full px-8 py-4 bg-nhero-cream text-nhero-green font-medium uppercase tracking-wide text-sm transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('contacts.form.sending')}
              </span>
            ) : (
              t('contacts.form.submit')
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
