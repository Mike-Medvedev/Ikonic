// const newTrip = (Object.entries(tripForm) as Array<[keyof NewTripForm, SimpleForm<string | Date>]>).reduce(
//       (acc, [key, value]) => {
//         acc[key] = value.value;
//         return acc;
//       },
//       {} as Record<keyof NewTripForm, string | Date>

import { SimpleForm } from "@/models/SimpleForm";

export default function FormBuilder<T, K>(form: Record<keyof T, SimpleForm<K>>): Record<keyof T, K> {
  return (Object.entries(form) as Array<[keyof T, SimpleForm<K>]>).reduce((acc, [key, value]) => {
    acc[key] = value.value;
    return acc;
  }, {} as Record<keyof T, K>);
}
