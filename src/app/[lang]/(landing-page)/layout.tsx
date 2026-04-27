import { Footer } from "@/components/ui/layouts/footer";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang, null);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{props.children}</main>
      <Footer
        builtBy={dictionary.footer.builtBy}
        builtByLink="https://alitarkian.space/"
        githubLink="https://github.com/alitarkian/"
        twitterLink="https://x.com/tarkianali"
        linkedinLink="https://www.linkedin.com/in/tarkianali/"
        instagramLink="https://instagram.com/alitarkian.space"
        reservedBy={dictionary.footer.reservedBy}
        title2={dictionary.footer.title2}
      />
    </div>
  );
}
