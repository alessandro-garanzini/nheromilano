"use client";

import { BlurFade } from "@/components/ui/BlurFade";
import type { Experience } from "@/types/directus";
import {
  CookingPotIcon,
  PizzaIcon,
  MartiniIcon,
  BreadIcon,
  ForkKnifeIcon,
  type Icon,
} from "@phosphor-icons/react";

interface ExperiencesSectionProps {
  experiences: Experience[];
  title: string;
}

// Map Material Symbols icon names to Phosphor duotone icons
const iconMap: Record<string, Icon> = {
  bakery_dining: BreadIcon,
  restaurant: ForkKnifeIcon,
  local_bar: MartiniIcon,
  local_pizza: PizzaIcon,
  cooking: CookingPotIcon,
};

function getExperienceIcon(iconName?: string): Icon {
  if (!iconName) return ForkKnifeIcon;
  return iconMap[iconName] || ForkKnifeIcon;
}

function stripHtmlAndDecode(html: string): string {
  const stripped = html.replace(/<[^>]*>/g, "").trim();
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
      <div className="px-4 md:px-12 lg:px-16">
        {/* Experiences Grid */}
        <div className="grid gap-12 md:gap-24 lg:gap-32">
          {experiences.map((experience, index) => {
            const imageId =
              typeof experience.hero_image === "string"
                ? experience.hero_image
                : experience.hero_image?.id;
            const imageUrl = imageId
              ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${imageId}?width=1200&quality=80&format=auto&fit=cover`
              : null;

            const isEven = index % 2 === 0;
            const IconComponent = getExperienceIcon(experience.icon);

            return (
              <BlurFade
                key={experience.id}
                delay={0.1 * (index + 1)}
                inView
                inViewMargin="-100px"
              >
                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col -mx-4">
                  {/* Image - Full width, taller */}
                  <div className="relative aspect-[5/4] overflow-hidden mb-5">
                    {imageUrl && (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      />
                    )}
                    <div className="absolute inset-0 bg-nhero-charcoal/20" />
                  </div>

                  {/* Icon + Title + Description - Alternating alignment */}
                  <div
                    className={`flex flex-col px-4 ${isEven ? "items-start" : "items-end"}`}
                  >
                    {/* Icon */}
                    <div className="mb-2">
                      <IconComponent
                        size={44}
                        weight="duotone"
                        className="text-nhero-gold"
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl font-medium text-nhero-cream tracking-wide mb-2 ${isEven ? "text-left" : "text-right"}`}
                    >
                      {experience.title}
                    </h3>

                    {/* Description */}
                    {experience.description && (
                      <p
                        className={`text-nhero-cream/70 text-sm leading-relaxed ${isEven ? "text-left" : "text-right"}`}
                      >
                        {stripHtmlAndDecode(experience.description)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Desktop Layout - Original two-column grid */}
                <div
                  className={`hidden md:grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-20 items-start ${
                    isEven ? "" : "md:[direction:rtl]"
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-4/3 overflow-hidden md:[direction:ltr]">
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
                    {/* Icon */}
                    <IconComponent
                      size={56}
                      weight="duotone"
                      className="text-nhero-gold"
                    />

                    {/* Title */}
                    <h3 className="text-3xl lg:text-4xl font-medium text-nhero-cream uppercase tracking-wide">
                      {experience.title}
                    </h3>

                    {/* Description */}
                    {experience.description && (
                      <p className="text-nhero-cream/70 text-base leading-relaxed uppercase tracking-wide">
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
