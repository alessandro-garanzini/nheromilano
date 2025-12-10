import { getTranslations } from 'next-intl/server';
import { getExperiences, getActiveAvvisi, getPageBySlug } from '@/lib/directus';
import { getOptimizedImageUrl } from '@/lib/directus';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
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
        <Section background="cream" padding="medium">
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
      <Section id="esperienze" background="vanilla">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-nhero-gold text-sm uppercase tracking-wider mb-4">
              Le nostre esperienze
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-nhero-charcoal mb-6">
              {t('title')}
            </h2>
            <p className="text-muted text-lg">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {experiences.map((experience) => {
              const imageUrl = experience.hero_image
                ? getOptimizedImageUrl(
                    typeof experience.hero_image === 'string' 
                      ? experience.hero_image 
                      : experience.hero_image.id,
                    800
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
                    variant="overlay"
                    imageHeight="aspect-[3/4]"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="charcoal" padding="large">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
              Prenota la tua esperienza
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Vieni a scoprire il meglio della cucina italiana in un ambiente elegante e accogliente
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Button href={`/${locale}/business`} variant="primary" size="large">
                Business
              </Button>
              <Button href={`/${locale}/contatti`} variant="outline" size="large">
                Contattaci
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

