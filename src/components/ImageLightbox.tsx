"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ImageLightbox.module.scss";

const MIN_SCALE = 1;
const MAX_SCALE = 4;

interface ImageLightboxProps {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  images?: string[];
  initialIndex?: number;
}

function getTouchDistance(touches: React.TouchList | TouchList) {
  if (touches.length < 2) return 0;
  const [a, b] = [touches[0], touches[1]];
  return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
}

export function ImageLightbox({
  open,
  onClose,
  src,
  alt,
  images,
  initialIndex = 0,
}: ImageLightboxProps) {
  const gallery = images && images.length > 0 ? images : [src];
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [grabbing, setGrabbing] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const pinchRef = useRef<{ distance: number; scale: number } | null>(null);
  const lastTapRef = useRef(0);

  const currentSrc = gallery[index] ?? src;

  const resetTransform = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const clampScale = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

  const zoomBy = (delta: number) => {
    setScale((prev) => {
      const next = clampScale(prev + delta);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  useEffect(() => {
    if (!open) return;
    setIndex(initialIndex);
    resetTransform();
  }, [open, initialIndex, resetTransform]);

  useEffect(() => {
    resetTransform();
  }, [index, resetTransform]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && gallery.length > 1) {
        setIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
      }
      if (event.key === "ArrowRight" && gallery.length > 1) {
        setIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, gallery.length]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      px: position.x,
      py: position.y,
    };
    setGrabbing(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || scale <= 1) return;
    const dx = event.clientX - dragRef.current.x;
    const dy = event.clientY - dragRef.current.y;
    setPosition({ x: dragRef.current.px + dx, y: dragRef.current.py + dy });
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    setGrabbing(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.2 : -0.2;
    setScale((prev) => {
      const next = clampScale(prev + delta);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      pinchRef.current = {
        distance: getTouchDistance(event.touches),
        scale,
      };
      return;
    }

    if (event.touches.length === 1 && scale > 1) {
      dragRef.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
        px: position.x,
        py: position.y,
      };
    }
  };

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2 && pinchRef.current) {
      event.preventDefault();
      const distance = getTouchDistance(event.touches);
      const ratio = distance / pinchRef.current.distance;
      const next = clampScale(pinchRef.current.scale * ratio);
      setScale(next);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return;
    }

    if (event.touches.length === 1 && dragRef.current && scale > 1) {
      event.preventDefault();
      const dx = event.touches[0].clientX - dragRef.current.x;
      const dy = event.touches[0].clientY - dragRef.current.y;
      setPosition({ x: dragRef.current.px + dx, y: dragRef.current.py + dy });
    }
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length < 2) pinchRef.current = null;
    if (event.touches.length === 0) dragRef.current = null;

    const now = Date.now();
    if (now - lastTapRef.current < 300 && event.changedTouches.length === 1) {
      setScale((prev) => {
        const next = prev > 1 ? 1 : 2;
        if (next === 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
    lastTapRef.current = now;
  };

  if (!open) return null;

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          {gallery.length > 1 && (
            <span className={styles.counter}>
              {index + 1} / {gallery.length}
            </span>
          )}
        </div>
        <div className={styles.toolbarGroup}>
          <button type="button" className={styles.toolButton} onClick={() => zoomBy(-0.35)} aria-label="Zoom out">
            −
          </button>
          <button type="button" className={styles.toolButton} onClick={resetTransform} aria-label="Reset zoom">
            {Math.round(scale * 100)}%
          </button>
          <button type="button" className={styles.toolButton} onClick={() => zoomBy(0.35)} aria-label="Zoom in">
            +
          </button>
          <button type="button" className={styles.toolButton} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={styles.viewport}
        data-grabbing={grabbing}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {gallery.length > 1 && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.navPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
        )}

        <div className={styles.stage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={currentSrc}
            className={styles.image}
            src={currentSrc}
            alt={alt}
            draggable={false}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
          />
        </div>

        {gallery.length > 1 && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.navNext}`}
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));
            }}
            aria-label="Next image"
          >
            ›
          </button>
        )}
      </div>

      <p className={styles.hint}>
        Pinch or scroll to zoom · drag to pan · double-tap to toggle zoom · Esc to close
      </p>
    </div>,
    document.body,
  );
}
