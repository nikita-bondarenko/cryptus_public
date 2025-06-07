import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setCardNumber } from "../slices/exchangeInput/exchangeInputSlice";
import { validateCardNumber } from "../helpers/validateCardNumber";
import { StringAction, ListenerProps } from "./types";
import { SetCardNumberAction } from "../slices/exchangeInput/types";

export const cardNumberListener = createListenerMiddleware();

cardNumberListener.startListening({
  actionCreator: setCardNumber,
  effect: async (action: SetCardNumberAction, listenerApi) => {
    validateCardNumber({ action, listenerApi } as ListenerProps<string | null>);
  },
}); 