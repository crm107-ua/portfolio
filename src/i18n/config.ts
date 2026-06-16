export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "portfolio-locale";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}
