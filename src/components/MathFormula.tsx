"use client";

import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import styles from "./MathFormula.module.scss";

type MathFormulaProps = {
  latex: string;
  label?: string;
  display?: boolean;
};

export function MathFormula({ latex, label, display = true }: MathFormulaProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: display,
        throwOnError: false,
        strict: "ignore",
      });
    } catch {
      return latex;
    }
  }, [latex, display]);

  return (
    <figure className={styles.figure}>
      {label ? <figcaption className={styles.label}>{label}</figcaption> : null}
      <div
        className={styles.formula}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
