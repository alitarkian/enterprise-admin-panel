import "server-only";
import type { Locale, Subdomain } from "./i18n-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  fa: () => import("./dictionaries/fa.json").then((module) => module.default),
  de: () => import("./dictionaries/en.json").then((module) => module.default),
  it: () => import("./dictionaries/en.json").then((module) => module.default),
  ru: () => import("./dictionaries/en.json").then((module) => module.default),
  tr: () => import("./dictionaries/en.json").then((module) => module.default),
  fr: () => import("./dictionaries/en.json").then((module) => module.default),
  ar: () => import("./dictionaries/en.json").then((module) => module.default),
  ku: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/en.json").then((module) => module.default),
};

// export const getDictionary = async (locale: Locale) =>
//   dictionaries[locale]?.() ?? dictionaries.en();

export const getDictionary = async (
  locale: Locale,
  subdomain?: Subdomain,
): Promise<{ [key: string]: string }> => {
  let dictionaryPath: string;
  if (subdomain) {
    dictionaryPath = `./dictionaries/${subdomain}/${locale}.json`;
  } else {
    dictionaryPath = `./dictionaries/${locale}.json`;
  }

  try {
    const module = await import(dictionaryPath);
    return module.default;
  } catch (error) {
    dictionaryPath = `./dictionaries/${locale}.json`;
    const module = await import(dictionaryPath);
    return module.default;
  }
};
