import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';

export default function CookiePage() {
  return (
    <>
      <Hero
        title="Cookie Policy"
        height="small"
      />

      <Section background="vanilla">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>Informativa sui Cookie</h2>
            
            <p>
              Questa pagina fornisce informazioni dettagliate sull'uso dei cookie su questo sito web
              e su come gestirli.
            </p>

            <h3>Cosa sono i Cookie</h3>
            <p>
              I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo
              dell'utente quando visita un sito web. Vengono utilizzati per migliorare
              l'esperienza di navigazione e fornire funzionalità specifiche.
            </p>

            <h3>Tipologie di Cookie Utilizzati</h3>

            <h4>1. Cookie Tecnici (Necessari)</h4>
            <p>
              Questi cookie sono essenziali per il corretto funzionamento del sito e non possono
              essere disabilitati. Includono:
            </p>
            <ul>
              <li>Cookie di sessione</li>
              <li>Cookie per la selezione della lingua</li>
              <li>Cookie di sicurezza</li>
            </ul>

            <h4>2. Cookie Analitici</h4>
            <p>
              Utilizziamo cookie analitici per comprendere come i visitatori interagiscono con
              il sito e migliorare l'esperienza utente. Questi dati sono raccolti in forma
              aggregata e anonima.
            </p>

            <h4>3. Cookie di Terze Parti</h4>
            <p>
              Alcuni servizi di terze parti utilizzati sul sito possono impostare i propri cookie:
            </p>
            <ul>
              <li>Google Maps (per la visualizzazione della mappa)</li>
              <li>Servizi di prenotazione online</li>
            </ul>

            <h3>Gestione dei Cookie</h3>
            <p>
              Puoi gestire le preferenze dei cookie attraverso le impostazioni del tuo browser:
            </p>
            <ul>
              <li>
                <strong>Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti
              </li>
              <li>
                <strong>Firefox:</strong> Opzioni → Privacy e sicurezza → Cookie e dati dei siti web
              </li>
              <li>
                <strong>Safari:</strong> Preferenze → Privacy → Gestisci i dati dei siti web
              </li>
              <li>
                <strong>Edge:</strong> Impostazioni → Cookie e autorizzazioni sito
              </li>
            </ul>

            <h3>Durata dei Cookie</h3>
            <p>
              I cookie possono essere:
            </p>
            <ul>
              <li><strong>Di sessione:</strong> vengono eliminati quando chiudi il browser</li>
              <li><strong>Persistenti:</strong> rimangono memorizzati fino alla scadenza o cancellazione manuale</li>
            </ul>

            <h3>Disabilitazione dei Cookie</h3>
            <p>
              Puoi disabilitare l'uso dei cookie, ma ciò potrebbe limitare alcune funzionalità
              del sito. La disabilitazione dei cookie tecnici necessari potrebbe impedire
              l'accesso a determinate aree del sito.
            </p>

            <h3>Aggiornamenti</h3>
            <p>
              Questa Cookie Policy può essere aggiornata periodicamente. Ti invitiamo a
              consultare regolarmente questa pagina per rimanere informato.
            </p>

            <h3>Contatti</h3>
            <p>
              Per domande riguardanti questa Cookie Policy, contattaci all'indirizzo{' '}
              <a href="/contatti">pagina contatti</a>.
            </p>

            <p className="text-sm text-nhero-green/60 mt-8">
              Ultimo aggiornamento: Dicembre 2025
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
