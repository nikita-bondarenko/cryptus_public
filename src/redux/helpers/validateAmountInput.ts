import {
  CurrencyType,
  CurrencyPosition,
} from "@/components/request/RequestDetails";
import {
  setCryptoInputAmountValue,
  setCryptoAmountError,
  setCryptoWalletAddressError,
  setCardInputAmountValue,
  setCardAmountError,
  setCardBankError,
  setCardNumberError,
  setCashInputAmountValue,
  setCashAmountError,
  setCashCityError,
  setAreErrors,
} from "../slices/exchangeInput/exchangeInputSlice";
import { AppDispatch, RootState } from "../store";
import {
  ListenerEffectAPI,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getCurrencyTypeFromAction } from "./getCurrencyTypeFromAction";
import { validateExchangeInput } from "./validateExchangeInput";
import { SetInputAmountValueActionPayload } from "../slices/exchangeInput/types";

export type ValidateAmountInputProps = {
  action: SetInputAmountValueActionPayload;
  listenerApi: ListenerEffectAPI<RootState, AppDispatch, SetInputAmountValueActionPayload>;
};

export const validateAmountInput = ({
  action,
  listenerApi,
}: ValidateAmountInputProps) => {
  const state = listenerApi.getState();
  const dispatch = listenerApi.dispatch;

  const { selectedGiveType } = state.exchangeType;
  const value = action.payload;
  const minValue = state.exchangeInput.minValue;
  const sourseType = getCurrencyTypeFromAction(action.type);
  const isGiveType = selectedGiveType === sourseType;
  const position: CurrencyPosition = isGiveType ? "given" : "received";
  let hasErrors = false;

  if (action.type === setCryptoInputAmountValue.type) {
    const amountError =
      position === "given"
        ? validateExchangeInput({
            value,
            inputType: "amount",
            position,
            minValue,
          })
        : null;
    dispatch(setCryptoAmountError(amountError));

    hasErrors = !!amountError;
  } else if (action.type === setCardInputAmountValue.type) {
    const amountError =
      position === "given"
        ? validateExchangeInput({
            value,
            inputType: "amount",
            position,
            minValue,
          })
        : null;

    dispatch(setCardAmountError(amountError));

    hasErrors = !!amountError;
  } else if (action.type === setCashInputAmountValue.type) {
    const amountError =
      position === "given"
        ? validateExchangeInput({
            value,
            inputType: "amount",
            position,
            minValue,
          })
        : null;

    dispatch(setCashAmountError(amountError));

    hasErrors = !!amountError;
  }

  dispatch(setAreErrors(hasErrors));
};
