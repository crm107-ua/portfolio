"use client";

import { locales, localeLabels, useI18n } from "@/i18n";
import { localeFlags } from "./LanguageSwitch.flags";
import styles from "./LanguageSwitch.module.scss";

export function LanguageSwitch() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className={styles.switch} role="group" aria-label={t("language.ariaLabel")}>
      {locales.map((code) => {
        const Flag = localeFlags[code];
        const isActive = locale === code;

        return (
          <button
            key={code}
            type="button"
            className={`${styles.option} ${isActive ? styles.active : ""}`}
            onClick={() => setLocale(code)}
            aria-pressed={isActive}
            aria-label={t("language.switchTo", { language: localeLabels[code] })}
            title={localeLabels[code]}
          >
            <Flag className={styles.flag} />
          </button>
        );
      })}
    </div>
  );
}
