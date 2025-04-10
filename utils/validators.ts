export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  return "";
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};

export const phoneValidator = (phone: string) => {
  if (!phone || phone.length !== 10) return "Phone Number cannot be empty or non 10-digit";

  return "";
};

export const dateValidator = (date: Date | undefined) => {
  if (!date) return "Date cannot be empty.";
  if (date.getTime() < Date.now() - 8.64e7 || isNaN(date.getTime())) return "Date outside the valid range";

  return "";
};

export type ValidatorTypes = "email" | "date" | "phone" | "name" | "password";

export const ValidatorMap = {
  email: () => emailValidator,
  date: () => dateValidator,
  phone: () => phoneValidator,
  name: () => nameValidator,
  passwordValidator: () => passwordValidator,
};
