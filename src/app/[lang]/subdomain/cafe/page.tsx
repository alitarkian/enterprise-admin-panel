import { HeroText } from "@/components/ui/heroes/HeroText";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function IndexPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang, "cafe");
  return (
    <section className="container mx-auto">
      <HeroText
        capsuleText={dictionary.hero.capsuleText}
        capsuleLink=""
        title={dictionary.hero.title}
        subtitle={dictionary.hero.subtitle}
        primaryCtaText={dictionary.hero.primaryCtaText}
        primaryCtaLink=""
        secondaryCtaText={dictionary.hero.secondaryCtaText}
        secondaryCtaLink=""
      />
    </section>
  );
}
