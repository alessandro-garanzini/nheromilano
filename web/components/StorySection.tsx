import { BlurFade } from "./ui/BlurFade";

export default function StorySection() {
  return (
    <BlurFade
      delay={0.25}
      inView
      inViewMargin="-100px"
    >
      <section className="py-16 md:py-24 bg-nhero-green">
        <div className="px-4 md:px-12 lg:px-16 max-w-4xl mx-auto">
          <div className="space-y-6 text-nhero-cream">
            <p className="text-base md:text-lg leading-relaxed">
              La storia di Nhero Milano risale a ben 18 anni fa quando Bruno e Massimo,
              proprietari di un baretto di quartiere di nome Diamond, iniziano a fiutare
              un'aria di cambiamento presagita dalla forte evoluzione culturale ed edilizia
              della zona.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Decidono di innovare la propria attività che, con il tempo, assume la sua
              forma odierna consistente di una pizzeria, un lounge bar, un bistrot e una
              pasticceria all'interno di un'ampia e moderna location, distinta dalla massima
              cura per i dettagli.
            </p>
          </div>
        </div>
      </section>
    </BlurFade>
      );
}
