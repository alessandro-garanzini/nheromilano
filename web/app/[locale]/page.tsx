import { getTranslations } from 'next-intl/server';
import { getExperiences, getActiveAvvisi, getPageBySlug } from '@/lib/directus';
import { getOptimizedImageUrl, getDirectusAssetUrl } from '@/lib/directus';
import Hero from '@/components/ui/Hero';
import ExperiencesSection from '@/components/ExperiencesSection';
import BusinessSection from '@/components/BusinessSection';
import EventiSection from '@/components/EventiSection';
import AvvisiModal from '@/components/AvvisiModal';

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

  const avvisiWithImages = avvisi.map((avviso) => ({
    id: avviso.id,
    titolo: avviso.titolo,
    descrizione: avviso.descrizione,
    imageUrl: avviso.foto
      ? getDirectusAssetUrl(
          typeof avviso.foto === 'string' ? avviso.foto : avviso.foto.id
        )
      : null,
    cta_label: avviso.cta_label,
    cta_url: avviso.cta_url,
  }));

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={homePage?.hero_title || "Nhero Milano"}
        subtitle={homePage?.hero_subtitle || "Bar · Ristorante · Bakery · Pizzeria"}
        image={heroImage}
        height="full"
      />

      {/* Avvisi Modal */}
      <AvvisiModal avvisi={avvisiWithImages} />

      {/* Experiences Section */}
      <ExperiencesSection
        experiences={experiences}
        title={t('title')}
      />

      {/* Business Section */}
      <BusinessSection />

      {/* Eventi Section */}
      <EventiSection />

    </>
  );
}

