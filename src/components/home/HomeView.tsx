"use client";

import {
  Avatar,
  Badge,
  Button,
  Column,
  Heading,
  Line,
  RevealFx,
  Row,
  Schema,
  Text,
} from "@once-ui-system/core";
import { useI18n } from "@/i18n/I18nProvider";
import { about, baseURL, cv, home, person, routes } from "@/resources";

export function HomeView() {
  const { t, dictionary } = useI18n();

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={dictionary.meta.home.title}
        description={dictionary.meta.home.description}
        image={`/api/og/generate?title=${encodeURIComponent(dictionary.meta.home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2" gap="8" vertical="center">
                  <strong className="ml-4">{t("home.featuredName")}</strong>
                  <Text onBackground="brand-medium">{t("home.featuredBadge")}</Text>
                </Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {t("home.headline")}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {t("home.subline")}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Row gap="12" wrap horizontal="center" vertical="center">
              <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                <Row gap="8" vertical="center" paddingRight="4">
                  {about.avatar.display && (
                    <Avatar
                      marginRight="8"
                      style={{ marginLeft: "-0.75rem" }}
                      src={person.avatar}
                      size="m"
                    />
                  )}
                  {t("home.aboutCta")}
                </Row>
              </Button>
              <Button
                id="cv"
                data-border="rounded"
                href={cv.path}
                variant="secondary"
                size="m"
                weight="default"
                prefixIcon="cv"
                arrowIcon
              >
                {t("nav.cv")}
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>
      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                {t("home.latestBlog")}
              </Heading>
            </Row>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
    </Column>
  );
}
