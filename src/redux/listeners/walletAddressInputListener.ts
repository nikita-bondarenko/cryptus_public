import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { setCryptoWalletAddress } from "../slices/exchangeInput/exchangeInputSlice";
import { validateWalletAddressInput } from "../helpers/validateWalletAddressInput";
import { StringAction, ListenerProps } from "./types";
import { SetCryptoWalletAddressAction } from "../slices/exchangeInput/types";

export const walletAddressInputListener = createListenerMiddleware();

walletAddressInputListener.startListening({
  matcher: isAnyOf(setCryptoWalletAddress),
  effect: async (action: SetCryptoWalletAddressAction, listenerApi) => {
    validateWalletAddressInput({ action, listenerApi } as ListenerProps<string | null>);
  },
}); 