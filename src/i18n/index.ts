export {
  locales,
  defaultLocale,
  LOCALE_COOKIE,
  localeLabels,
  isLocale,
  resolveLocale,
  type Locale,
} from "./config";
export { getDictionary, getAllDictionaries } from "./dictionaries";
export { createTranslator, type Translator } from "./translator";
export { I18nProvider, useI18n, useTranslations } from "./I18nProvider";
export type { Dictionary } from "./types";
