"use client";

import React, { useState } from "react";
import { ImageLightbox } from "@/components/ImageLightbox";
import styles from "@/components/ZoomableImage.module.scss";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  images?: string[];
  imageIndex?: number;
  priority?: boolean;
}

export function ZoomableImage({
  src,
  alt,
  className,
  images,
  imageIndex = 0,
  priority,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={[styles.trigger, className].filter(Boolean).join(" ")}
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
        <span className={styles.badge} aria-hidden="true">
          ⤢
        </span>
      </button>

      <ImageLightbox
        open={open}
        onClose={() => setOpen(false)}
        src={src}
        alt={alt}
        images={images}
        initialIndex={imageIndex}
      />
    </>
  );
}
