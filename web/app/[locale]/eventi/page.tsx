import { getTranslations } from 'next-intl/server';
import { getEvents } from '@/lib/directus';
import { getOptimizedImageUrl } from '@/lib/directus';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export default async function EventiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('events');
  const events = await getEvents(false); // Only upcoming events

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Hero
        title={t('title')}
        subtitle={t('upcoming')}
        height="medium"
      />

      <Section padding="large">
        <div className="container">
          {events.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted text-lg">
                Nessun evento in programma al momento
              </p>
              <p className="text-muted mt-2">
                Seguici sui social per rimanere aggiornato
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {events.map((event, index) => {
                const imageUrl = event.cover_image
                  ? getOptimizedImageUrl(
                      typeof event.cover_image === 'string' 
                        ? event.cover_image 
                        : event.cover_image.id,
                      800
                    )
                  : null;

                return (
                  <article 
                    key={event.id}
                    className="group grid md:grid-cols-2 gap-0 bg-white border border-nhero-cream overflow-hidden hover:border-nhero-gold/30 transition-colors duration-300"
                  >
                    {imageUrl && (
                      <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-muted mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-nhero-gold" />
                          <span>{formatDate(event.date_event)}</span>
                        </div>
                        {event.time_start && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-nhero-gold" />
                            <span>
                              {event.time_start}
                              {event.time_end && ` - ${event.time_end}`}
                            </span>
                          </div>
                        )}
                      </div>

                      <h2 className="text-2xl md:text-3xl font-medium text-nhero-charcoal mb-4 tracking-tight">
                        {event.title}
                      </h2>

                      {event.description && (
                        <div 
                          className="prose prose-sm text-muted line-clamp-3 mb-6"
                          dangerouslySetInnerHTML={{ __html: event.description }}
                        />
                      )}

                      <div className="flex gap-4 mt-auto">
                        {event.slug && (
                          <Link 
                            href={`/${locale}/eventi/${event.slug}`}
                            className="inline-flex items-center gap-2 text-nhero-charcoal font-medium hover:text-nhero-gold transition-colors"
                          >
                            <span>Scopri di più</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                        {event.external_link && (
                          <a 
                            href={event.external_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Button variant="primary" size="small">
                              {t('bookNow')}
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
