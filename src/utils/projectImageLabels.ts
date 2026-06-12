import path from "path";

export function displayHostFromUrl(url?: string): string {
  if (!url) return "Preview";

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Preview";
  }
}

export function getProjectTabLabel(
  imageSrc: string,
  slug: string,
  projectLink?: string,
): string {
  const host = displayHostFromUrl(projectLink);
  const base = path.basename(imageSrc, path.extname(imageSrc));

  if (base === slug) return host;

  const suffix = base.startsWith(`${slug}-`) ? base.slice(slug.length + 1) : null;
  if (suffix) return `${host} · ${suffix}`;

  return host;
}
