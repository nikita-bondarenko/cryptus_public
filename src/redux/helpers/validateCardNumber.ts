import { CurrencyPosition } from "@/components/request/RequestDetails";
import { AppDispatch, RootState } from "../store";
import { ListenerEffectAPI, PayloadAction } from "@reduxjs/toolkit";
import { validateExchangeInput } from "./validateExchangeInput";
import { setCardNumberError, setAreErrors, setCardNumber } from "../slices/exchangeInput/exchangeInputSlice";
import { SetCardNumberAction } from "../slices/exchangeInput/types";

export type ValidateCardNumberProps = {
  action: SetCardNumberAction;
  listenerApi: ListenerEffectAPI<RootState, AppDispatch, SetCardNumberAction>;
};

export const validateCardNumber = ({
  action,
  listenerApi,
}: ValidateCardNumberProps) => {
  const state = listenerApi.getState();
  const dispatch = listenerApi.dispatch;

  const { selectedGiveType, selectedReceieveType } = state.exchangeType;
  const minValue = state.exchangeInput.minValue;
  const sourseType = "card";
  
  // Validate only if the input type is currently selected
  const isGiveType = selectedGiveType === sourseType;
  const isReceiveType = selectedReceieveType === sourseType;
  if (!isGiveType && !isReceiveType) {
    return;
  }

  const position: CurrencyPosition = isGiveType ? "given" : "received";
  let hasErrors = false;

  // Validate card number
  const cardNumberError = validateExchangeInput({
    value: action.payload,
    inputType: "cardNumber",
    position,
    minValue,
  });

  dispatch(setCardNumberError(cardNumberError));
  hasErrors = !!cardNumberError;

  // Update areErrors state
  dispatch(setAreErrors(hasErrors));
}; 