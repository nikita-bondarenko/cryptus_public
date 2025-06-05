import { CurrencyType } from "@/components/request/RequestDetails";
import {
  setCryptoInputAmountValue,
  setCardInputAmountValue,
  setCashInputAmountValue,
  setCardInput,
  setCashInput,
  setCryptoInput,
} from "./slices/exchangeInput/exchangeInputSlice";
import { AppDispatch } from "./store";
type DispatchProps = {
  selectedGiveType: CurrencyType;
  selectedReceiveType: CurrencyType;
  dispatch: AppDispatch;
  value: number;
  coifficient: number;
};

export const roundTo8 = (num: number | null): number | null => {
  if (num === null) return null;
  return Math.round(num * 1e8) / 1e8;
};


export const dispatchCrypto = ({
  selectedGiveType,
  dispatch,
  value,
  coifficient,
}: DispatchProps) => {
  if (selectedGiveType === "crypto") {
    dispatch(setCryptoInputAmountValue(roundTo8(value * coifficient)));
  } else {
    dispatch(setCryptoInputAmountValue(roundTo8(value / coifficient)));
  }
};

export const dispatchNonCrypto = ({
  selectedGiveType,
  selectedReceiveType,
  dispatch,
  value,
  coifficient,
}: DispatchProps) => {
  if (selectedGiveType === "crypto") {
    if (selectedReceiveType === "card") {
      dispatch(setCardInputAmountValue(roundTo8(value / coifficient)));
    } else {
      dispatch(setCashInputAmountValue(roundTo8(value / coifficient)));
    }
  } else {
    if (selectedGiveType === "card") {
      dispatch(setCardInputAmountValue(roundTo8(value * coifficient)));
    } else {
      dispatch(setCashInputAmountValue(roundTo8(value * coifficient)));
    }
  }
};

export const getCurrencyTypeFromAction = (actionType: string): CurrencyType | null => {
  if (actionType === setCardInput.type) return "card";
  if (actionType === setCashInput.type) return "cash";
  if (actionType === setCryptoInput.type) return "crypto";
  return null;
}
