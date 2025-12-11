import { notFound } from 'next/navigation';
import { getExperiences, getExperienceBySlug } from '@/lib/directus';
import { getOptimizedImageUrl } from '@/lib/directus';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import DirectusImage from '@/components/DirectusImage';
import Button from '@/components/ui/Button';
import type { DirectusFile } from '@/types/directus';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

export async function generateStaticParams() {
  const experiences = await getExperiences();
  return experiences.map((exp) => ({
    slug: exp.slug,
  }));
}

export default async function ExperiencePage({
  params
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const heroImage = experience.hero_image
    ? getOptimizedImageUrl(
        typeof experience.hero_image === 'string' 
          ? experience.hero_image 
          : experience.hero_image.id,
        1920
      )
    : null;

  const gallery = Array.isArray(experience.gallery) 
    ? experience.gallery 
    : [];

  return (
    <>
      <Hero
        title={experience.title}
        subtitle={experience.subtitle}
        image={heroImage}
        height="large"
      >
        <Button href={`/${locale}/menu`} variant="primary" size="large">
          Vedi il Menu
        </Button>
      </Hero>

      {/* Back Link */}
      <Section padding="small">
        <div className="container">
          <Link 
            href={`/${locale}/esperienze`}
            className="inline-flex items-center gap-2 text-muted hover:text-nhero-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tutte le esperienze</span>
          </Link>
        </div>
      </Section>

      {/* Description */}
      {experience.description && (
        <Section padding="large">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div 
                className="prose prose-lg"
                dangerouslySetInnerHTML={{ __html: experience.description }}
              />
            </div>
          </div>
        </Section>
      )}

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
                      alt={`${experience.title} - Image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section background="charcoal" padding="large">
        <div className="container text-center">
          <span className="text-sm uppercase tracking-[0.2em] text-nhero-gold font-medium">
            Visita
          </span>
          <h2 className="text-3xl font-medium mt-3 text-white tracking-tight">
            Prenota la tua esperienza
          </h2>
          <div className="flex gap-4 flex-wrap justify-center mt-8">
            <Button href={`/${locale}/menu`} variant="primary" size="large">
              Vedi il Menu
            </Button>
            <Button href={`/${locale}/contatti`} variant="outline" size="large">
              Contattaci
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
