import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setCardBank } from "../slices/exchangeInput/exchangeInputSlice";
import { validateCardBank } from "../helpers/validateCardBank";
import { SelectOptionAction, ListenerProps } from "./types";
import { SelectOption } from "@/components/exchange/BankSelect";

export const cardBankListener = createListenerMiddleware();

cardBankListener.startListening({
  actionCreator: setCardBank,
  effect: async (action: SelectOptionAction, listenerApi) => {
    validateCardBank({ action, listenerApi } as ListenerProps<SelectOption | null>);
  },
}); 