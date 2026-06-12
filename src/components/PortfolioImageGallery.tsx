"use client";

import React, { useState } from "react";
import { BrowserFrame } from "@/components/BrowserFrame";
import { ZoomableImage } from "@/components/ZoomableImage";
import { displayHostFromUrl, getProjectTabLabel } from "@/utils/projectImageLabels";
import styles from "@/components/BrowserFrame.module.scss";

interface PortfolioImageGalleryProps {
  slug: string;
  images: string[];
  alt: string;
  title?: string;
  link?: string;
  priority?: boolean;
}

export function PortfolioImageGallery({
  slug,
  images,
  alt,
  title,
  link,
  priority,
}: PortfolioImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];

  if (!current) return null;

  const host = title ?? displayHostFromUrl(link);
  const tabs = images.map((imageSrc, tabIndex) => ({
    label: getProjectTabLabel(imageSrc, slug, link) || host,
    href: tabIndex === 0 ? link : undefined,
  }));

  return (
    <BrowserFrame tabs={tabs} activeTabIndex={index} onTabSelect={setIndex}>
      <div className={styles.content}>
        <ZoomableImage
          key={current}
          className={styles.image}
          src={current}
          alt={`${alt} — ${index + 1}`}
          images={images}
          imageIndex={index}
          priority={priority}
        />
      </div>
    </BrowserFrame>
  );
}
