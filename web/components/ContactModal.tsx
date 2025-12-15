'use client';

import { useState } from 'react';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

const contactSchema = z.object({
  name: z.string().min(2, 'Il nome deve avere almeno 2 caratteri'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Il messaggio deve avere almeno 10 caratteri'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactModalProps {
  trigger: React.ReactNode;
}

export default function ContactModal({ trigger }: ContactModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submit triggered');
    e.preventDefault();
    setErrors({});
    setStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    };

    console.log('Form data:', data);

    // Validate with zod
    const result = contactSchema.safeParse(data);
    console.log('Validation result:', result);
    
    if (!result.success) {
      console.log('Validation failed:', result.error);
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      if (result.error?.errors) {
        result.error.errors.forEach((error) => {
          const field = error.path[0] as keyof ContactFormData;
          fieldErrors[field] = error.message;
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

  const getInputClasses = (fieldName: keyof ContactFormData) => `
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
              Messaggio <span className="text-nhero-gold">*</span>
            </label>
            <textarea
              id="modal-message"
              name="message"
              rows={4}
              placeholder="Come possiamo aiutarti?"
              className={`${getInputClasses('message')} resize-none`}
            />
            {errors.message && <p className={errorClasses}>{errors.message}</p>}
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 p-3 bg-nhero-cream/10 border border-nhero-cream/30 text-nhero-cream"
              >
                <Check className="w-5 h-5 flex-shrink-0 text-nhero-gold" />
                <span className="text-sm">Messaggio inviato con successo!</span>
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
                <span className="text-sm">Errore nell&apos;invio. Riprova.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-nhero-cream text-nhero-green font-medium uppercase tracking-wide text-sm transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Invio in corso...
              </span>
            ) : (
              'Invia Messaggio'
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
