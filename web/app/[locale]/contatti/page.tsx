import { getTranslations } from 'next-intl/server';
import { getGlobals } from '@/lib/directus';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import ContactForm from '@/components/forms/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const revalidate = 60;

export default async function ContattiPage() {
  const t = await getTranslations('contacts');
  const tDays = await getTranslations('days');
  const globals = await getGlobals();

  const dayTranslations: Record<string, string> = {
    monday: tDays('monday'),
    tuesday: tDays('tuesday'),
    wednesday: tDays('wednesday'),
    thursday: tDays('thursday'),
    friday: tDays('friday'),
    saturday: tDays('saturday'),
    sunday: tDays('sunday'),
  };

  return (
    <>
      <Hero
        title={t('title')}
        subtitle="Siamo qui per te"
        height="small"
      />

      <Section background="vanilla" padding="large">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <p className="text-nhero-gold text-sm uppercase tracking-wider mb-4">
                  Informazioni
                </p>
                <h2 className="text-3xl font-medium mb-8 text-nhero-charcoal">
                  Come raggiungerci
                </h2>

                <div className="space-y-6">
                  {globals?.address && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-nhero-cream flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-nhero-gold" size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1 text-nhero-charcoal">{t('address')}</h3>
                        <p className="text-muted">{globals.address}</p>
                        {globals.google_maps_url && (
                          <a
                            href={globals.google_maps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-nhero-gold text-sm mt-2 inline-block hover:text-nhero-charcoal transition-colors"
                          >
                            Vedi su Google Maps →
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {globals?.phone && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-nhero-cream flex items-center justify-center flex-shrink-0">
                        <Phone className="text-nhero-gold" size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1 text-nhero-charcoal">{t('phone')}</h3>
                        <a
                          href={`tel:${globals.phone}`}
                          className="text-muted hover:text-nhero-gold transition-colors"
                        >
                          {globals.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {globals?.email && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-nhero-cream flex items-center justify-center flex-shrink-0">
                        <Mail className="text-nhero-gold" size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1 text-nhero-charcoal">{t('email')}</h3>
                        <a
                          href={`mailto:${globals.email}`}
                          className="text-muted hover:text-nhero-gold transition-colors"
                        >
                          {globals.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {globals?.opening_hours && globals.opening_hours.length > 0 && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-nhero-cream flex items-center justify-center flex-shrink-0">
                        <Clock className="text-nhero-gold" size={18} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-3 text-nhero-charcoal">{t('hours')}</h3>
                        <div className="space-y-2">
                          {globals.opening_hours.map((hour, index) => (
                            <div key={index} className="flex justify-between gap-8 text-sm">
                              <span className="text-nhero-charcoal">
                                {dayTranslations[hour.day] || hour.day}
                              </span>
                              <span className="text-muted">{hour.hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <p className="text-nhero-gold text-sm uppercase tracking-wider mb-4">
                Scrivici
              </p>
              <h2 className="text-3xl font-medium mb-8 text-nhero-charcoal">
                {t('form.title')}
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
