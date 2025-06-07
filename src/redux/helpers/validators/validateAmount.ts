import { CurrencyPosition } from "@/components/request/RequestDetails";

type ValidatorOptions = {
  minValue?: number;
  position?: CurrencyPosition;
};

type Validator = (value: unknown, options?: ValidatorOptions) => string | null;

export const validateAmount: Validator = (value, options) => {
  // Only validate amount for 'given' position
  if (options?.position !== 'given') return null;

  if (value === null || value === undefined) {
    return "Введите сумму";
  }

  const amount = Number(value);
  const minValue = options?.minValue ?? 0;
  if (isNaN(amount) || amount < minValue) {
    return `Минимальная сумма должна быть не меньше ${minValue}`;
  }
  return null;
}; 