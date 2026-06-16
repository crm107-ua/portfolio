"use client";

import { useEffect } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export function ProjectMdxLocaleSync() {
  const { locale } = useI18n();

  useEffect(() => {
    document.querySelectorAll("[data-project-locale]").forEach((element) => {
      const elementLocale = element.getAttribute("data-project-locale");
      if (elementLocale === locale) {
        element.removeAttribute("hidden");
      } else {
        element.setAttribute("hidden", "");
      }
    });
  }, [locale]);

  return null;
}
