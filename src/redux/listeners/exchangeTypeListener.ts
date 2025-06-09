import {
  createListenerMiddleware,
  isAnyOf,
  ListenerEffectAPI,
  PayloadAction,
} from "@reduxjs/toolkit";
import { api } from "@/api/api";
import {
  calculateCurrencyTypeForFetching,
  ServerCurrencyType,
} from "@/helpers/calculateCurrencyTypeForFetching";
import { translateCurrencies } from "@/helpers/translateCurrencies";
import {
    setCardCurrency,
    setCashCurrency,
    setCryptoCurrency,
  setCurrenciesBuy,
  setCurrenciesSell,
  setInitFetchedData,
} from "../slices/exchangeInput/exchangeInputSlice";
import { selectGiveType, selectReceiveType } from "../slices/exchangeTypeSlice";
import { AppDispatch, RootState } from "../store";
import { calculateRate } from "@/helpers/calculateRate";
import { calculateDirections } from "@/helpers/calculateDirections";
import { getCurrencyOptions } from "../helpers/getCurrencyOptions";
import { calculateInitFetchedData } from "../helpers/calculateInitFetchedData";
import { CurrencyType } from "@/components/request/RequestDetails";
import { calculateCurrenciesBuy } from "../helpers/exchangeTypeListener/calculateCurrenciesBuy";

export const exchangeTypeListener = createListenerMiddleware();

// exchangeTypeListener.startListening({
//   actionCreator: selectGiveType,
//   effect: async (action, listenerApi) => {
//     const state = listenerApi.getState() as RootState;

//     const currenciesSellType: ServerCurrencyType =
//       calculateCurrencyTypeForFetching(action.payload as CurrencyType);

//     const currenciesSell = await listenerApi.dispatch(
//       api.endpoints.getCurrenciesSell.initiate(currenciesSellType)
//     );
//     if (currenciesSell.data) {
//       listenerApi.dispatch(setCurrenciesSell(currenciesSell.data));
//     }
//   },
// });

// Listen for changes in selectedGiveType
// exchangeTypeListener.startListening({
//   actionCreator: selectGiveType,
//   effect: async (action, listenerApi) => {
//     calculateInitFetchedData(listenerApi as ListenerEffectAPI<RootState, AppDispatch, PayloadAction<CurrencyType>>)

//   },
// });

// Listen for changes in selectedReceieveType
// exchangeTypeListener.startListening({
//   actionCreator: selectReceiveType,
//   effect: async (action, listenerApi) => {
//     calculateCurrenciesBuy(listenerApi.dispatch as AppDispatch, listenerApi.getState() as RootState)
//   },
// });

// exchangeTypeListener.startListening({
//     matcher: isAnyOf(setCryptoCurrency, setCardCurrency, setCashCurrency),
//     effect: async (action, listenerApi) => {
//       calculateCurrenciesBuy(listenerApi.dispatch as AppDispatch, listenerApi.getState() as RootState)
//     },
//   });
