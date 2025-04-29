/**
 * Takes a user's name parts and returns their initials (first and last)
 * as an uppercase string. Handles null/undefined inputs.
 * Returns "?" if no initials can be generated.
 */
export default function CalculateInitials(
  firstname: string | null | undefined,
  lastname: string | null | undefined,
): string {
  const firstInitial = firstname?.trim()?.[0] ?? "";

  const lastInitial = lastname?.trim()?.[0] ?? "";

  const initials = `${firstInitial}${lastInitial}`; // e.g., "JD", "J", "D", ""

  if (!initials) {
    return "?";
  }

  return initials.toUpperCase();
}
