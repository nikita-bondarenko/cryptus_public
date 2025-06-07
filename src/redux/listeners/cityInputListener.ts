import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { setCashCity } from "../slices/exchangeInput/exchangeInputSlice";
import { validateCityInput } from "../helpers/validateCityInput";

export const cityInputListener = createListenerMiddleware();

cityInputListener.startListening({
  matcher: isAnyOf(setCashCity),
  effect: async (action, listenerApi) => {
    validateCityInput({ action, listenerApi });
  },
}); 