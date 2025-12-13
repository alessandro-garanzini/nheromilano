import { getTranslations } from 'next-intl/server';
import { getExperiences, getActiveAvvisi, getPageBySlug } from '@/lib/directus';
import { getOptimizedImageUrl } from '@/lib/directus';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import ExperiencesSection from '@/components/ExperiencesSection';

export const revalidate = 60;

export default async function HomePage() {
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
      <ExperiencesSection
        experiences={experiences}
        title={t('title')}
      />

    </>
  );
}

