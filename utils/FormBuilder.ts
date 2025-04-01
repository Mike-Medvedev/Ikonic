import { SimpleForm } from "@/models/SimpleForm";

export function FormPayloadFactory<T>(form: Record<keyof T, SimpleForm<any>>): Record<keyof T, any> {
  return (Object.entries(form) as Array<[keyof T, SimpleForm<any>]>).reduce((acc, [key, value]) => {
    acc[key] = value.value;
    return acc;
  }, {} as Record<keyof T, any>);
}

export function ValidateErrors<T extends Record<keyof T, SimpleForm<any>>>(
  errors: Record<keyof T, string>,
  setter: React.Dispatch<React.SetStateAction<T>>
): boolean {
  let hasError = false;
  (Object.entries(errors) as Array<[keyof T, string]>).forEach(([key, error]) => {
    if (error) {
      setter((prev) => ({ ...prev, [key]: { value: prev[key].value, error: error } }));
      hasError = true;
    }
  });
  return hasError ? false : true;
}
