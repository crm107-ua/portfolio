export function displayHostFromUrl(url?: string): string {
  if (!url) return "Preview";

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Preview";
  }
}

function fileBaseName(imageSrc: string): string {
  const withoutQuery = imageSrc.split("?")[0] ?? imageSrc;
  const file = withoutQuery.split("/").pop() ?? "";
  return file.replace(/\.[^.]+$/, "");
}

const TRAVIFY_SCREEN_LABELS: Record<string, string> = {
  travify: "Home",
  "travify-2": "Ready",
  "travify-3": "Income",
  "travify-4": "Expenses",
  "travify-5": "FX",
  "travify-6": "Exchange",
  "travify-7": "Charts",
};

const LESLY_SCREEN_LABELS: Record<string, string> = {
  lesly: "App",
  "lesly-2": "Profile",
  "lesly-3": "Analytics",
  "lesly-4": "Mobile",
};

export function getProjectTabLabel(
  imageSrc: string,
  slug: string,
  projectLink?: string,
): string {
  const host = displayHostFromUrl(projectLink);
  const base = fileBaseName(imageSrc);

  if (slug === "travify" && TRAVIFY_SCREEN_LABELS[base]) {
    return TRAVIFY_SCREEN_LABELS[base];
  }

  if (slug === "lesly" && LESLY_SCREEN_LABELS[base]) {
    return LESLY_SCREEN_LABELS[base];
  }

  if (base === slug) return host;

  const suffix = base.startsWith(`${slug}-`) ? base.slice(slug.length + 1) : null;
  if (suffix) return `${host} · ${suffix}`;

  return host;
}
