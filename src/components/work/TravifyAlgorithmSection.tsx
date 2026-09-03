"use client";

import { Column, Heading, Text } from "@once-ui-system/core";
import { MathFormula } from "@/components/MathFormula";
import { useI18n } from "@/i18n/I18nProvider";
import styles from "./TravifyAlgorithmSection.module.scss";

type AlgorithmPanel = {
  eyebrow: string;
  title: string;
  lead: string;
  stepsTitle: string;
  steps: { title: string; body: string }[];
  formulasTitle: string;
  formulas: { label: string; latex: string }[];
  priorityTitle: string;
  priorityItems: string[];
  exampleTitle: string;
  exampleLead: string;
  examplePathHeader: string;
  exampleValueHeader: string;
  exampleRows: { path: string; value: string; note: string }[];
  exampleFoot: string;
  complexityTitle: string;
  complexity: { label: string; value: string; detail: string }[];
  serviceNote: string;
};

export function TravifyAlgorithmSection() {
  const { dictionary } = useI18n();
  const panel = (dictionary.projects.travify as { algorithmPanel?: AlgorithmPanel })
    .algorithmPanel;

  if (!panel) return null;

  return (
    <section className={styles.section} aria-labelledby="travify-algorithm-title">
      <Column fillWidth gap="24">
        <header className={styles.header}>
          <p className={styles.eyebrow}>{panel.eyebrow}</p>
          <Heading as="h2" id="travify-algorithm-title" variant="heading-strong-xl">
            {panel.title}
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            {panel.lead}
          </Text>
        </header>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>{panel.stepsTitle}</h3>
          <ol className={styles.steps}>
            {panel.steps.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepText}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>{panel.formulasTitle}</h3>
          <div className={styles.formulas}>
            {panel.formulas.map((formula) => (
              <MathFormula key={formula.label} label={formula.label} latex={formula.latex} />
            ))}
          </div>
          <div className={styles.priority}>
            <p className={styles.priorityTitle}>{panel.priorityTitle}</p>
            <ul className={styles.priorityList}>
              {panel.priorityItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>{panel.exampleTitle}</h3>
          <p className={styles.exampleLead}>{panel.exampleLead}</p>
          <div className={styles.exampleTable} role="table">
            <div className={styles.exampleHead} role="row">
              <span role="columnheader">{panel.examplePathHeader}</span>
              <span role="columnheader">{panel.exampleValueHeader}</span>
              <span role="columnheader" />
            </div>
            {panel.exampleRows.map((row) => (
              <div
                key={row.path}
                className={styles.exampleRow}
                role="row"
                data-optimal={row.note === "Optimal" || row.note === "Óptima" ? "true" : "false"}
              >
                <span role="cell" className={styles.examplePath}>
                  {row.path}
                </span>
                <span role="cell" className={styles.exampleValue}>
                  {row.value}
                </span>
                <span role="cell" className={styles.exampleNote}>
                  {row.note}
                </span>
              </div>
            ))}
          </div>
          <p className={styles.exampleFoot}>{panel.exampleFoot}</p>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>{panel.complexityTitle}</h3>
          <div className={styles.complexityGrid}>
            {panel.complexity.map((item) => (
              <article key={item.label} className={styles.complexityCard}>
                <p className={styles.complexityLabel}>{item.label}</p>
                <p className={styles.complexityValue}>{item.value}</p>
                <p className={styles.complexityDetail}>{item.detail}</p>
              </article>
            ))}
          </div>
          <p className={styles.serviceNote}>{panel.serviceNote}</p>
        </div>
      </Column>
    </section>
  );
}
