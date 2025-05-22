import { ILLEGAL_WORDS } from "@/constants/constants";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";

/** Validate Emails */
export function emailValidator(email: string) {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
}
/** Validate Passwords */
export function passwordValidator(password: string) {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  return "";
}
/** Validate Names */
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
/** Validate Dates */
export function dateValidator(date: Date | undefined) {
  if (!date) return "Date cannot be empty.";
  if (date.getTime() < Date.now() - 8.64e7 || isNaN(date.getTime())) return "Date outside the valid range";

  return "";
}
/** Validate Paragraphs of text */
export function descriptionValidator(description: string) {
  const loweredText = description.toLowerCase();
  if (ILLEGAL_WORDS.some((illegalWord) => loweredText.includes(illegalWord.toLowerCase()))) {
    return "Please Remove Illegal Words";
  }
  return "";
}

// Function to standardize US phone numbers to +1XXXXXXXXXX format
export function standardizeUSPhoneNumber(phoneNumber: string | undefined) {
  if (!phoneNumber) return null;

  try {
    // First, try to parse with react-phone-number-input
    if (isValidPhoneNumber(phoneNumber, "US")) {
      const parsed = parsePhoneNumber(phoneNumber, "US");
      return parsed?.format("E.164") || null;
    }

    // If that fails, do manual cleaning
    // Remove all non-digit characters except +
    let cleaned = phoneNumber.replace(/[^\d+]/g, "");

    // Handle special cases like "1800MYAPPLE" - remove letters
    cleaned = cleaned.replace(/[A-Za-z]/g, "");

    // If it starts with +1, keep it as is (if 11 digits total)
    if (cleaned.startsWith("+1") && cleaned.length === 12) {
      return cleaned;
    }

    // If it starts with 1 and has 11 digits, add +
    if (cleaned.startsWith("1") && cleaned.length === 11) {
      return "+" + cleaned;
    }

    // If it has 10 digits (no country code), add +1
    if (cleaned.length === 10) {
      return "+1" + cleaned;
    }

    // If it starts with + but not +1, and has 11 digits after removing +, assume it's +1
    if (cleaned.startsWith("+") && cleaned.length === 11) {
      return "+1" + cleaned.substring(1);
    }

    // Return null if we can't standardize it
    return null;
  } catch (error) {
    console.warn("Error standardizing phone number:", phoneNumber, error);
    return null;
  }
}
