import { notFound } from 'next/navigation';
import { getEvents, getEventBySlug } from '@/lib/directus';
import { getOptimizedImageUrl } from '@/lib/directus';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import DirectusImage from '@/components/DirectusImage';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Calendar, Clock, ExternalLink, ArrowLeft } from 'lucide-react';

export const revalidate = 60;

export async function generateStaticParams() {
  const events = await getEvents(true); // Include all events
  return events
    .filter((event) => event.slug)
    .map((event) => ({
      slug: event.slug!,
    }));
}

export default async function EventDetailPage({
  params
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const heroImage = event.cover_image
    ? getOptimizedImageUrl(
        typeof event.cover_image === 'string' 
          ? event.cover_image 
          : event.cover_image.id,
        1920
      )
    : null;

  const gallery = Array.isArray(event.gallery) ? event.gallery : [];

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
        title={event.title}
        image={heroImage}
        height="large"
      >
        {event.external_link && (
          <a 
            href={event.external_link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="large">
              <span className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Prenota Ora
              </span>
            </Button>
          </a>
        )}
      </Hero>

      {/* Back Link */}
      <Section padding="small">
        <div className="container">
          <Link 
            href={`/${locale}/eventi`}
            className="inline-flex items-center gap-2 text-muted hover:text-nhero-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tutti gli eventi</span>
          </Link>
        </div>
      </Section>

      {/* Event Details */}
      <Section padding="large">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-6 mb-10 pb-10 border-b border-nhero-cream">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-nhero-cream flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-nhero-gold" />
                </div>
                <span className="text-nhero-charcoal font-medium">{formatDate(event.date_event)}</span>
              </div>
              {event.time_start && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-nhero-cream flex items-center justify-center">
                    <Clock className="w-5 h-5 text-nhero-gold" />
                  </div>
                  <span className="text-nhero-charcoal font-medium">
                    {event.time_start}
                    {event.time_end && ` - ${event.time_end}`}
                  </span>
                </div>
              )}
            </div>

            {event.description && (
              <div 
                className="prose prose-lg"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            )}
          </div>
        </div>
      </Section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <Section background="cream" padding="large">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-sm uppercase tracking-[0.2em] text-nhero-gold font-medium">
                Galleria
              </span>
              <h2 className="text-3xl font-medium mt-3 text-nhero-charcoal tracking-tight">
                Immagini
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {gallery.map((image, index) => {
                const imageId = typeof image === 'string' ? image : image.id;
                const imageUrl = getOptimizedImageUrl(imageId, 800);
                
                return imageUrl ? (
                  <div 
                    key={index} 
                    className="relative aspect-square overflow-hidden group"
                  >
                    <DirectusImage
                      src={imageId}
                      alt={`${event.title} - Image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      width={800}
                    />
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </Section>
      )}

      {/* CTA */}
      {event.external_link && (
        <Section background="charcoal" padding="large">
          <div className="container text-center">
            <span className="text-sm uppercase tracking-[0.2em] text-nhero-gold font-medium">
              Prenotazione
            </span>
            <h2 className="text-3xl font-medium mt-3 text-white tracking-tight">
              Non perdere questo evento!
            </h2>
            <div className="mt-8">
              <a 
                href={event.external_link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="large">
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    Prenota il tuo posto
                  </span>
                </Button>
              </a>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
