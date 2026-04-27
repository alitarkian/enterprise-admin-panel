import LocaleSwitcher from "@/components/commons/LocaleSwitcher";
import ThemeToggleButton from "@/components/commons/ThemeToggleButton";
import Loading from "@/components/ui/layouts/Loading";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

export const metadata = {
  title: "Enterprise marketplace platform",
  description:
    "this is a enterprise marketplace platform admin panel modules management with nextjs 16.",
};

export default async function HomePage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);

  return (
    <Suspense fallback={<Loading />}>
      <section>
        <LocaleSwitcher currentLang={lang} />
        <ThemeToggleButton />
        <div>
          <p>Current locale: {lang}</p>
          <p>This text is rendered on the server: {dictionary.landing.title}</p>
        </div>
      </section>
    </Suspense>
  );
}
