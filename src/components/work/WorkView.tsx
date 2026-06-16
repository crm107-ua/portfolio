"use client";

import { Column, Heading, Schema } from "@once-ui-system/core";
import { useI18n } from "@/i18n/I18nProvider";
import { about, baseURL, person, work } from "@/resources";

export function WorkView() {
  const { t, dictionary } = useI18n();

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={dictionary.meta.work.title}
        description={dictionary.meta.work.description}
        image={`/api/og/generate?title=${encodeURIComponent(dictionary.meta.work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {t("work.title")}
      </Heading>
    </Column>
  );
}
