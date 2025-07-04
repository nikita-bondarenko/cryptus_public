import { ValidationOptions } from "../types";

export type ValidatePhoneNumberProps = {
  value: string | null;
  options?: ValidationOptions;
};

export const validatePhoneNumber = ({ value, options }: ValidatePhoneNumberProps): string | null => {
  if (options?.position === "given") {
    return null;
  }
  
  if (!value || value.length === 0) {
    return "Введите номер телефона";
  }

  // Remove all non-digit characters for validation
  const cleanNumber = value.replace(/\D/g, "");

  // Check if it starts with 8 and has 11 digits total
  if (!cleanNumber.startsWith('8')) {
    return "Номер телефона должен начинаться с 8";
  }

  if (cleanNumber.length !== 11) {
    return "Номер телефона должен содержать 11 цифр";
  }

  return null;
}; 