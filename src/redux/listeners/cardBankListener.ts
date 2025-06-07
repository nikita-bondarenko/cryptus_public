import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setCardBank } from "../slices/exchangeInput/exchangeInputSlice";
import { validateCardBank } from "../helpers/validateCardBank";

export const cardBankListener = createListenerMiddleware();

cardBankListener.startListening({
  actionCreator: setCardBank,
  effect: async (action, listenerApi) => {
    validateCardBank({ action, listenerApi });
  },
}); 