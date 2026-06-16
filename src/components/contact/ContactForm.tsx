"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Column, Heading, Icon, Input, Row, Text } from "@once-ui-system/core";
import { useI18n } from "@/i18n";
import {
  CONTACT_LIMITS,
  ContactField,
  ContactFieldErrors,
  ContactFormValues,
  hasContactFieldErrors,
  validateContactFields,
} from "@/utils/contact-validation";
import {
  translateContactFieldErrors,
  translateContactMessage,
} from "@/utils/translate-contact-errors";
import styles from "./ContactForm.module.scss";

type FormState = "idle" | "loading" | "submitting" | "success" | "error";

type ApiErrorResponse = {
  message?: string;
  errors?: ContactFieldErrors;
};

export function ContactForm() {
  const { t } = useI18n();
  const [csrfToken, setCsrfToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<FormState>("loading");
  const [formMessageKey, setFormMessageKey] = useState("");
  const [fieldErrorCodes, setFieldErrorCodes] = useState<ContactFieldErrors>({});

  const formValues: ContactFormValues = { name, email, message };

  const fieldErrors = useMemo(
    () => translateContactFieldErrors(t, fieldErrorCodes, formValues),
    [fieldErrorCodes, formValues, t],
  );

  const formMessage = formMessageKey ? translateContactMessage(t, formMessageKey) : "";

  const fieldLabels: Record<ContactField, string> = {
    name: t("contact.fields.name"),
    email: t("contact.fields.email"),
    message: t("contact.fields.message"),
  };

  useEffect(() => {
    let cancelled = false;

    async function loadCsrfToken() {
      try {
        const response = await fetch("/api/contact/csrf", { cache: "no-store" });
        if (!response.ok) throw new Error("contact.errors.initFailed");

        const data = (await response.json()) as { csrfToken?: string };
        if (!data.csrfToken) throw new Error("contact.errors.initFailed");

        if (!cancelled) {
          setCsrfToken(data.csrfToken);
          setState("idle");
        }
      } catch (error) {
        if (!cancelled) {
          setState("error");
          setFormMessageKey(
            error instanceof Error ? error.message : "contact.errors.initFailed",
          );
        }
      }
    }

    loadCsrfToken();

    return () => {
      cancelled = true;
    };
  }, []);

  const clearFieldError = (field: ContactField) => {
    setFieldErrorCodes((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const applyErrors = (messageKey: string, errors: ContactFieldErrors = {}) => {
    setFieldErrorCodes(errors);
    setFormMessageKey(messageKey);
    setState("error");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!csrfToken) return;

    const clientErrors = validateContactFields(formValues);
    if (hasContactFieldErrors(clientErrors)) {
      applyErrors("contact.errors.formInvalid", clientErrors);
      return;
    }

    setState("submitting");
    setFormMessageKey("");
    setFieldErrorCodes({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          csrfToken,
          name,
          email,
          message,
          website,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | ApiErrorResponse
        | { success?: boolean }
        | null;

      if (!response.ok) {
        applyErrors(
          data && "message" in data && data.message
            ? data.message
            : "contact.errors.sendFailed",
          data && "errors" in data ? (data.errors ?? {}) : {},
        );
        return;
      }

      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
      setFieldErrorCodes({});
      setFormMessageKey("");
      setState("success");
    } catch {
      applyErrors("contact.errors.network", {});
    }
  };

  const isDisabled = state === "loading" || state === "submitting" || !csrfToken;
  const showFieldErrors = Object.keys(fieldErrorCodes).length > 0;

  return (
    <Column fillWidth gap="l" maxWidth="l">
      <Column fillWidth gap="8" horizontal="center" align="center">
        <Heading variant="display-strong-s" align="center">
          {t("contact.title")}
        </Heading>
        <Text variant="body-default-s" onBackground="neutral-weak" align="center">
          {t("contact.description")}
        </Text>
      </Column>

      <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
        <Column fillWidth gap="20">
          {state === "success" && (
            <div className={`${styles.alert} ${styles.alertSuccess}`} role="status">
              <div className={styles.alertBody}>
                <Icon name="check" onBackground="success-medium" size="m" className={styles.alertIcon} />
                <div className={`${styles.alertContent} ${styles.alertContentCompact}`}>
                  <p className={styles.alertTitle}>{t("contact.success.title")}</p>
                  <p className={styles.alertDescription}>{t("contact.success.description")}</p>
                </div>
              </div>
            </div>
          )}

          {state === "error" && formMessage && (
            <div className={`${styles.alert} ${styles.alertError}`} role="alert">
              <div className={styles.alertBody}>
                <Icon name="warning" onBackground="danger-medium" size="m" className={styles.alertIcon} />
                <div className={styles.alertContent}>
                  <p className={`${styles.alertTitle} ${styles.alertTitleError}`}>{formMessage}</p>
                  {showFieldErrors ? (
                    <ul className={styles.alertList}>
                      {(["name", "email", "message"] as const).map((field) =>
                        fieldErrors[field] ? (
                          <li key={field} className={styles.alertItem}>
                            <span className={styles.alertField}>{fieldLabels[field]}</span>
                            <span>{fieldErrors[field]}</span>
                          </li>
                        ) : null,
                      )}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          <Column fillWidth gap="8">
            <label className={styles.label} htmlFor="contact-name">
              {t("contact.fields.name")}
            </label>
            <Input
              id="contact-name"
              name="name"
              type="text"
              placeholder={t("contact.placeholders.name")}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearFieldError("name");
              }}
              errorMessage={fieldErrors.name}
              disabled={isDisabled}
            />
            <div className={styles.fieldMeta}>
              <span className={styles.fieldHint}>
                {t("contact.hints.name", {
                  current: name.trim().length,
                  max: CONTACT_LIMITS.name.max,
                  min: CONTACT_LIMITS.name.min,
                })}
              </span>
            </div>
          </Column>

          <Column fillWidth gap="8">
            <label className={styles.label} htmlFor="contact-email">
              {t("contact.fields.email")}
            </label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              placeholder={t("contact.placeholders.email")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              errorMessage={fieldErrors.email}
              disabled={isDisabled}
            />
            <div className={styles.fieldMeta}>
              <span className={styles.fieldHint}>{t("contact.hints.email")}</span>
            </div>
          </Column>

          <Column fillWidth gap="8">
            <label className={styles.label} htmlFor="contact-message">
              {t("contact.fields.message")}
            </label>
            <textarea
              id="contact-message"
              name="message"
              className={`${styles.textarea} ${fieldErrors.message ? styles.textareaError : ""}`}
              placeholder={t("contact.placeholders.message")}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                clearFieldError("message");
              }}
              disabled={isDisabled}
              maxLength={CONTACT_LIMITS.message.max}
            />
            <div className={styles.fieldMeta}>
              {fieldErrors.message ? (
                <span className={styles.fieldError}>{fieldErrors.message}</span>
              ) : (
                <span />
              )}
              <span className={styles.fieldHint}>
                {t("contact.hints.message", {
                  current: message.trim().length,
                  max: CONTACT_LIMITS.message.max,
                  min: CONTACT_LIMITS.message.min,
                })}
              </span>
            </div>
          </Column>

          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <Row fillWidth horizontal="end">
            <Button
              type="submit"
              variant="primary"
              size="m"
              prefixIcon="email"
              disabled={isDisabled}
            >
              {state === "loading"
                ? t("contact.buttons.loading")
                : state === "submitting"
                  ? t("contact.buttons.sending")
                  : t("contact.buttons.send")}
            </Button>
          </Row>
        </Column>
      </form>
    </Column>
  );
}
