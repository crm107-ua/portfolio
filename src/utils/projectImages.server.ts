import "server-only";

import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"];

function findImageFile(files: Set<string>, slug: string, baseName: string): string | null {
  for (const ext of IMAGE_EXTENSIONS) {
    const fileName = `${baseName}${ext}`;
    if (files.has(fileName)) {
      return `/images/projects/${slug}/${fileName}`;
    }
  }
  return null;
}

/**
 * Discovers project images in public/images/projects/{slug}/ following:
 * {slug}.png → {slug}-2.png → {slug}-3.png …
 */
export function discoverProjectImages(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", "projects", slug);
  if (!fs.existsSync(dir)) return [];

  const files = new Set(fs.readdirSync(dir));
  const images: string[] = [];

  const primary = findImageFile(files, slug, slug);
  if (primary) images.push(primary);

  for (let n = 2; n < 100; n++) {
    const numbered = findImageFile(files, slug, `${slug}-${n}`);
    if (!numbered) break;
    images.push(numbered);
  }

  return images;
}

export function resolveProjectImages(slug: string, frontmatterImages: string[] = []): string[] {
  const discovered = discoverProjectImages(slug);
  if (discovered.length > 0) return discovered;
  return frontmatterImages;
}
