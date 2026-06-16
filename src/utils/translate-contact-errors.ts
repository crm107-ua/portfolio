import type { Translator } from "@/i18n";
import {
  ContactField,
  ContactFieldErrorCode,
  ContactFieldErrors,
  ContactFormValues,
  getContactFieldErrorValues,
} from "./contact-validation";

export function translateContactFieldError(
  t: Translator,
  field: ContactField,
  code: ContactFieldErrorCode,
  values: ContactFormValues,
): string {
  return t(`contact.errors.fields.${field}.${code}`, getContactFieldErrorValues(field, values));
}

export function translateContactFieldErrors(
  t: Translator,
  errors: ContactFieldErrors,
  values: ContactFormValues,
): Partial<Record<ContactField, string>> {
  const translated: Partial<Record<ContactField, string>> = {};

  for (const field of ["name", "email", "message"] as const) {
    const code = errors[field];
    if (code) {
      translated[field] = translateContactFieldError(t, field, code, values);
    }
  }

  return translated;
}

export function translateContactMessage(t: Translator, messageKey: string): string {
  if (messageKey.startsWith("contact.")) {
    return t(messageKey);
  }

  const knownKeys: Record<string, string> = {
    "Please fix the highlighted fields before sending.": "contact.errors.formInvalid",
    "Your session expired. Refresh the page and try again.": "contact.errors.sessionExpired",
    "Too many requests. Please wait 15 minutes before trying again.": "contact.errors.rateLimit",
    "The message could not be sent. Please try again in a few minutes.": "contact.errors.server",
    "The request body is invalid.": "contact.errors.sendFailed",
    "Your submission could not be processed.": "contact.errors.sendFailed",
  };

  const key = knownKeys[messageKey];
  return key ? t(key) : messageKey;
}
