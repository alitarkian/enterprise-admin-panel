import { HeroText } from "@/components/ui/heroes/HeroText";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function IndexPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang, "alitarkian");
  return (
    <section className="container mx-auto">
      <HeroText
        capsuleText="100% Open-source & Free"
        capsuleLink="https://stacktemplate.com"
        title="A Multi-tenant Next.js Starter Template"
        subtitle="Built for developers, by developers. Next.js + Shadcn UI + Stack Auth."
        primaryCtaText="Get Started"
        primaryCtaLink={"signUp"}
        secondaryCtaText="GitHub"
        secondaryCtaLink="https://github.com/stack-auth/stack-template"
        credits={
          <>
            Crafted with ❤️ by{" "}
            <a
              href="https://stack-auth.com"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Stack Auth
            </a>
          </>
        }
      />
    </section>
  );
}
