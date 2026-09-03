import React from "react";
import { BrowserFrame, displayHostFromUrl } from "@/components/BrowserFrame";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ZoomableImage } from "@/components/ZoomableImage";
import browserStyles from "@/components/BrowserFrame.module.scss";
import phoneStyles from "@/components/PhoneFrame.module.scss";

export type PortfolioFrameVariant = "browser" | "phone";

interface PortfolioImageProps {
  src: string;
  alt: string;
  title?: string;
  link?: string;
  priority?: boolean;
  variant?: PortfolioFrameVariant;
}

export function PortfolioImage({
  src,
  alt,
  title,
  link,
  priority,
  variant = "browser",
}: PortfolioImageProps) {
  const tabTitle = title ?? displayHostFromUrl(link);

  if (variant === "phone") {
    return (
      <PhoneFrame title={tabTitle} href={link}>
        <ZoomableImage
          className={phoneStyles.image}
          src={src}
          alt={alt}
          priority={priority}
        />
      </PhoneFrame>
    );
  }

  return (
    <BrowserFrame title={tabTitle} href={link}>
      <div className={browserStyles.content}>
        <ZoomableImage
          className={browserStyles.image}
          src={src}
          alt={alt}
          priority={priority}
        />
      </div>
    </BrowserFrame>
  );
}
