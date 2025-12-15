import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ExternalLink, Linkedin } from 'lucide-react';
import Link from 'next/link';
import ContactModal from '@/components/ContactModal';
import { getGlobals } from '@/lib/directus';
import type { OpeningHour } from '@/types/directus';

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

  const openingHours: OpeningHour[] = globals?.opening_hours || [];
  const phoneHref = globals?.phone ? `tel:${globals.phone.replace(/\s+/g, '')}` : undefined;
  const emailHref = globals?.email ? `mailto:${globals.email}` : undefined;

  const InfoRow = ({
    icon,
    label,
    value,
    href,
  }: {
    icon: ReactNode;
    label: string;
    value?: string;
    href?: string;
  }) => {
    if (!value) return null;
    const content = (
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-nhero-cream">
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.18em] text-nhero-cream/70">{label}</p>
          <p className="text-lg font-medium leading-snug text-nhero-cream">{value}</p>
        </div>
      </div>
    );

    if (href) {
      return (
        <Link href={href} className="block transition-opacity duration-150 hover:opacity-80" prefetch={false}>
          {content}
        </Link>
      );
    }

    return content;
  };

  return (
    <div className="min-h-screen bg-nhero-green text-nhero-cream">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-14 lg:flex-row lg:items-start lg:gap-16 lg:pb-20 lg:pt-20">
        <div className="flex-1 space-y-10">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.18em] text-nhero-cream/70">{t('title')}</p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl uppercase">Siamo qui per te</h1>
            {globals?.tagline && <p className="text-base text-nhero-cream/75">{globals.tagline}</p>}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {phoneHref && (
              <Link
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 bg-nhero-cream px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-nhero-green transition-transform duration-150 hover:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nhero-cream/60"
                prefetch={false}
              >
                <Phone size={16} />
                Chiama
              </Link>
            )}

            <ContactModal
              trigger={
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-nhero-cream underline underline-offset-4 transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nhero-cream/60"
                  type="button"
                >
                  {t('form.title')}
                </button>
              }
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <InfoRow icon={<MapPin size={18} />} label={t('address')} value={globals?.address} href={globals?.google_maps_url} />
            <InfoRow icon={<Phone size={18} />} label={t('phone')} value={globals?.phone} href={phoneHref} />
            <InfoRow icon={<Mail size={18} />} label={t('email')} value={globals?.email} href={emailHref} />
            {globals?.reservation_url && (
              <InfoRow
                icon={<ExternalLink size={18} />}
                label="Prenotazioni"
                value="Prenota ora"
                href={globals.reservation_url}
              />
            )}
          </div>

          {openingHours.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-nhero-cream/70">
                <Clock size={18} />
                <span>{t('hours')}</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {openingHours.map((hour, index) => (
                  <div key={`${hour.day}-${index}`} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm font-medium">
                    <span className="capitalize text-nhero-cream/85">{dayTranslations[hour.day] || hour.day}</span>
                    <span className="text-nhero-cream">{hour.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(globals?.instagram || globals?.facebook) && (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-nhero-cream/70">Social</p>
              <div className="flex flex-wrap gap-3">
                {globals.instagram && (
                  <Link
                    href={globals.instagram}
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-nhero-cream transition-opacity duration-150 hover:opacity-80"
                    target="_blank"
                    rel="noreferrer"
                    prefetch={false}
                  >
                    <Instagram size={16} /> Instagram
                  </Link>
                )}
                {globals.facebook && (
                  <Link
                    href={globals.facebook}
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-nhero-cream transition-opacity duration-150 hover:opacity-80"
                    target="_blank"
                    rel="noreferrer"
                    prefetch={false}
                  >
                    <Facebook size={16} /> Facebook
                  </Link>
                )}
                {globals.linkedin && (
                  <Link
                    href={globals.linkedin}
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-nhero-cream transition-opacity duration-150 hover:opacity-80"
                    target="_blank"
                    rel="noreferrer"
                    prefetch={false}
                  >
                    <Linkedin size={16} /> Linkedin
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-xl flex-1 overflow-hidden rounded-2xl bg-white/5">
          <div className="h-[420px] w-full border-0 bg-nhero-green sm:h-[320px] lg:h-[520px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.461884722399!2d9.197150876585873!3d45.48064287107428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6c6f7c65fdd%3A0x5a84c8d3767e3d4b!2sNhero%20Milano!5e0!3m2!1sit!2sit!4v1765793505354!5m2!1sit!2sit"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa Nhero Milano"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
