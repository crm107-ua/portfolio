"use client";

import React, { useEffect, useState } from "react";
import { Row, ToggleButton, useTheme } from "@once-ui-system/core";
import { useI18n } from "@/i18n";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, []);

  useEffect(() => {
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, [theme]);

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={() => setTheme(nextTheme)}
      aria-label={t("theme.switchTo", { mode: t(`theme.${nextTheme}`) })}
    />
  );
};
