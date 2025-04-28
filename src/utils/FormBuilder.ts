import { SimpleForm } from "@/types";
import React from "react";

/**
 * Converts a Form object containing { someKey: { value: V, error: string } }
 * into a payload object { someKey: V }.
 */
export function FormPayloadFactory<T extends Record<string, unknown>>(form: { [K in keyof T]: SimpleForm<T[K]> }): T {
  return (Object.keys(form) as Array<keyof T>).reduce((acc, key) => {
    (acc as T)[key] = form[key].value;
    return acc;
  }, {} as T);
}

/**
 * Validates an errors object against a form state, updates the form state's
 * error fields via the setter if errors are found, and returns true if no errors exist,
 * false otherwise.
 */
export function ValidateErrors<T extends Record<keyof T, SimpleForm<unknown>>>(
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
