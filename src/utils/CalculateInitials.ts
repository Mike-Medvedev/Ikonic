/**
 * Takes a users name and returns their initials as a simple string
 */
export default function CalculateInitials(firstname: string, lastname: string, middlename?: string) {
  return (firstname.charAt(0) + lastname.charAt(0) + (middlename?.charAt(0) ?? "")).toUpperCase();
}
