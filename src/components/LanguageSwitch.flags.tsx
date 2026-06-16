import type { Locale } from "@/i18n";

type FlagProps = {
  className?: string;
};

export function FlagEn({ className }: FlagProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 16"
      width="20"
      height="14"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#fff" strokeWidth="2.2" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="3.2" />
      <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="1.8" />
    </svg>
  );
}

export function FlagEs({ className }: FlagProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 16"
      width="20"
      height="14"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="16" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
    </svg>
  );
}

export const localeFlags: Record<Locale, React.FC<FlagProps>> = {
  en: FlagEn,
  es: FlagEs,
};
