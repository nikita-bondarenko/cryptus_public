import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  setCardInputAmountValue,
  setCashInputAmountValue,
  setCryptoInputAmountValue,
} from "../slices/exchangeInput/exchangeInputSlice";
import { calculateInputAmountBasedOnAnotherOne } from "../helpers/calculateInputAmountBasedOnAnotherOne";
import { validateAmountInput } from "../helpers/validateAmountInput";
import { AmountAction, ListenerProps } from "./types";
import { SetInputAmountValueActionPayload } from "../slices/exchangeInput/types";

export const amountInputListener = createListenerMiddleware();

amountInputListener.startListening({
  matcher: isAnyOf(
    setCardInputAmountValue,
    setCashInputAmountValue,
    setCryptoInputAmountValue
  ),
  effect: async (action: SetInputAmountValueActionPayload, listenerApi) => {
    validateAmountInput({ action, listenerApi } as ListenerProps<number>);
    calculateInputAmountBasedOnAnotherOne({ action, listenerApi } as ListenerProps<number>);
  },
});
