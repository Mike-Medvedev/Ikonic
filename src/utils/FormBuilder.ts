import { SimpleForm } from "@/types";
import React from "react";

/**
 * Converts a form object of type { key: SimpleForm<V> } back to { key: V }
 * Ensures All keys are present in object
 */
export function CreatePayloadFactory<T>(form: { [K in keyof T]: SimpleForm<T[K]> }): T {
  const payload = {} as T;
  for (const key in form) payload[key] = form[key].value;
  return payload;
}
/**
 * Converts a form object of type { key: SimpleForm<V> } back to { key: V }.
 * Flexibly allows partial updates
 */
export function UpdatePayloadFactory<T>(form: { [K in keyof T]?: SimpleForm<T[K]> }): Partial<T> {
  const payload = {} as Partial<T>;

  for (const key in form) {
    const value = form[key]?.value;
    if (value !== undefined && value !== "") {
      payload[key as keyof T] = value;
    }
  }

  return payload;
}

/**
 * Validates an errors object against a form state, updates the form state's
 * error fields via the setter if errors are found, and returns true if no errors exist,
 * false otherwise.
 */
export function ValidateErrors<T extends object>(
  errors: Partial<Record<keyof T, string>>,
  setter: React.Dispatch<React.SetStateAction<T>>,
): boolean {
  let hasError = false;
  (Object.keys(errors) as Array<keyof T>).forEach((key) => {
    const error = errors[key];
    if (error) {
      setter((prev) => ({
        ...prev,
        [key]: { ...prev[key], error: error },
      }));
      hasError = true;
    }
  });
  return !hasError;
}
