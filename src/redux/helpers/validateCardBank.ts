import { CurrencyPosition } from "@/components/request/RequestDetails";
import { AppDispatch, RootState } from "../store";
import { ListenerEffectAPI, PayloadAction } from "@reduxjs/toolkit";
import { validateExchangeInput } from "./validateExchangeInput";
import { setCardBankError, setAreErrors, setCardBank } from "../slices/exchangeInput/exchangeInputSlice";
import { SetCardBankAction } from "../slices/exchangeInput/types";

export type ValidateCardBankProps = {
  action: SetCardBankAction;
  listenerApi: ListenerEffectAPI<RootState, AppDispatch, SetCardBankAction>;
};

export const validateCardBank = ({
  action,
  listenerApi,
}: ValidateCardBankProps) => {
  const state = listenerApi.getState();
  const dispatch = listenerApi.dispatch;

  const { selectedGiveType, selectedReceieveType } = state.exchangeType;
  const minValue = state.exchangeInput.minValue;
  const sourseType = "BANK";
  
  // Validate only if the input type is currently selected
  const isGiveType = selectedGiveType === sourseType;
  const isReceiveType = selectedReceieveType === sourseType;
  if (!isGiveType && !isReceiveType) {
    return;
  }

  const position: CurrencyPosition = isGiveType ? "given" : "received";
  let hasErrors = false;

  // Validate bank
  const bankError = validateExchangeInput({
    value: action.payload,
    inputType: "bank",
    position,
    minValue,
  });

  dispatch(setCardBankError(bankError));
  hasErrors = !!bankError;

  // Update areErrors state
  dispatch(setAreErrors(hasErrors));
}; 