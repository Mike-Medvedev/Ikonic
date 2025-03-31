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
  if (phone[0] != "1") return "Phone Number must start with 1 for US Code";
  if (!phone || phone.length != 11) return "Phone Number cannot be empty or non 11-digit";

  return "";
};

export const dateValidator = (date: Date | undefined) => {
  if (!date) return "Date cannot be empty.";
  if (date.getTime() < Date.now() || isNaN(date.getTime())) return "Date outside the valid range";

  return "";
};
