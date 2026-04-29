import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang, null);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{props.children}</main>
    </div>
  );
}
