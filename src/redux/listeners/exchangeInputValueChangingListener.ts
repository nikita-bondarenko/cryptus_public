import { AppDispatch } from "./../store";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  setCardInput,
  setCashInput,
  setCryptoInput,
  setCryptoAmountError,
  setCryptoWalletAddressError,
  setCashAmountError,
  setCashCityError,
  setCardAmountError,
  setCardBankError,
  setCardNumberError,
  setAreErrors,
} from "../slices/exchangeInput/exchangeInputSlice";
import { RootState } from "../store";
import {
  dispatchNonCrypto,
  dispatchCrypto,
  getCurrencyTypeFromAction,
  validateExchangeInput,
} from "../helpers";
import { CurrencyPosition } from "@/components/request/RequestDetails";

export const exchangeInputValueChangingListener = createListenerMiddleware();

exchangeInputValueChangingListener.startListening({
  matcher: isAnyOf(setCardInput, setCashInput, setCryptoInput),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const dispatch = listenerApi.dispatch as AppDispatch;

    const { selectedGiveType, selectedReceieveType } = state.exchangeType;
    const rate = state.exchangeInput.rate;
    const { amountValue: value } = action.payload as { amountValue: number };
    const minValue = state.exchangeInput.minValue;

    const activeInputType = state.exchangeInput.activeInputType;
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
    if (action.type === setCryptoInput.type) {
      const { walletAddressValue } = action.payload as {
        walletAddressValue: string;
      };

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

      // Validate crypto specific fields
      const walletAddressError = validateExchangeInput({
        value: walletAddressValue,
        inputType: "walletAddress",
        position,
        minValue,
      });

      // Dispatch errors
      dispatch(setCryptoAmountError(amountError));
      dispatch(setCryptoWalletAddressError(walletAddressError));

      hasErrors = !!(amountError || walletAddressError);
    } else if (action.type === setCardInput.type) {
      const { bankValue, cardNumberValue } = action.payload as {
        bankValue: unknown;
        cardNumberValue: string;
      };

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
      const bankError = validateExchangeInput({
        value: bankValue,
        inputType: "bank",
        position,
        minValue,
      });

      const cardNumberError = validateExchangeInput({
        value: cardNumberValue,
        inputType: "cardNumber",
        position,
        minValue,
      });

      // Dispatch errors
      dispatch(setCardAmountError(amountError));
      dispatch(setCardBankError(bankError));
      dispatch(setCardNumberError(cardNumberError));

      hasErrors = !!(amountError || bankError || cardNumberError);
    } else if (action.type === setCashInput.type) {
      const { cityValue } = action.payload as { cityValue: string };

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

      // Validate cash specific fields
      const cityError = validateExchangeInput({
        value: cityValue,
        inputType: "city",
        position,
        minValue,
      });

      // Dispatch errors
      dispatch(setCashAmountError(amountError));
      dispatch(setCashCityError(cityError));

      hasErrors = !!(amountError || cityError);
    }

    // Update areErrors state
    dispatch(setAreErrors(hasErrors));

    if (activeInputType !== sourseType) {
      return;
    }

    if (action.type === setCryptoInput.type) {
      dispatchNonCrypto({
        selectedReceiveType: selectedReceieveType,
        selectedGiveType,
        value,
        dispatch,
        rate,
      });
    } else {
      dispatchCrypto({
        selectedReceiveType: selectedReceieveType,
        selectedGiveType,
        value,
        dispatch,
        rate,
      });
    }
  },
});
