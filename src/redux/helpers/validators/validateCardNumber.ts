import { CurrencyPosition } from "@/components/request/RequestDetails";

type ValidatorOptions = {
  minValue?: number;
  position?: CurrencyPosition;
};

type Validator = (value: unknown, options?: ValidatorOptions) => string | null;

export const validateCardNumber: Validator = (value, options) => {
  // Card number is optional for 'given' position
  if (options?.position === 'given') return null;

  if (!value || typeof value !== 'string') {
    return "Введите номер карты";
  }

  const clearValue = value.trim().split(' ').join('');
  if (clearValue.length < 16 || clearValue.length > 19 || !/^\d+$/.test(clearValue)) {
    return "Неверный номер карты";
  }
  return null;
}; 