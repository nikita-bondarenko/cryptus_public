import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setCurrenciesBuy, setCurrenciesSell } from "../slices/exchangeInput/exchangeInputSlice";
import { AppDispatch, RootState } from "../store";
import { setOptionsAndCurrency } from "../helpers/exchangeInputListener/setOptionsAndCurrency";
import { calculateCityOptions } from "../helpers/exchangeInputListener/calculateCityOptions";

export const exchangeInputListener = createListenerMiddleware();

// exchangeInputListener.startListening({
//   actionCreator: setCurrenciesSell,
//   effect: async (action, listenerApi) => {
//     const state = listenerApi.getState() as RootState;
//     const { selectedGiveType } = state.exchangeType;
//    setOptionsAndCurrency(state,listenerApi.dispatch as AppDispatch, selectedGiveType, action.payload)
//   },
// });

// exchangeInputListener.startListening({
//     actionCreator: setCurrenciesBuy,
//     effect: async (action, listenerApi) => {
//       const state = listenerApi.getState() as RootState;
//       const { selectedReceieveType } = state.exchangeType;
//      setOptionsAndCurrency(state, listenerApi.dispatch as AppDispatch, selectedReceieveType, action.payload)
 
//     },
//   });