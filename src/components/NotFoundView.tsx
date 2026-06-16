"use client";

import { Column, Heading, Text } from "@once-ui-system/core";
import { useI18n } from "@/i18n";

export function NotFoundView() {
  const { t } = useI18n();

  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        {t("notFound.code")}
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        {t("notFound.title")}
      </Heading>
      <Text onBackground="neutral-weak">{t("notFound.description")}</Text>
    </Column>
  );
}
