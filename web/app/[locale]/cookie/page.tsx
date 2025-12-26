import Hero from '@/components/ui/Hero';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('cookie');

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
            {t('section1.desc')}
          </p>

          <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section2.title')}</h2>
          <p className="mb-4 leading-relaxed">
            {t('section2.intro')}
          </p>

          <h3 className="text-xl text-nhero-gold mb-3 mt-6">{t('section2.type1.title')}</h3>
          <p className="mb-4 leading-relaxed">
            {t('section2.type1.desc')}
          </p>
          <ul className="mb-4 space-y-2 list-disc list-inside">
            <li><strong className="text-nhero-gold">{t('section2.type1.cookie1')}:</strong> {t('section2.type1.cookie1desc')}</li>
            <li><strong className="text-nhero-gold">{t('section2.type1.cookie2')}:</strong> {t('section2.type1.cookie2desc')}</li>
          </ul>
          <p className="text-sm opacity-80 italic mb-6">
            {t('section2.type1.note')}
          </p>

          <h3 className="text-xl text-nhero-gold mb-3 mt-6">{t('section2.type2.title')}</h3>
          <p className="mb-4 leading-relaxed">
            {t('section2.type2.desc')}
          </p>
          <div className="bg-nhero-green/20 p-6 rounded-lg my-6 border border-nhero-gold/20">
            <h4 className="text-base font-semibold mb-3 text-nhero-gold">{t('section2.type2.service1.name')}</h4>
            <p className="text-sm mb-2 leading-relaxed">
              <strong className="text-nhero-gold">{t('section2.type2.service1.provider')}:</strong> Dish ApS (Denmark)<br />
              <strong className="text-nhero-gold">{t('section2.type2.service1.purpose')}:</strong> {t('section2.type2.service1.purposeDesc')}<br />
              <strong className="text-nhero-gold">{t('section2.type2.service1.url')}:</strong>{' '}
              <a href="https://reservation.dish.co/widget/hydra-d45ad7a0-3933-11ea-a927-092f3aaa170a" target="_blank" rel="noopener noreferrer" className="text-nhero-gold hover:underline break-all">
                reservation.dish.co
              </a><br />
              <strong className="text-nhero-gold">{t('section2.type2.service1.privacy')}:</strong>{' '}
              <a href="https://dish.co/privacy" target="_blank" rel="noopener noreferrer" className="text-nhero-gold hover:underline">
                dish.co/privacy
              </a>
            </p>
            <p className="text-sm opacity-80 italic">
              {t('section2.type2.service1.note')}
            </p>
          </div>

          <h3 className="text-xl text-nhero-gold mb-3 mt-6">{t('section2.type3.title')}</h3>
          <p className="mb-6 leading-relaxed">
            {t('section2.type3.desc')}
          </p>

          <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section3.title')}</h2>
          <p className="mb-4 leading-relaxed">
            {t('section3.intro')}
          </p>
          <ul className="mb-6 space-y-2 list-disc list-inside">
            <li><strong className="text-nhero-gold">{t('section3.duration1')}:</strong> {t('section3.duration1desc')}</li>
            <li><strong className="text-nhero-gold">{t('section3.duration2')}:</strong> {t('section3.duration2desc')}</li>
          </ul>

          <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section4.title')}</h2>
          <p className="mb-4 leading-relaxed">
            {t('section4.intro')}
          </p>
          <div className="bg-nhero-green/20 p-6 rounded-lg border border-nhero-gold/20 my-6">
            <h3 className="text-base font-semibold mb-4 text-nhero-gold">{t('section4.browsers')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <strong className="text-nhero-gold">Chrome:</strong> {t('section4.chrome')}
              </li>
              <li>
                <strong className="text-nhero-gold">Firefox:</strong> {t('section4.firefox')}
              </li>
              <li>
                <strong className="text-nhero-gold">Safari:</strong> {t('section4.safari')}
              </li>
              <li>
                <strong className="text-nhero-gold">Edge:</strong> {t('section4.edge')}
              </li>
            </ul>
          </div>

          <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section5.title')}</h2>
          <p className="mb-6 leading-relaxed">
            {t('section5.desc')}
          </p>

          <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section6.title')}</h2>
          <p className="mb-6 leading-relaxed">
            {t('section6.desc')}
          </p>

          <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section7.title')}</h2>
          <p className="mb-6 leading-relaxed">
            {t('section7.desc1')}{' '}
            <Link href={`/${locale}/privacy`} className="text-nhero-gold hover:underline">{t('section7.privacyLink')}</Link>{' '}
            {t('section7.desc2')}
          </p>

          <h2 className="text-2xl text-nhero-gold mb-4 mt-8">{t('section8.title')}</h2>
          <p className="mb-6 leading-relaxed">
            Per domande riguardanti questa Cookie Policy, contattaci all'indirizzo{' '}
            <a href="/contatti" className="text-nhero-gold hover:underline">pagina contatti</a>.
          </p>

          <p className="text-sm opacity-80 mt-8">
            Ultimo aggiornamento: Dicembre 2025
          </p>
        </div>
      </div>
    </>
  );
}
