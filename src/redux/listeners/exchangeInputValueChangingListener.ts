import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  setCardInputAmountValue,
  setCashInputAmountValue,
  setCryptoInputAmountValue,
} from "../slices/exchangeInput/exchangeInputSlice";

import { calculateInputAmountBasedOnAnotherOne } from "../helpers/calculateInputAmountBasedOnAnotherOne";
import { validateOneInputAmountValue } from "../helpers/validateOneInputAmountValue";

export const exchangeInputValueChangingListener = createListenerMiddleware();

exchangeInputValueChangingListener.startListening({
  matcher: isAnyOf(
    setCardInputAmountValue,
    setCashInputAmountValue,
    setCryptoInputAmountValue
  ),
  effect: async (action, listenerApi) => {
    validateOneInputAmountValue({ action, listenerApi });
    calculateInputAmountBasedOnAnotherOne({ action, listenerApi });
  },
});
