import { getTranslations } from 'next-intl/server';
import { getMenuItems, getMenuCategories } from '@/lib/directus';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import MenuGrid from '@/components/MenuGrid';

export const revalidate = 60;

export default async function MenuPage() {
  const t = await getTranslations('menu');
  const [items, categories] = await Promise.all([
    getMenuItems(),
    getMenuCategories()
  ]);

  return (
    <>
      <Hero
        title={t('title')}
        subtitle="I nostri piatti e bevande"
        height="small"
      />

      <Section background="vanilla" padding="large">
        <div className="container">
          <MenuGrid items={items} categories={categories} />
        </div>
      </Section>
    </>
  );
}
