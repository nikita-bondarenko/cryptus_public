import { AppDispatch } from "./../store";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  setCardInput,
  setCashInput,
  setCryptoInput,
} from "../slices/exchangeInput/exchangeInputSlice";
import { RootState } from "../store";
import { dispatchNonCrypto, dispatchCrypto, getCurrencyTypeFromAction } from "../helpers";

export const exchangeInputValueChangingListener = createListenerMiddleware();

exchangeInputValueChangingListener.startListening({
  matcher: isAnyOf(setCardInput, setCashInput, setCryptoInput),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const dispatch = listenerApi.dispatch as AppDispatch;

    const { selectedGiveType, selectedReceieveType } = state.exchangeType;
    const rate = state.exchangeInput.rate;
    const { amountValue: value } = action.payload as { amountValue: number };

    const activeInputType = state.exchangeInput.activeInputType;
    const sourseType = getCurrencyTypeFromAction(action.type);   

    if (activeInputType !== sourseType) return

    if (rate.from.value === null || rate.to.value === null) {
      console.error("Rate is not set");
      return;
    }

    if (value === null) {
      console.error("Value is not number");
      return;
    }
    const coifficient = rate.from.value / rate.to.value;

    if (action.type === setCryptoInput.type) {
      dispatchNonCrypto({
        selectedReceiveType: selectedReceieveType,
        selectedGiveType,
        value,
        dispatch,
        coifficient,
      });
    } else {
      dispatchCrypto({
        selectedReceiveType: selectedReceieveType,
        selectedGiveType,
        value,
        dispatch,
        coifficient,
      });
    }
  },
});
