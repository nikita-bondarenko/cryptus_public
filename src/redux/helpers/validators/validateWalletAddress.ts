import { CurrencyPosition } from "@/components/request/RequestDetails";

type ValidatorOptions = {
  minValue?: number;
  position?: CurrencyPosition;
};

type Validator = (value: unknown, options?: ValidatorOptions) => string | null;

export const validateWalletAddress: Validator = (value, options) => {
  // Wallet address is optional for 'given' position
  if (options?.position === 'given') return null;
  
  if (!value || typeof value !== 'string' || value.trim() === '') {
    return "Введите адрес кошелька";
  }
  return null;
}; 