import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import Link from 'next/link';

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <>
      <Hero
        title="Privacy Policy"
        height="small"
      />

      <Section padding="large">
        <div className="container">
          <div className="max-w-3xl mx-auto prose">
            <h2>Informativa sulla Privacy</h2>
            
            <p>
              In conformità con il Regolamento UE 2016/679 (GDPR), la presente informativa descrive
              come Nhero Milano raccoglie, utilizza e protegge i dati personali.
            </p>

            <h3>1. Titolare del Trattamento</h3>
            <p>
              Nhero Milano<br />
              [Indirizzo completo]<br />
              Email: [email]
            </p>

            <h3>2. Dati Raccolti</h3>
            <p>
              I dati personali che possiamo raccogliere includono:
            </p>
            <ul>
              <li>Nome e cognome</li>
              <li>Indirizzo email</li>
              <li>Numero di telefono</li>
              <li>Informazioni aziendali (per richieste business)</li>
            </ul>

            <h3>3. Finalità del Trattamento</h3>
            <p>
              I dati vengono trattati per le seguenti finalità:
            </p>
            <ul>
              <li>Rispondere alle richieste di contatto</li>
              <li>Gestire prenotazioni ed eventi</li>
              <li>Fornire servizi business</li>
              <li>Migliorare la qualità del servizio</li>
            </ul>

            <h3>4. Base Giuridica</h3>
            <p>
              Il trattamento dei dati è basato sul consenso dell'interessato e sull'esecuzione
              di misure precontrattuali o contrattuali.
            </p>

            <h3>5. Conservazione dei Dati</h3>
            <p>
              I dati personali vengono conservati per il tempo necessario alle finalità per cui
              sono stati raccolti e in conformità con gli obblighi di legge.
            </p>

            <h3>6. Diritti dell'Interessato</h3>
            <p>
              L'interessato ha il diritto di:
            </p>
            <ul>
              <li>Accedere ai propri dati personali</li>
              <li>Rettificare dati inesatti</li>
              <li>Richiedere la cancellazione dei dati</li>
              <li>Opporsi al trattamento</li>
              <li>Richiedere la portabilità dei dati</li>
              <li>Revocare il consenso in qualsiasi momento</li>
            </ul>

            <h3>7. Sicurezza</h3>
            <p>
              Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali
              da accessi non autorizzati, perdita o distruzione.
            </p>

            <h3>8. Cookie</h3>
            <p>
              Per informazioni sui cookie utilizzati, consultare la nostra{' '}
              <Link href={`/${locale}/cookie`} className="text-nhero-gold hover:underline">Cookie Policy</Link>.
            </p>

            <h3>9. Modifiche</h3>
            <p>
              Ci riserviamo il diritto di modificare questa informativa. Le modifiche saranno
              pubblicate su questa pagina.
            </p>

            <p className="text-sm text-muted mt-12">
              Ultimo aggiornamento: Dicembre 2025
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
