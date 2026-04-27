import Loading from "@/components/ui/layouts/Loading";
import { i18n, type Locale } from "@/i18n-config";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import { Suspense } from "react";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata = {
  title: "Enterprise marketplace platform",
  description:
    "this is a enterprise marketplace platform admin panel modules management with nextjs 16.",
};

export default async function LangLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const { children } = props;
  const isRTL = lang === "fa" || lang === "ar" || lang === "ku";

  return (
    <html
      lang={lang}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
