import { CurrencyPosition } from "@/components/request/RequestDetails";
import { AppDispatch, RootState } from "../store";
import { ListenerEffectAPI, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { validateExchangeInput } from "./validateExchangeInput";
import { setCryptoWalletAddressError, setAreErrors } from "../slices/exchangeInput/exchangeInputSlice";

export type ValidateWalletAddressInputProps = {
  action: UnknownAction;
  listenerApi: ListenerEffectAPI<
    unknown,
    ThunkDispatch<unknown, unknown, UnknownAction>,
    unknown
  >;
};

export const validateWalletAddressInput = ({
  action,
  listenerApi,
}: ValidateWalletAddressInputProps) => {
  const state = listenerApi.getState() as RootState;
  const dispatch = listenerApi.dispatch as AppDispatch;

  const { selectedGiveType, selectedReceieveType } = state.exchangeType;
  const minValue = state.exchangeInput.minValue;
  const sourseType = "crypto";
  
  // Validate only if the input type is currently selected
  const isGiveType = selectedGiveType === sourseType;
  const isReceiveType = selectedReceieveType === sourseType;
  if (!isGiveType && !isReceiveType) {
    return;
  }

  const position: CurrencyPosition = isGiveType ? "given" : "received";
  let hasErrors = false;

  // Validate wallet address
  const walletAddressError = validateExchangeInput({
    value: action.payload,
    inputType: "walletAddress",
    position,
    minValue,
  });

  dispatch(setCryptoWalletAddressError(walletAddressError));
  hasErrors = !!walletAddressError;

  // Update areErrors state
  dispatch(setAreErrors(hasErrors));
}; 