const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_LIMITS = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  message: { min: 10, max: 4000 },
} as const;

export type ContactField = "name" | "email" | "message";

export type ContactFieldErrorCode = "required" | "min" | "max" | "invalid";

export type ContactFieldErrors = Partial<Record<ContactField, ContactFieldErrorCode>>;

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export function validateContactFields(values: ContactFormValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim().toLowerCase();
  const message = values.message.trim();

  if (!name) {
    errors.name = "required";
  } else if (name.length < CONTACT_LIMITS.name.min) {
    errors.name = "min";
  } else if (name.length > CONTACT_LIMITS.name.max) {
    errors.name = "max";
  }

  if (!email) {
    errors.email = "required";
  } else if (email.length > CONTACT_LIMITS.email.max) {
    errors.email = "max";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "invalid";
  }

  if (!message) {
    errors.message = "required";
  } else if (message.length < CONTACT_LIMITS.message.min) {
    errors.message = "min";
  } else if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = "max";
  }

  return errors;
}

export function hasContactFieldErrors(errors: ContactFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function getContactFieldErrorValues(
  field: ContactField,
  values: ContactFormValues,
): Record<string, string | number> {
  const trimmed = {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  };

  const current = trimmed[field].length;

  if (field === "name") {
    return {
      min: CONTACT_LIMITS.name.min,
      max: CONTACT_LIMITS.name.max,
      current,
    };
  }

  if (field === "email") {
    return { max: CONTACT_LIMITS.email.max, current };
  }

  return {
    min: CONTACT_LIMITS.message.min,
    max: CONTACT_LIMITS.message.max,
    current,
  };
}
