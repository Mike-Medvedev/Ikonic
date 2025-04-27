/**
 *
 */
export default function CalculateInitials(firstname: string, lastname: string, middlename?: string) {
  return (firstname[0] + lastname[0] + (middlename?.[0] ?? "")).toUpperCase();
}
