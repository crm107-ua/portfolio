import React from "react";
import { BrowserFrame, displayHostFromUrl } from "@/components/BrowserFrame";
import { ZoomableImage } from "@/components/ZoomableImage";
import styles from "@/components/BrowserFrame.module.scss";

interface PortfolioImageProps {
  src: string;
  alt: string;
  title?: string;
  link?: string;
  priority?: boolean;
}

export function PortfolioImage({ src, alt, title, link, priority }: PortfolioImageProps) {
  const tabTitle = title ?? displayHostFromUrl(link);

  return (
    <BrowserFrame title={tabTitle} href={link}>
      <div className={styles.content}>
        <ZoomableImage
          className={styles.image}
          src={src}
          alt={alt}
          priority={priority}
        />
      </div>
    </BrowserFrame>
  );
}
