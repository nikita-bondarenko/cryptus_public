import { CurrencyPosition } from "@/components/request/RequestDetails";
import { AppDispatch, RootState } from "../store";
import { ListenerEffectAPI, PayloadAction } from "@reduxjs/toolkit";
import { validateExchangeInput } from "./validateExchangeInput";
import { setCryptoWalletAddressError, setAreErrors, setCryptoWalletAddress } from "../slices/exchangeInput/exchangeInputSlice";
import { SetCryptoWalletAddressAction } from "../slices/exchangeInput/types";

export type ValidateWalletAddressInputProps = {
  action: SetCryptoWalletAddressAction;
  listenerApi: ListenerEffectAPI<RootState, AppDispatch, SetCryptoWalletAddressAction>;
};

export const validateWalletAddressInput = ({
  action,
  listenerApi,
}: ValidateWalletAddressInputProps) => {
  const state = listenerApi.getState();
  const dispatch = listenerApi.dispatch;

  const { selectedGiveType, selectedReceieveType } = state.exchangeType;
  const minValue = state.exchangeInput.minValue;
  const sourseType = "COIN";
  
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