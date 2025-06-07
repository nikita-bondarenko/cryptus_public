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
  Action,
  ListenerEffectAPI,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import { getCurrencyTypeFromAction } from "./getCurrencyTypeFromAction";
import { validateExchangeInput } from "./validateExchangeInput";

export type ValidateOneInputAmountValueProps = {
  action: UnknownAction;
  listenerApi: ListenerEffectAPI<
    unknown,
    ThunkDispatch<unknown, unknown, UnknownAction>,
    unknown
  >;
};

export const validateOneInputAmountValue = ({
  action,
  listenerApi,
}: ValidateOneInputAmountValueProps) => {
  const state = listenerApi.getState() as RootState;
  const dispatch = listenerApi.dispatch as AppDispatch;

  const { selectedGiveType, selectedReceieveType } = state.exchangeType;
  const value = action.payload as number;
  const minValue = state.exchangeInput.minValue;
  const sourseType = getCurrencyTypeFromAction(action.type);
  // Validate only if the input type is currently selected
  const isGiveType = selectedGiveType === sourseType;
  const isReceiveType = selectedReceieveType === sourseType;
  if (!isGiveType && !isReceiveType) {
    return;
  }
  const position: CurrencyPosition = isGiveType ? "given" : "received";

  let hasErrors = false;

  // Validate fields based on input type
  if (action.type === setCryptoInputAmountValue.type) {
  

    // Validate amount only for given position
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
   

    // Validate amount only for given position
    const amountError =
      position === "given"
        ? validateExchangeInput({
            value,
            inputType: "amount",
            position,
            minValue,
          })
        : null;

    // Validate card specific fields

    // Dispatch errors
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

    // Dispatch errors
    dispatch(setCashAmountError(amountError));

    hasErrors = !!amountError;
  }

  // Update areErrors state
  dispatch(setAreErrors(hasErrors));
};
