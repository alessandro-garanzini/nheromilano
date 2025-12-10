import { getTranslations } from 'next-intl/server';
import { getExperiences } from '@/lib/directus';
import { getOptimizedImageUrl } from '@/lib/directus';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Link from 'next/link';

export const revalidate = 60;

export default async function EsperienzePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('experiences');
  const experiences = await getExperiences();

  return (
    <>
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        height="medium"
      />

      <Section background="vanilla" padding="large">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            {experiences.map((experience) => {
              const imageUrl = experience.hero_image
                ? getOptimizedImageUrl(
                    typeof experience.hero_image === 'string' 
                      ? experience.hero_image 
                      : experience.hero_image.id,
                    1000
                  )
                : null;

              return (
                <Link
                  key={experience.id}
                  href={`/${locale}/esperienze/${experience.slug}`}
                  className="group"
                >
                  <Card
                    title={experience.title}
                    description={experience.subtitle}
                    image={imageUrl}
                    variant="hover"
                    imageHeight="aspect-[16/10]"
                  >
                    <div 
                      className="prose prose-sm line-clamp-3"
                      dangerouslySetInnerHTML={{ 
                        __html: experience.description || '' 
                      }}
                    />
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
