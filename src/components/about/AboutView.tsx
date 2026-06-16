"use client";

import React from "react";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Row,
  Schema,
  Tag,
  Text,
} from "@once-ui-system/core";
import TableOfContents from "@/components/about/TableOfContents";
import { PortfolioImage } from "@/components/PortfolioImage";
import styles from "@/components/about/about.module.scss";
import { useI18n } from "@/i18n";
import { about, baseURL, person, social } from "@/resources";

const socialLabelKeys: Record<string, string> = {
  GitHub: "social.github",
  LinkedIn: "social.linkedin",
  Email: "social.email",
};

export function AboutView() {
  const { t, dictionary } = useI18n();
  const copy = dictionary.about;

  const structure = [
    {
      title: copy.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: copy.work.title,
      display: about.work.display,
      items: copy.work.experiences.map((experience) => experience.company),
    },
    {
      title: copy.studies.title,
      display: about.studies.display,
      items: copy.studies.institutions.map((institution) => institution.name),
    },
    {
      title: copy.technical.title,
      display: about.technical.display,
      items: copy.technical.skills.map((skill) => skill.title),
    },
  ];

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={dictionary.meta.about.title}
        description={dictionary.meta.about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(dictionary.meta.about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {t("person.location")}
            </Row>
            <Row wrap gap="8">
              {dictionary.person.languages.map((language, index) => (
                <Tag key={index} size="l">
                  {language}
                </Tag>
              ))}
            </Row>
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={copy.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={styles.blockAlign}
                style={{ backdropFilter: "blur(var(--static-space-1))" }}
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Row paddingX="8">{t("about.scheduleCall")}</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {t("person.name")}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {t("person.role")}
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social
                  .filter((item) => item.essential)
                  .map((item) =>
                    item.link ? (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            href={item.link}
                            prefixIcon={item.icon}
                            label={t(socialLabelKeys[item.name] ?? item.name)}
                            size="s"
                            weight="default"
                            variant="secondary"
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            size="l"
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                          />
                        </Row>
                      </React.Fragment>
                    ) : null,
                  )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {copy.intro.description.split("\n\n").map((paragraph, index) => (
                <Text key={index} as="p">
                  {paragraph}
                </Text>
              ))}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={copy.work.title} variant="display-strong-s" marginBottom="m">
                {copy.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {copy.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${experience.company}-${achievementIndex}`}
                        >
                          {achievement}
                        </Text>
                      ))}
                    </Column>
                    {about.work.experiences[index]?.images &&
                      about.work.experiences[index].images.length > 0 && (
                        <Column fillWidth paddingTop="m" paddingLeft="40" gap="12">
                          {about.work.experiences[index].images.map((image, imageIndex) => (
                            <PortfolioImage key={imageIndex} src={image.src} alt={image.alt} />
                          ))}
                        </Column>
                      )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={copy.studies.title} variant="display-strong-s" marginBottom="m">
                {copy.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {copy.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={copy.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {copy.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {copy.technical.skills.map((skill, index) => (
                  <Column key={`${skill.title}-${index}`} fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">
                      {skill.title}
                    </Text>
                    {skill.description ? (
                      <Text variant="body-default-m" onBackground="neutral-weak">
                        {skill.description}
                      </Text>
                    ) : null}
                    {about.technical.skills[index]?.tags &&
                      about.technical.skills[index].tags.length > 0 && (
                        <Row wrap gap="8" paddingTop="8">
                          {about.technical.skills[index].tags.map((tag, tagIndex) => (
                            <Tag
                              key={`${skill.title}-${tagIndex}`}
                              size="l"
                              prefixIcon={tag.icon}
                            >
                              {tag.name}
                            </Tag>
                          ))}
                        </Row>
                      )}
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}
