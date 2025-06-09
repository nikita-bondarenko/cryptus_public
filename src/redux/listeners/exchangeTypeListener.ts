import { createListenerMiddleware, ListenerEffectAPI, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/api/api";
import { calculateCurrencyTypeForFetching } from "@/helpers/calculateCurrencyTypeForFetching";
import { translateCurrencies } from "@/helpers/translateCurrencies";
import { setInitFetchedData } from "../slices/exchangeInput/exchangeInputSlice";
import { selectGiveType, selectReceiveType } from "../slices/exchangeTypeSlice";
import { AppDispatch, RootState } from "../store";
import { calculateRate } from "@/helpers/calculateRate";
import { calculateDirections } from "@/helpers/calculateDirections";
import { getCurrencyOptions } from "../helpers/getCurrencyOptions";
import { translateCities } from "../helpers/translateCIties";
import { calculateInitFetchedData } from "../helpers/calculateInitFetchedData";
import { CurrencyType } from "@/components/request/RequestDetails";

export const exchangeTypeListener = createListenerMiddleware();

// Listen for changes in selectedGiveType
exchangeTypeListener.startListening({
  actionCreator: selectGiveType,
  effect: async (action, listenerApi) => {
    calculateInitFetchedData(listenerApi as ListenerEffectAPI<RootState, AppDispatch, PayloadAction<CurrencyType>>)

  },
});

// Listen for changes in selectedReceieveType
exchangeTypeListener.startListening({
  actionCreator: selectReceiveType,
  effect: async (action, listenerApi) => {
    calculateInitFetchedData(listenerApi as ListenerEffectAPI<RootState, AppDispatch, PayloadAction<CurrencyType>>)
  },
});
