import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setCardNumber } from "../slices/exchangeInput/exchangeInputSlice";
import { validateCardNumber } from "../helpers/validateCardNumber";

export const cardNumberListener = createListenerMiddleware();

cardNumberListener.startListening({
  actionCreator: setCardNumber,
  effect: async (action, listenerApi) => {
    validateCardNumber({ action, listenerApi });
  },
}); 