import { getTranslations } from 'next-intl/server';
import { getBusinessServices } from '@/lib/directus';
import { getOptimizedImageUrl } from '@/lib/directus';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import BusinessQuoteForm from '@/components/forms/BusinessQuoteForm';
import { Building2, Users, Utensils, CalendarDays } from 'lucide-react';

export const revalidate = 60;

const serviceIcons: Record<string, React.ReactNode> = {
  fidelity: <Building2 className="w-6 h-6" />,
  catering: <Utensils className="w-6 h-6" />,
  events: <CalendarDays className="w-6 h-6" />,
  meeting: <Users className="w-6 h-6" />,
};

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('business');
  const services = await getBusinessServices();

  return (
    <>
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        height="medium"
      />

      {/* Services Grid */}
      <Section padding="large">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-nhero-gold font-medium">
              Soluzioni
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mt-3 text-nhero-charcoal tracking-tight">
              {t('services')}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => {
              const imageUrl = service.image
                ? getOptimizedImageUrl(
                    typeof service.image === 'string' 
                      ? service.image 
                      : service.image.id,
                    600
                  )
                : null;

              return (
                <div 
                  key={service.id}
                  className="group relative bg-white border border-nhero-cream overflow-hidden hover:border-nhero-gold/30 transition-colors duration-300"
                >
                  {imageUrl && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-xl font-medium text-nhero-charcoal mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Quote Form Section */}
      <Section background="cream" padding="large">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm uppercase tracking-[0.2em] text-nhero-gold font-medium">
                Contattaci
              </span>
              <h2 className="text-3xl md:text-4xl font-medium mt-3 text-nhero-charcoal tracking-tight">
                {t('requestQuote')}
              </h2>
              <p className="text-muted mt-4">
                Compila il form e ti contatteremo il prima possibile per discutere le tue esigenze
              </p>
            </div>

            <BusinessQuoteForm />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="charcoal" padding="large">
        <div className="container text-center">
          <span className="text-sm uppercase tracking-[0.2em] text-nhero-gold font-medium">
            Partnership
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mt-3 text-white tracking-tight">
            Partner ideale per il tuo business
          </h2>
          <p className="text-white/70 mt-6 max-w-xl mx-auto leading-relaxed">
            Offriamo soluzioni personalizzate per eventi aziendali, catering e fidelizzazione clienti
          </p>
        </div>
      </Section>
    </>
  );
}
