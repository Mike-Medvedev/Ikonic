import { SimpleForm } from "@/models/SimpleForm";

export function FormPayloadFactory<T, K>(form: Record<keyof T, SimpleForm<K>>): Record<keyof T, K> {
  return (Object.entries(form) as Array<[keyof T, SimpleForm<K>]>).reduce((acc, [key, value]) => {
    acc[key] = value.value;
    return acc;
  }, {} as Record<keyof T, K>);
}

export function ValidateErrors<T extends Record<keyof T, SimpleForm<any>>>(
  errors: Record<keyof T, string>,
  setter: React.Dispatch<React.SetStateAction<T>>
): boolean {
  for (const [key, error] of Object.entries(errors) as Array<[keyof T, string]>) {
    if (error) {
      setter((prev) => ({ ...prev, [key]: { value: prev[key].value, error: error } }));
      return false;
    }
  }
  return true;
}
