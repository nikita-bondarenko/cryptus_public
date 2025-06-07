import { CurrencyPosition } from "@/components/request/RequestDetails";
import { AppDispatch, RootState } from "../store";
import { ListenerEffectAPI, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { validateExchangeInput } from "./validateExchangeInput";
import { setCardBankError, setAreErrors } from "../slices/exchangeInput/exchangeInputSlice";

export type ValidateCardBankProps = {
  action: UnknownAction;
  listenerApi: ListenerEffectAPI<
    unknown,
    ThunkDispatch<unknown, unknown, UnknownAction>,
    unknown
  >;
};

export const validateCardBank = ({
  action,
  listenerApi,
}: ValidateCardBankProps) => {
  const state = listenerApi.getState() as RootState;
  const dispatch = listenerApi.dispatch as AppDispatch;

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