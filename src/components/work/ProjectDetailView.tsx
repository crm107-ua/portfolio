"use client";

import {
  Column,
  Heading,
  Line,
  Schema,
  SmartLink,
  Text,
  Row,
  AvatarGroup,
} from "@once-ui-system/core";
import { PortfolioImageGallery, ScrollToHash } from "@/components";
import { useI18n } from "@/i18n/I18nProvider";
import { about, baseURL, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";

type ProjectTeamMember = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type ProjectDetailViewProps = {
  slug: string;
  publishedAt?: string;
  images: string[];
  link?: string;
  team?: ProjectTeamMember[];
  children?: React.ReactNode;
};

export function ProjectDetailView({
  slug,
  publishedAt,
  images,
  link,
  team,
  children,
}: ProjectDetailViewProps) {
  const { t, dictionary, locale } = useI18n();
  const project =
    dictionary.projects[slug as keyof typeof dictionary.projects] ?? null;

  if (!project) return null;

  const avatars = team?.map((member) => ({ src: member.avatar })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${slug}`}
        title={project.title}
        description={project.summary}
        datePublished={publishedAt}
        dateModified={publishedAt}
        image={`/api/og/generate?title=${encodeURIComponent(project.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">{t("work.projectsLabel")}</Text>
        </SmartLink>
        {publishedAt ? (
          <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
            {formatDate(publishedAt, false, locale)}
          </Text>
        ) : null}
        <Heading variant="display-strong-m">{project.title}</Heading>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {team && team.length > 0 ? <AvatarGroup reverse avatars={avatars} size="s" /> : null}
          <Text variant="label-default-m" onBackground="brand-weak">
            {team?.map((member, idx) => (
              <span key={idx}>
                {idx > 0 ? (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                ) : null}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {images.length > 0 ? (
        <PortfolioImageGallery
          slug={slug}
          priority
          images={images}
          alt={project.title}
          link={link}
        />
      ) : null}
      {children}
      <ScrollToHash />
    </Column>
  );
}

export function ProjectRelatedHeading() {
  const { t } = useI18n();

  return (
    <Column fillWidth gap="40" horizontal="center" marginTop="40">
      <Line maxWidth="40" />
      <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
        {t("work.relatedProjects")}
      </Heading>
    </Column>
  );
}
