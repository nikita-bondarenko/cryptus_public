import { CurrencyType } from "@/components/request/RequestDetails";
import {

  setCardInputAmountValue,
  setCashInputAmountValue,
  setCryptoInputAmountValue,
} from "../slices/exchangeInput/exchangeInputSlice";

export const getCurrencyTypeFromAction = (
  actionType: string
): CurrencyType | null => {
  if (actionType === setCardInputAmountValue.type) return "BANK";
  if (actionType === setCashInputAmountValue.type) return "CASH";
  if (actionType === setCryptoInputAmountValue.type) return "COIN";
  return null;
}; 