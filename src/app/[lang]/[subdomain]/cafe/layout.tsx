import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang, "cafe");

  return (
    <div className="flex min-h-screen flex-col bg-victor-cafe-primary">
      <main className="flex-1">{props.children}</main>
    </div>
  );
}
