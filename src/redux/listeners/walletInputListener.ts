import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { setCryptoWalletAddress } from "../slices/exchangeInput/exchangeInputSlice";
import { validateWalletAddressInput } from "../helpers/validateWalletAddressInput";

export const walletInputListener = createListenerMiddleware();

walletInputListener.startListening({
  matcher: isAnyOf(setCryptoWalletAddress),
  effect: async (action, listenerApi) => {
    validateWalletAddressInput({ action, listenerApi });
  },
}); 