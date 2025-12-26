import Hero from '@/components/ui/Hero';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('privacy');
  
  return (
    <>
      <div className="bg-nhero-green py-16 px-6">
        <div className="max-w-4xl mx-auto text-nhero-cream">
          <h1 className="text-4xl text-nhero-cream mb-8">{t('title')}</h1>
          <p className="text-lg mb-8 leading-relaxed">
            {t('intro')}
          </p>
          <p className="text-sm opacity-80 mb-12">
            {t('lastUpdate')}: 26 dicembre 2025
          </p>

          <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section1.title')}</h2>
          <p className="mb-6 leading-relaxed">
            <strong>RIAL CAFE&apos; S.R.L.</strong><br />
              P.IVA & C.F.: 04338860960<br />
              Sede legale: Via Felice Casati 44, 20124 Milano (MI)<br />
              REA: 1740237<br />
              Email: <a href="mailto:info@nheromilano.it">info@nheromilano.it</a><br />
              Telefono: <a href="tel:+390229537206">+39 02 2953 7206</a>
            </p>

            <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section2.title')}</h2>
            <p className="mb-4 leading-relaxed">
              {t('section2.intro')}
            </p>
            <ul className="mb-6 space-y-2 list-disc list-inside">
              <li><strong className="text-nhero-gold">{t('section2.item1.title')}:</strong> {t('section2.item1.desc')}</li>
              <li><strong className="text-nhero-gold">{t('section2.item2.title')}:</strong> {t('section2.item2.desc')}</li>
              <li><strong className="text-nhero-gold">{t('section2.item3.title')}:</strong> {t('section2.item3.desc')}</li>
            </ul>

            <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section3.title')}</h2>
            <p className="mb-4 leading-relaxed">
              {t('section3.intro')}
            </p>
            <ul className="mb-6 space-y-2 list-disc list-inside">
              <li><strong className="text-nhero-gold">{t('section3.purpose1.title')}:</strong> {t('section3.purpose1.desc')}</li>
              <li><strong className="text-nhero-gold">{t('section3.purpose2.title')}:</strong> {t('section3.purpose2.desc')}</li>
              <li><strong className="text-nhero-gold">{t('section3.purpose3.title')}:</strong> {t('section3.purpose3.desc')}</li>
              <li><strong className="text-nhero-gold">{t('section3.purpose4.title')}:</strong> {t('section3.purpose4.desc')}</li>
            </ul>

            <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section4.title')}</h2>
            <p className="mb-6 leading-relaxed">
              {t('section4.desc')}
            </p>

            <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section5.title')}</h2>
            <p className="mb-4 leading-relaxed">
              {t('section5.intro')}
            </p>
            <ul className="mb-4 space-y-2 list-disc list-inside">
              <li><strong className="text-nhero-gold">{t('section5.storage1.title')}:</strong> {t('section5.storage1.desc')}</li>
              <li><strong className="text-nhero-gold">{t('section5.storage2.title')}:</strong> {t('section5.storage2.desc')}</li>
            </ul>
            <p className="mb-6 leading-relaxed">
              {t('section5.location')}
            </p>

            <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section6.title')}</h2>
            <p className="mb-4 leading-relaxed">
              {t('section6.intro')}
            </p>
            <h3 className="text-xl text-nhero-gold/80 mb-3 mt-6">{t('section6.subtitle1')}</h3>
            <p className="mb-4 leading-relaxed">
              {t('section6.service1.intro')}
            </p>
            <ul className="mb-4 space-y-2 list-disc list-inside">
              <li><strong className="text-nhero-gold">{t('section6.service1.name')}:</strong> {t('section6.service1.desc')}</li>
            </ul>
            <p className="mb-6 leading-relaxed italic opacity-90">
              {t('section6.service1.disclaimer')}
            </p>

            <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section7.title')}</h2>
            <p className="mb-4 leading-relaxed">
              {t('section7.intro')}
            </p>
            <ul className="mb-4 space-y-2 list-disc list-inside">
              <li><strong className="text-nhero-gold">{t('section7.right1')}:</strong> {t('section7.right1desc')}</li>
              <li><strong className="text-nhero-gold">{t('section7.right2')}:</strong> {t('section7.right2desc')}</li>
              <li><strong className="text-nhero-gold">{t('section7.right3')}:</strong> {t('section7.right3desc')}</li>
              <li><strong className="text-nhero-gold">{t('section7.right4')}:</strong> {t('section7.right4desc')}</li>
              <li><strong className="text-nhero-gold">{t('section7.right5')}:</strong> {t('section7.right5desc')}</li>
              <li><strong className="text-nhero-gold">{t('section7.right6')}:</strong> {t('section7.right6desc')}</li>
              <li><strong className="text-nhero-gold">{t('section7.right7')}:</strong> {t('section7.right7desc')}</li>
            </ul>
            <p className="mb-6 leading-relaxed">
              {t('section7.contact')}
            </p>

            <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section8.title')}</h2>
            <p className="mb-6 leading-relaxed">
              {t('section8.desc')}
            </p>

            <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section9.title')}</h2>
            <p className="mb-6 leading-relaxed">
              {t('section9.desc')}
            </p>

            <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section10.title')}</h2>
            <p className="mb-6 leading-relaxed">
              {t('section10.desc1')}{' '}
              <Link href={`/${locale}/cookie`} className="text-nhero-gold hover:underline">{t('section10.cookieLink')}</Link>.
            </p>

            <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section11.title')}</h2>
            <p className="mb-6 leading-relaxed">
              {t('section11.desc')}
            </p>
          </div>
        </div>
    </>
  );
}
