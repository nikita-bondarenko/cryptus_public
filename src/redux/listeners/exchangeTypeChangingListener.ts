import { AppDispatch } from "../store";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { selectGiveType, selectReceiveType } from "../slices/exchangeTypeSlice";
import { resetExchangeInput, setFetchedData } from "../slices/exchangeInput/exchangeInputSlice";
import { RootState } from "../store";
import { validateAllFields } from "../helpers";

export const exchangeTypeChangingListener = createListenerMiddleware();

exchangeTypeChangingListener.startListening({
  matcher: isAnyOf(selectGiveType, selectReceiveType),
  effect: async (action, listenerApi) => {
 
  },
}); 