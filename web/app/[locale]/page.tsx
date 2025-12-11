import { getTranslations } from 'next-intl/server';
import { getExperiences, getActiveAvvisi, getPageBySlug } from '@/lib/directus';
import { getOptimizedImageUrl } from '@/lib/directus';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import DirectusImage from '@/components/DirectusImage';
import Link from 'next/link';

export const revalidate = 60;

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('experiences');
  const experiences = await getExperiences();
  const avvisi = await getActiveAvvisi();
  const homePage = await getPageBySlug('home');
  
  const heroImage = homePage?.hero_image 
    ? getOptimizedImageUrl(
        typeof homePage.hero_image === 'string' ? homePage.hero_image : homePage.hero_image.id,
        1920
      )
    : null;

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={homePage?.hero_title || "Nhero Milano"}
        subtitle={homePage?.hero_subtitle || "Bar · Ristorante · Bakery · Pizzeria"}
        image={heroImage}
        height="full"
      />


      {/* Avvisi Section */}
      {avvisi.length > 0 && (
        <Section background="transparent" padding="medium">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {avvisi.map((avviso) => {
                const imageUrl = avviso.foto 
                  ? getOptimizedImageUrl(
                      typeof avviso.foto === 'string' ? avviso.foto : avviso.foto.id,
                      600
                    )
                  : null;

                return (
                  <Card
                    key={avviso.id}
                    title={avviso.titolo}
                    image={imageUrl}
                    variant="hover"
                  >
                    <div 
                      className="prose prose-sm"
                      dangerouslySetInnerHTML={{ __html: avviso.descrizione }}
                    />
                  </Card>
                );
              })}
            </div>
          </div>
        </Section>
      )}

      {/* Experiences Section */}
      <Section id="esperienze" background="transparent">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-nhero-gold text-sm uppercase tracking-wider mb-4">
              Le nostre esperienze
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-white/80 text-lg">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {experiences.map((experience) => {
              const imageId = typeof experience.hero_image === 'string' 
                ? experience.hero_image 
                : experience.hero_image?.id;
              const imageUrl = imageId 
                ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${imageId}?width=800&quality=75&format=auto&fit=cover`
                : null;
              
              return (
                <Link
                  key={experience.id}
                  href={`/${locale}/esperienze/${experience.slug}`}
                  className="group block"
                >
                  <div 
                    className="relative aspect-[3/4] overflow-hidden bg-nhero-charcoal bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]"
                    style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
                  >
                    <div className="absolute inset-0 image-overlay flex items-end p-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-medium text-white">
                          {experience.title}
                        </h3>
                        {experience.subtitle && (
                          <p className="text-white/70 mt-2 text-sm">
                            {experience.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

    </>
  );
}

