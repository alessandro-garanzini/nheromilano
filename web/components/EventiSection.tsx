"use client";

import { BlurFade } from "@/components/ui/BlurFade";
import Link from "next/link";

export default function EventiSection() {
  return (
    <section className="py-20 md:py-32 bg-nhero-green">
      <div className="px-6 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <BlurFade delay={0.1} inView inViewMargin="-100px">
            <div className="space-y-8">
              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-nhero-cream uppercase tracking-wide">
                Eventi
              </h2>

              {/* Content */}
              <div className="space-y-6">
                <p className="text-nhero-cream/70 text-sm md:text-base leading-relaxed uppercase tracking-wide">
                  Lo stile contemporaneo ed internazionale degli interni di Nhero rende la struttura la location ideale per ospitare feste di compleanno, decadi, lauree ed eventi aziendali.
                </p>

                <p className="text-nhero-cream/70 text-sm md:text-base leading-relaxed uppercase tracking-wide">
                  Gli spazi eleganti e accoglienti sono inoltre completati dalla presenza di due dehors.
                </p>

                <p className="text-nhero-cream/70 text-sm md:text-base leading-relaxed uppercase tracking-wide">
                  Il primo accomoda fino a novanta persone, comprende la presenza di un barman privato ed è regolabile a livello di climatizzazione per garantire un servizio sempre piacevole tutto l&apos;anno.
                </p>

                <p className="text-nhero-cream/70 text-sm md:text-base leading-relaxed uppercase tracking-wide">
                  Per gli ospiti che volessero invece vivere un&apos;esperienza più intima è disponibile anche un secondo dehors, rivolto a gruppi di non oltre 25 persone.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Link
                  href="/contatti"
                  className="inline-flex items-center justify-center px-8 py-4 bg-nhero-cream text-nhero-green font-medium uppercase tracking-wide text-sm transition-all duration-300 hover:opacity-90"
                >
                  Richiedi informazioni
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
