import type { Locale } from "@/i18n";

const localeMap: Record<Locale, string> = {
  en: "en-US",
  es: "es-ES",
};

type RelativeLabels = {
  justNow: string;
  minutesAgo: string;
  hoursAgo: string;
  daysAgo: string;
};

export function formatDate(
  date: string,
  includeRelative = false,
  locale: Locale = "en",
  relativeLabels?: RelativeLabels,
) {
  const currentDate = new Date();

  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  const targetDate = new Date(date);
  const timeDifference = currentDate.getTime() - targetDate.getTime();
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));

  const labels = relativeLabels ?? {
    justNow: "just now",
    minutesAgo: "{{count}}m ago",
    hoursAgo: "{{count}}h ago",
    daysAgo: "{{count}}d ago",
  };

  let formattedDate = "";

  if (daysAgo >= 365) {
    formattedDate = `${Math.floor(daysAgo / 365)}y ago`;
  } else if (daysAgo >= 30) {
    formattedDate = `${Math.floor(daysAgo / 30)}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = labels.daysAgo.replace("{{count}}", String(daysAgo));
  } else if (hoursAgo > 0) {
    formattedDate = labels.hoursAgo.replace("{{count}}", String(hoursAgo));
  } else if (minutesAgo > 0) {
    formattedDate = labels.minutesAgo.replace("{{count}}", String(minutesAgo));
  } else {
    formattedDate = labels.justNow;
  }

  const fullDate = targetDate.toLocaleString(localeMap[locale], {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
