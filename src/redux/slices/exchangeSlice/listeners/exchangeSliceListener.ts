import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  filterReceiveVariants,
  setCities,
  setCurrenciesBuy,
  setCurrenciesSell,
  setCurrencyBuyTypeOptions,
  setExchangeRate,
  setNetworks,
  setSelectedCityValue,
  setSelectedCurrencyBuy,
  setSelectedCurrencyBuyType,
  setSelectedCurrencySell,
  setSelectedCurrencySellType,
  setSelectedNetworkValue,
} from "../exchangeSlice";
import { api } from "@/api/api";
import { RootState } from "@/redux/store";
import { DirectionType } from "@/api/types";

export const exchangeSliceListener = createListenerMiddleware();

exchangeSliceListener.startListening({
  actionCreator: setSelectedCurrencySellType,
  effect: async (action, listenerApi) => {
    console.log(action);
    if (!action.payload) return;

    const currencyBuyTypeOptions = filterReceiveVariants(action.payload);
    listenerApi.dispatch(setCurrencyBuyTypeOptions(currencyBuyTypeOptions));
    listenerApi.dispatch(
      setSelectedCurrencyBuyType(currencyBuyTypeOptions[0].type)
    );

    const currenciesSell = await listenerApi.dispatch(
      api.endpoints.getCurrenciesSell.initiate(action.payload)
    );
    if (!currenciesSell.data) return;
    listenerApi.dispatch(setCurrenciesSell(currenciesSell.data));
  },
});

exchangeSliceListener.startListening({
  actionCreator: setSelectedCurrencyBuyType,
  effect: async (action, listenerApi) => {
    console.log(action);
  },
});

exchangeSliceListener.startListening({
  actionCreator: setCurrenciesSell,
  effect: async (action, listenerApi) => {
    if (!action.payload) return;
    const selectedCurrency = action.payload[0];

    listenerApi.dispatch(setSelectedCurrencySell(selectedCurrency));
   
  },
});

exchangeSliceListener.startListening({
  actionCreator: setSelectedCurrencySell,
  effect: async (action, listenerApi) => {
    if (!action.payload) return;
    const state = listenerApi.getState() as RootState;
    const { selectedCurrencyBuyType, selectedCurrencySellType, selectedCurrencyBuy } =
    state.exchange;
    const selectedCurrencySell = action.payload
    const currencyType = state.exchange.selectedCurrencyBuyType;

    if (
        action.payload.directions.length !== 0 &&
        action.payload.type === "COIN" && 
        action.payload.directions[0]
      ) {
        listenerApi.dispatch(setNetworks(action.payload.directions));
        listenerApi.dispatch(setSelectedNetworkValue(action.payload.directions[0]));
      }

    if (!currencyType || !selectedCurrencySell.id) return;
    const currenciesBuy = await listenerApi.dispatch(
        api.endpoints.getCurrenciesBuy.initiate({
          give_currency_id: selectedCurrencySell.id,
          currency_type: currencyType,
        })
      );
  
      if (!currenciesBuy.data) return;
      listenerApi.dispatch(setCurrenciesBuy(currenciesBuy.data));
      listenerApi.dispatch(setSelectedCurrencyBuy(currenciesBuy.data[0]));

      if (
        selectedCurrencyBuyType !== "CASH" &&
        selectedCurrencySellType !== "CASH"
      ) {
        if (!selectedCurrencyBuy?.id) return;
        const rate = await listenerApi.dispatch(
          api.endpoints.getExchangeRate.initiate({
            give_currency: selectedCurrencySell.id,
            get_currency: selectedCurrencyBuy.id,
            direction:
              `${selectedCurrencySellType} - ${selectedCurrencyBuyType}` as DirectionType,
          })
        );
        if (!rate.data) return;
        listenerApi.dispatch(setExchangeRate(rate.data));
        return;
      }
      const cities = await listenerApi.dispatch(
        api.endpoints.getCities.initiate({
          currency_give: selectedCurrencySell.id,
          currency_get: action.payload.id,
        })
      );
      if (!cities.data) return;
      listenerApi.dispatch(setCities(cities.data));
  },
});

exchangeSliceListener.startListening({
  actionCreator: setSelectedCurrencyBuy,
  effect: async (action, listenerApi) => {
    if (!action.payload) return;
    const state = listenerApi.getState() as RootState;
    const selectedCurrencySellId = state.exchange.selectedCurrencySell?.id;
    const { selectedCurrencyBuyType, selectedCurrencySellType } =
      state.exchange;
    if (!selectedCurrencySellId) return;

    if (
      action.payload.directions.length !== 0 &&
      action.payload.type === "COIN" && 
      action.payload.directions[0]
    ) {
      listenerApi.dispatch(setNetworks(action.payload.directions));
      listenerApi.dispatch(setSelectedNetworkValue(action.payload.directions[0]));
    }

    if (
      selectedCurrencyBuyType !== "CASH" &&
      selectedCurrencySellType !== "CASH"
    ) {
      const rate = await listenerApi.dispatch(
        api.endpoints.getExchangeRate.initiate({
          give_currency: selectedCurrencySellId,
          get_currency: action.payload.id,
          direction:
            `${selectedCurrencySellType} - ${selectedCurrencyBuyType}` as DirectionType,
        })
      );
      if (!rate.data) return;
      listenerApi.dispatch(setExchangeRate(rate.data));
      return;
    }
    const cities = await listenerApi.dispatch(
      api.endpoints.getCities.initiate({
        currency_give: selectedCurrencySellId,
        currency_get: action.payload.id,
      })
    );
    if (!cities.data) return;
    listenerApi.dispatch(setCities(cities.data));
  },
});

exchangeSliceListener.startListening({
  actionCreator: setSelectedCityValue,
  effect: async (action, listenerApi) => {
    if (!action.payload) return;
    const state = listenerApi.getState() as RootState;
    const selectedCurrencySellId = state.exchange.selectedCurrencySell?.id;
    const selectedCurrencyBuyId = state.exchange.selectedCurrencyBuy?.id;
    const { selectedCurrencyBuyType, selectedCurrencySellType } =
      state.exchange;
    if (
      !action.payload ||
      !selectedCurrencySellId ||
      !selectedCurrencyBuyId
    )
      return;

    const rate = await listenerApi.dispatch(
      api.endpoints.getExchangeRate.initiate({
        give_currency: selectedCurrencySellId,
        get_currency: selectedCurrencyBuyId,
        direction:
          `${selectedCurrencySellType} - ${selectedCurrencyBuyType}` as DirectionType,
        city: action.payload.id,
      })
    );
    if (!rate.data) return;
    listenerApi.dispatch(setExchangeRate(rate.data));
  },
});
