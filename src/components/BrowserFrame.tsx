import React from "react";
import styles from "./BrowserFrame.module.scss";

export interface BrowserTab {
  label: string;
  href?: string;
}

interface BrowserFrameProps {
  tabs?: BrowserTab[];
  activeTabIndex?: number;
  onTabSelect?: (index: number) => void;
  title?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

function TabIcon() {
  return (
    <svg
      className={styles.tabIcon}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M2.5 8h11M8 2.5c1.8 1.6 2.8 3.4 2.8 5.5S9.8 11.9 8 13.5M8 2.5C6.2 4.1 5.2 5.9 5.2 8s1 3.9 2.8 5.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TabLabel({ label, href }: { label: string; href?: string }) {
  if (href) {
    return (
      <a
        className={styles.tabLink}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={href}
        onClick={(e) => e.stopPropagation()}
      >
        {label}
      </a>
    );
  }

  return <span className={styles.tabLabel}>{label}</span>;
}

export function BrowserFrame({
  tabs,
  activeTabIndex = 0,
  onTabSelect,
  title = "Preview",
  href,
  children,
  className,
}: BrowserFrameProps) {
  const resolvedTabs =
    tabs && tabs.length > 0 ? tabs : [{ label: title, href }];

  return (
    <div className={[styles.frame, className].filter(Boolean).join(" ")}>
      <div className={styles.chrome}>
        <div className={styles.trafficLights} aria-hidden="true">
          <span className={`${styles.dot} ${styles.close}`} />
          <span className={`${styles.dot} ${styles.minimize}`} />
          <span className={`${styles.dot} ${styles.maximize}`} />
        </div>

        <div className={styles.tabStrip}>
          {resolvedTabs.map((tab, index) => {
            const isActive = index === activeTabIndex;
            const isInteractive = resolvedTabs.length > 1 && onTabSelect;

            if (isInteractive) {
              return (
                <button
                  key={`${tab.label}-${index}`}
                  type="button"
                  className={[styles.tab, isActive ? styles.tabActive : styles.tabInactive]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => onTabSelect(index)}
                  aria-selected={isActive}
                  role="tab"
                >
                  <TabIcon />
                  <TabLabel label={tab.label} href={index === 0 && isActive ? tab.href : undefined} />
                </button>
              );
            }

            return (
              <div
                key={`${tab.label}-${index}`}
                className={[styles.tab, styles.tabActive].join(" ")}
                role="tab"
                aria-selected
              >
                <TabIcon />
                <TabLabel label={tab.label} href={tab.href} />
              </div>
            );
          })}
        </div>
      </div>

      {children}
    </div>
  );
}

export { displayHostFromUrl } from "@/utils/projectImageLabels";
