import type { Dictionary } from "./types";

type InterpolationValues = Record<string, string | number>;

function getNestedValue(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, segment) => {
    if (current && typeof current === "object" && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }
    return undefined;
  }, source);
}

function interpolate(template: string, values?: InterpolationValues): string {
  if (!values) return template;

  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = values[key];
    return value === undefined ? `{{${key}}}` : String(value);
  });
}

export function createTranslator(dictionary: Dictionary) {
  return function t(key: string, values?: InterpolationValues): string {
    const value = getNestedValue(dictionary, key);

    if (typeof value === "string") {
      return interpolate(value, values);
    }

    if (process.env.NODE_ENV === "development") {
      console.warn(`[i18n] Missing translation key: ${key}`);
    }

    return key;
  };
}

export type Translator = ReturnType<typeof createTranslator>;
