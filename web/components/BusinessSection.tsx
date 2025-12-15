"use client";

import { BlurFade } from "@/components/ui/BlurFade";
import ContactModal from "@/components/ContactModal";

export default function BusinessSection() {
  return (
    <section id="business" className="py-20 md:py-32 bg-nhero-green">
      <div className="px-6 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <BlurFade delay={0.1} inView inViewMargin="-100px">
            <div className="space-y-8">
              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-nhero-cream uppercase tracking-wide">
                Nhero For Business
              </h2>

              {/* Content */}
              <div className="space-y-6">
                <p className="text-nhero-cream/70 text-sm md:text-base leading-relaxed uppercase tracking-wide">
                  Per venire incontro alle necessità di una clientela business, Nhero Milano mette a disposizione delle aziende una serie di innovativi servizi.
                </p>

                <p className="text-nhero-cream/70 text-sm md:text-base leading-relaxed uppercase tracking-wide">
                  Dalle convenzioni per dipendenti, tramite l&apos;emissione di una fidelity card utilizzabile tutto il giorno, alla possibilità di consumare il caffè o il pranzo direttamente in azienda, Nhero si pone come la meta ideale per ospiti sempre in movimento.
                </p>

                <p className="text-nhero-cream/70 text-sm md:text-base leading-relaxed uppercase tracking-wide">
                  Il locale offre anche uno spazio dedicato a eventi aziendali, colazioni e pranzi di lavoro, favorendo i processi di team building e creando un luogo dedicato, capace di rispondere a diverse esigenze lavorative.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <ContactModal
                  trigger={
                    <button className="inline-flex items-center justify-center px-8 py-4 bg-nhero-cream text-nhero-green font-medium uppercase tracking-wide text-sm transition-all duration-300 hover:opacity-90">
                      Richiedi informazioni
                    </button>
                  }
                />
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
