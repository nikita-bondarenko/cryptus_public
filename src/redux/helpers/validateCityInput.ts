import { CurrencyPosition } from "@/components/request/RequestDetails";
import { AppDispatch, RootState } from "../store";
import { ListenerEffectAPI, PayloadAction } from "@reduxjs/toolkit";
import { validateExchangeInput } from "./validateExchangeInput";
import { setCashCityError, setAreErrors, setCashCity } from "../slices/exchangeInput/exchangeInputSlice";
import { SetCashCityAction } from "../slices/exchangeInput/types";

export type ValidateCityInputProps = {
  action: SetCashCityAction;
  listenerApi: ListenerEffectAPI<RootState, AppDispatch, SetCashCityAction>;
};

export const validateCityInput = ({
  action,
  listenerApi,
}: ValidateCityInputProps) => {
  const state = listenerApi.getState();
  const dispatch = listenerApi.dispatch;

  const { selectedGiveType, selectedReceieveType } = state.exchangeType;
  const minValue = state.exchangeInput.minValue;
  const sourseType = "cash";
  
  // Validate only if the input type is currently selected
  const isGiveType = selectedGiveType === sourseType;
  const isReceiveType = selectedReceieveType === sourseType;
  if (!isGiveType && !isReceiveType) {
    return;
  }

  const position: CurrencyPosition = isGiveType ? "given" : "received";
  let hasErrors = false;

  // Validate city
  const cityError = validateExchangeInput({
    value: action.payload,
    inputType: "city",
    position,
    minValue,
  });

  dispatch(setCashCityError(cityError));
  hasErrors = !!cityError;

  // Update areErrors state
  dispatch(setAreErrors(hasErrors));
}; 