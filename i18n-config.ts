export const i18n = {
  defaultLocale: "en",
  locales: ["en", "fa", "ar", "ku", "it", "de", "ru", "tr", "fr", "es"],
} as const;

export type Locale = (typeof i18n)["locales"][number] | Subdomain;
