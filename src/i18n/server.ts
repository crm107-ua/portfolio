import { cookies } from "next/headers";
import { LOCALE_COOKIE, defaultLocale, resolveLocale } from "./config";
import { getDictionary } from "./dictionaries";
import { createTranslator } from "./translator";

export { getDictionary } from "./dictionaries";

export async function getServerLocale() {
  const cookieStore = await cookies();
  return resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value ?? defaultLocale);
}

export async function getServerTranslator() {
  const locale = await getServerLocale();
  return {
    locale,
    dictionary: getDictionary(locale),
    t: createTranslator(getDictionary(locale)),
  };
}
