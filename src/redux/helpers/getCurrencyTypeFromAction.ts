import { CurrencyType } from "@/components/request/RequestDetails";
import {

  setCardInputAmountValue,
  setCashInputAmountValue,
  setCryptoInputAmountValue,
} from "../slices/exchangeInput/exchangeInputSlice";

export const getCurrencyTypeFromAction = (
  actionType: string
): CurrencyType | null => {
  if (actionType === setCardInputAmountValue.type) return "card";
  if (actionType === setCashInputAmountValue.type) return "cash";
  if (actionType === setCryptoInputAmountValue.type) return "crypto";
  return null;
}; 