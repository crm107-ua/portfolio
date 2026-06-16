"use client";

import {
  AvatarGroup,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { PortfolioImageGallery } from "@/components/PortfolioImageGallery";
import { useI18n } from "@/i18n";

interface ProjectCardProps {
  slug: string;
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  slug,
  href,
  priority,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  const { t, dictionary } = useI18n();
  const localized =
    dictionary.projects[slug as keyof typeof dictionary.projects] ?? null;
  const displayTitle = localized?.title ?? title;
  const displayDescription = localized?.summary ?? description;

  return (
    <Column fillWidth gap="m">
      {images.length > 0 && (
        <PortfolioImageGallery
          slug={slug}
          images={images}
          alt={displayTitle}
          link={link}
          priority={priority}
        />
      )}
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {displayTitle && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {displayTitle}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || displayDescription?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {displayDescription?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {displayDescription}
              </Text>
            )}
            <Flex gap="24" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">{t("work.readCaseStudy")}</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">{t("work.viewProject")}</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
