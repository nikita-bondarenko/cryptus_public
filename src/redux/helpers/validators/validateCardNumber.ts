import { ValidationOptions } from "../types";

export type ValidateCardNumberProps = {
  value: string | null;
  options?: ValidationOptions;
};

export const validateCardNumber = ({ value, options }: ValidateCardNumberProps): string | null => {
  if (!value) {
    return "Введите номер карты";
  }

  // Remove spaces and dashes
  const cleanNumber = value.replace(/[\s-]/g, "");

  // Check if the number is 16 digits
  if (!/^\d{16}$/.test(cleanNumber)) {
    return "Номер карты должен содержать 16 цифр";
  }

  // Luhn algorithm for card number validation
  let sum = 0;
  let isEven = false;

  // Loop through values starting from the rightmost digit
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i));

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  if (sum % 10 !== 0) {
    return "Неверный номер карты";
  }

  return null;
}; 