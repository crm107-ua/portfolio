import "server-only";

import { timingSafeEqual } from "crypto";
import {
  CONTACT_LIMITS,
  ContactFieldErrors,
  ContactFormValues,
  hasContactFieldErrors,
  validateContactFields,
} from "@/utils/contact-validation";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function verifyCsrfToken(cookieToken: string | undefined, bodyToken: unknown): boolean {
  if (typeof bodyToken !== "string" || !cookieToken) return false;
  if (bodyToken.length !== cookieToken.length) return false;

  try {
    return timingSafeEqual(Buffer.from(bodyToken), Buffer.from(cookieToken));
  } catch {
    return false;
  }
}

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count += 1;
  rateLimitStore.set(key, entry);
  return true;
}

export type ContactPayload = ContactFormValues;

export type ContactParseResult =
  | { ok: true; payload: ContactPayload }
  | { ok: false; message: string; errors: ContactFieldErrors };

export function parseContactPayload(body: unknown): ContactParseResult {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      message: "contact.errors.sendFailed",
      errors: {},
    };
  }

  const record = body as Record<string, unknown>;

  if (typeof record.website === "string" && record.website.trim().length > 0) {
    return {
      ok: false,
      message: "contact.errors.sendFailed",
      errors: {},
    };
  }

  const rawValues: ContactFormValues = {
    name: typeof record.name === "string" ? record.name : "",
    email: typeof record.email === "string" ? record.email : "",
    message: typeof record.message === "string" ? record.message : "",
  };

  const errors = validateContactFields(rawValues);
  if (hasContactFieldErrors(errors)) {
    return {
      ok: false,
      message: "contact.errors.formInvalid",
      errors,
    };
  }

  const payload: ContactPayload = {
    name: sanitizeText(rawValues.name, CONTACT_LIMITS.name.max),
    email: sanitizeText(rawValues.email, CONTACT_LIMITS.email.max).toLowerCase(),
    message: sanitizeText(rawValues.message, CONTACT_LIMITS.message.max),
  };

  const sanitizedErrors = validateContactFields(payload);
  if (hasContactFieldErrors(sanitizedErrors)) {
    return {
      ok: false,
      message: "contact.errors.formInvalid",
      errors: sanitizedErrors,
    };
  }

  return { ok: true, payload };
}
