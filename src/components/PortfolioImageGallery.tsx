"use client";

import React, { useState } from "react";
import { BrowserFrame } from "@/components/BrowserFrame";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ZoomableImage } from "@/components/ZoomableImage";
import { displayHostFromUrl, getProjectTabLabel } from "@/utils/projectImageLabels";
import browserStyles from "@/components/BrowserFrame.module.scss";
import phoneStyles from "@/components/PhoneFrame.module.scss";
import type { PortfolioFrameVariant } from "@/components/PortfolioImage";

const PHONE_PROJECT_SLUGS = new Set(["travify"]);

interface PortfolioImageGalleryProps {
  slug: string;
  images: string[];
  alt: string;
  title?: string;
  link?: string;
  priority?: boolean;
  variant?: PortfolioFrameVariant;
}

export function PortfolioImageGallery({
  slug,
  images,
  alt,
  title,
  link,
  priority,
  variant,
}: PortfolioImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];
  const frameVariant: PortfolioFrameVariant =
    variant ?? (PHONE_PROJECT_SLUGS.has(slug) ? "phone" : "browser");

  if (!current) return null;

  const host = title ?? displayHostFromUrl(link);
  const tabs = images.map((imageSrc, tabIndex) => ({
    label: getProjectTabLabel(imageSrc, slug, link) || host,
    href: tabIndex === 0 ? link : undefined,
  }));

  if (frameVariant === "phone") {
    return (
      <PhoneFrame tabs={tabs} activeTabIndex={index} onTabSelect={setIndex}>
        <ZoomableImage
          key={current}
          className={phoneStyles.image}
          src={current}
          alt={`${alt} — ${index + 1}`}
          images={images}
          imageIndex={index}
          priority={priority}
        />
      </PhoneFrame>
    );
  }

  return (
    <BrowserFrame tabs={tabs} activeTabIndex={index} onTabSelect={setIndex}>
      <div className={browserStyles.content}>
        <ZoomableImage
          key={current}
          className={browserStyles.image}
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
