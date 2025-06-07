import { CurrencyPosition } from "@/components/request/RequestDetails";
import { validateAmount } from "./validateAmount";
import { validateWalletAddress } from "./validateWalletAddress";
import { validateCardNumber } from "./validateCardNumber";
import { validateBank } from "./validateBank";
import { validateCity } from "./validateCity";

export type ValidatedField = 'amount' | 'walletAddress' | 'cardNumber' | 'bank' | 'city';

export const validatedFields: ValidatedField[] = ['amount', 'walletAddress', 'cardNumber', 'bank', 'city'];

export type ValidatorOptions = {
  minValue?: number;
  position?: CurrencyPosition;
};

export type Validator = (value: unknown, options?: ValidatorOptions) => string | null;

export const validators: Record<ValidatedField, Validator> = {
  amount: validateAmount,
  walletAddress: validateWalletAddress,
  cardNumber: validateCardNumber,
  bank: validateBank,
  city: validateCity,
}; 