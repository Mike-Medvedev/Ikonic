import { ILLEGAL_WORDS } from "@/constants/constants";

export function emailValidator(email: string) {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
}

export function passwordValidator(password: string) {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  return "";
}

export function nameValidator(name: string) {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
}

/**
 * Validates a full name string.
 * Checks for emptiness, minimum parts, valid characters, and length.
 * @param fullname The full name string to validate. Can be null or undefined.
 * @returns An error message string if validation fails, or an empty string "" if valid.
 */
export function fullnameValidator(fullname: string | null | undefined): string {
  if (!fullname || fullname.trim().length === 0) {
    return "Full name cannot be empty.";
  }
  const trimmedName = fullname.trim();

  const nameParts = trimmedName.split(/\s+/);
  if (nameParts.length < 2) {
    return "Please enter at least a first and last name.";
  }

  // This regex allows:
  // - Uppercase letters (A-Z)
  // - Lowercase letters (a-z)
  // - Whitespace (\s)
  // - Hyphens (-)
  // - Apostrophes (')
  const validNameRegex = /^[a-zA-Z\s'-]+$/;
  if (!validNameRegex.test(trimmedName)) {
    return "Full name contains invalid characters.";
  }

  const minLength = 3;
  const maxLength = 100;

  if (trimmedName.length < minLength) {
    return `Full name must be at least ${minLength} characters long.`;
  }

  if (trimmedName.length > maxLength) {
    return `Full name cannot exceed ${maxLength} characters.`;
  }

  return "";
}

export function phoneValidator(phone: string) {
  if (!phone || phone.length !== 10) return "Phone Number cannot be empty or non 10-digit";

  return "";
}

export function dateValidator(date: Date | undefined) {
  if (!date) return "Date cannot be empty.";
  if (date.getTime() < Date.now() - 8.64e7 || isNaN(date.getTime())) return "Date outside the valid range";

  return "";
}

export function descriptionValidator(description: string) {
  const loweredText = description.toLowerCase();
  if (ILLEGAL_WORDS.some((illegalWord) => loweredText.includes(illegalWord.toLowerCase()))) {
    return "Please Remove Illegal Words";
  }
  return "";
}
