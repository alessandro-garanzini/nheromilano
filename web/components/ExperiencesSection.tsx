"use client";

import { BlurFade } from "@/components/ui/BlurFade";
import type { Experience } from "@/types/directus";

interface ExperiencesSectionProps {
  experiences: Experience[];
  title: string;
}

function stripHtmlAndDecode(html: string): string {
  // First strip HTML tags
  const stripped = html.replace(/<[^>]*>/g, "").trim();
  // Then decode HTML entities like &agrave; -> à
  return stripped
    .replace(/&agrave;/g, "à")
    .replace(/&egrave;/g, "è")
    .replace(/&igrave;/g, "ì")
    .replace(/&ograve;/g, "ò")
    .replace(/&ugrave;/g, "ù")
    .replace(/&Agrave;/g, "À")
    .replace(/&Egrave;/g, "È")
    .replace(/&Igrave;/g, "Ì")
    .replace(/&Ograve;/g, "Ò")
    .replace(/&Ugrave;/g, "Ù")
    .replace(/&aacute;/g, "á")
    .replace(/&eacute;/g, "é")
    .replace(/&iacute;/g, "í")
    .replace(/&oacute;/g, "ó")
    .replace(/&uacute;/g, "ú")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export default function ExperiencesSection({
  experiences,
  title,
}: ExperiencesSectionProps) {
  return (
    <section
      id="esperienze"
      className="pt-16 pb-16 md:pt-24 md:pb-24 bg-nhero-green"
    >
      <div className="px-6 md:px-12 lg:px-16">
        {/* Experiences Grid */}
        <div className="grid gap-16 md:gap-24 lg:gap-32">
          {experiences.map((experience, index) => {
            const imageId =
              typeof experience.hero_image === "string"
                ? experience.hero_image
                : experience.hero_image?.id;
            const imageUrl = imageId
              ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${imageId}?width=1200&quality=80&format=auto&fit=cover`
              : null;

            const isEven = index % 2 === 0;

            return (
              <BlurFade
                key={experience.id}
                delay={0.1 * (index + 1)}
                inView
                inViewMargin="-100px"
              >
                <div
                  className={`grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-20 items-start ${
                    isEven ? "" : "md:[direction:rtl]"
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] md:aspect-[4/3] overflow-hidden md:[direction:ltr]">
                    {imageUrl && (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      />
                    )}
                    <div className="absolute inset-0 bg-nhero-charcoal/20" />
                  </div>

                  {/* Content */}
                  <div className="md:[direction:ltr] space-y-4 md:space-y-6 md:pt-0">

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-nhero-cream uppercase tracking-wide mb-2">
                        {experience.title}
                      </h3>
                      {/* {experience.subtitle && (
                        <p className="text-nhero-cream/60 text-sm md:text-base uppercase tracking-wider">
                          {experience.subtitle}
                        </p>
                      )} */}
                    </div>

                    {/* Description - Full text */}
                    {experience.description && (
                      <p className="text-nhero-cream/70 text-sm md:text-base leading-relaxed uppercase tracking-wide">
                        {stripHtmlAndDecode(experience.description)}
                      </p>
                    )}
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
