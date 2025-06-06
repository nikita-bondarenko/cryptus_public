import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { selectGiveType, selectReceiveType } from "../slices/exchangeTypeSlice";

export const exchangeTypeChangingListener = createListenerMiddleware();

exchangeTypeChangingListener.startListening({
  matcher: isAnyOf(selectGiveType, selectReceiveType),
  effect: async () => {
 
  },
}); 