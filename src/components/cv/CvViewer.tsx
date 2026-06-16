"use client";

import { Button, Column, Heading, Icon, Row, Text } from "@once-ui-system/core";
import { useI18n } from "@/i18n";
import { cv } from "@/resources";
import styles from "./CvViewer.module.scss";

export function CvViewer() {
  const { t, dictionary } = useI18n();

  return (
    <Column fillWidth gap="l" maxWidth="l">
      <Column fillWidth gap="8" horizontal="center" align="center">
        <Heading variant="display-strong-s" align="center">
          {dictionary.meta.cv.title}
        </Heading>
        <Text variant="body-default-s" onBackground="neutral-weak" align="center">
          {t("cv.subtitle")}
        </Text>
      </Column>

      <div className={styles.viewerShell}>
        <div className={styles.toolbar}>
          <div className={styles.meta}>
            <Icon name="cv" onBackground="brand-weak" size="s" />
            <span className={styles.fileName}>{t("cv.downloadName")}</span>
          </div>
          <Row gap="8" wrap horizontal="end">
            <Button
              href={cv.file}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="s"
              prefixIcon="openLink"
            >
              {t("cv.open")}
            </Button>
            <Button
              href={cv.file}
              download={t("cv.downloadName")}
              variant="primary"
              size="s"
              prefixIcon="download"
            >
              {t("cv.download")}
            </Button>
          </Row>
        </div>

        <iframe
          className={styles.viewer}
          src={`${cv.file}#view=FitH&toolbar=0&navpanes=0`}
          title={dictionary.meta.cv.title}
        />
      </div>
    </Column>
  );
}
