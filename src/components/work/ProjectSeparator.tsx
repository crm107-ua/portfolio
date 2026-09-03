import styles from "./ProjectSeparator.module.scss";

export function ProjectSeparator() {
  return (
    <div className={styles.separator} aria-hidden="true">
      <hr className={styles.line} />
    </div>
  );
}
