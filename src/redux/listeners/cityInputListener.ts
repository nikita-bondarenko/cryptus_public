import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { setCashCity } from "../slices/exchangeInput/exchangeInputSlice";
import { validateCityInput } from "../helpers/validateCityInput";
import { ListenerProps, StringAction } from "./types";
import { SetCashCityAction } from "../slices/exchangeInput/types";

export const cityInputListener = createListenerMiddleware();

cityInputListener.startListening({
  matcher: isAnyOf(setCashCity),
  effect: async (action: SetCashCityAction, listenerApi) => {
    validateCityInput({ action, listenerApi } as ListenerProps<string>);
  },
}); 