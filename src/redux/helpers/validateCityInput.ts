import { CurrencyPosition } from "@/components/request/RequestDetails";
import { AppDispatch, RootState } from "../store";
import { ListenerEffectAPI, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { validateExchangeInput } from "./validateExchangeInput";
import { setCashCityError, setAreErrors } from "../slices/exchangeInput/exchangeInputSlice";

export type ValidateCityInputProps = {
  action: UnknownAction;
  listenerApi: ListenerEffectAPI<
    unknown,
    ThunkDispatch<unknown, unknown, UnknownAction>,
    unknown
  >;
};

export const validateCityInput = ({
  action,
  listenerApi,
}: ValidateCityInputProps) => {
  const state = listenerApi.getState() as RootState;
  const dispatch = listenerApi.dispatch as AppDispatch;

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