import type { Locale } from "./config";
import type { Dictionary } from "./types";
import en from "./locales/en.json";
import es from "./locales/es.json";

const dictionaries: Record<Locale, Dictionary> = {
  en: en as Dictionary,
  es: es as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getAllDictionaries(): Record<Locale, Dictionary> {
  return dictionaries;
}
