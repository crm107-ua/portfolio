import React from "react";
import styles from "./PhoneFrame.module.scss";

export interface PhoneTab {
  label: string;
  href?: string;
}

interface PhoneFrameProps {
  tabs?: PhoneTab[];
  activeTabIndex?: number;
  onTabSelect?: (index: number) => void;
  title?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
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

export function PhoneFrame({
  tabs,
  activeTabIndex = 0,
  onTabSelect,
  title = "Preview",
  href,
  children,
  className,
}: PhoneFrameProps) {
  const resolvedTabs = tabs && tabs.length > 0 ? tabs : [{ label: title, href }];
  const showTabs = resolvedTabs.length > 1;

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      {showTabs && (
        <div className={styles.tabBar} role="tablist" aria-label="Screens">
          {resolvedTabs.map((tab, index) => {
            const isActive = index === activeTabIndex;
            return (
              <button
                key={`${tab.label}-${index}`}
                type="button"
                className={[styles.tab, isActive ? styles.tabActive : styles.tabInactive]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onTabSelect?.(index)}
                aria-selected={isActive}
                aria-label={tab.label}
                title={tab.label}
                role="tab"
              >
                <TabLabel
                  label={tab.label}
                  href={index === 0 && isActive ? tab.href : undefined}
                />
              </button>
            );
          })}
        </div>
      )}

      <div className={styles.phoneOuter}>
        <div className={styles.phone}>
          <div className={styles.island} aria-hidden="true" />
          <div className={styles.screen}>{children}</div>
          <div className={styles.homeIndicator} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
