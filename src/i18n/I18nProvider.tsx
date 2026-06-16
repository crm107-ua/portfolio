"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  LOCALE_COOKIE,
  defaultLocale,
  isLocale,
  type Locale,
} from "./config";
import { getAllDictionaries } from "./dictionaries";
import { createTranslator, type Translator } from "./translator";
import type { Dictionary } from "./types";

type I18nContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  t: Translator;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const dictionaries = getAllDictionaries();

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const stored = window.localStorage.getItem(LOCALE_COOKIE);
  if (isLocale(stored)) return stored;

  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  if (match && isLocale(match[1])) return match[1];

  return defaultLocale;
}

function persistLocale(locale: Locale) {
  window.localStorage.setItem(LOCALE_COOKIE, locale);
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
  document.documentElement.lang = locale;
}

type I18nProviderProps = {
  children: ReactNode;
  initialLocale?: Locale;
};

export function I18nProvider({ children, initialLocale = defaultLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const stored = readStoredLocale();
    setLocaleState(stored);
    document.documentElement.lang = stored;
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    persistLocale(nextLocale);
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const dictionary = dictionaries[locale];
    return {
      locale,
      dictionary,
      t: createTranslator(dictionary),
      setLocale,
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

export function useTranslations(namespace?: string) {
  const { t, locale, dictionary, setLocale } = useI18n();

  const scopedT = useCallback(
    (key: string, values?: Record<string, string | number>) =>
      t(namespace ? `${namespace}.${key}` : key, values),
    [namespace, t],
  );

  return { t: scopedT, locale, dictionary, setLocale };
}
