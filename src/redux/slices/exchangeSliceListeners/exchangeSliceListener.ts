import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  filterReceiveVariants,
  setBanks,
  setCities,
  setCurrenciesBuy,
  setCurrenciesSell,
  setCurrencyBuyAmountValue,
  setCurrencyBuyTypeOptions,
  setCurrencySellAmountValue,
  setExchangeRate,
  setNetworks,
  setSelectedBankValue,
  setSelectedCityValue,
  setSelectedCurrencyBuy,
  setSelectedCurrencyBuyType,
  setSelectedCurrencySell,
  setSelectedCurrencySellType,
  setSelectedNetworkValue,
} from "../exchangeSlice/exchangeSlice";
import { api } from "@/api/api";
import { RootState } from "@/redux/store";
import { DirectionType, ExchangeRate } from "@/api/types";
import { ListenerEffect } from "@reduxjs/toolkit";
import { roundTo8 } from "@/redux/helpers";
import { Direction } from "@/helpers/calculateCurrencyTypeFromDirection";

const exchangeSliceListener = createListenerMiddleware();

exchangeSliceListener.startListening({
  actionCreator: setSelectedCurrencySellType,
  effect: async (action, listenerApi) => {
    if (!action.payload) return;
    const currencyBuyTypeOptions = filterReceiveVariants(action.payload);
    listenerApi.dispatch(setCurrencyBuyTypeOptions(currencyBuyTypeOptions));
        listenerApi.dispatch(
      setSelectedCurrencyBuyType(currencyBuyTypeOptions[0].type)
    );
  },
});

exchangeSliceListener.startListening({
  actionCreator: setSelectedCurrencyBuyType,
  effect: async (action, listenerApi) => {
    if (!action.payload) return;
    const state = listenerApi.getState() as RootState;
    const selectedCurrencySellType = state.exchange.selectedCurrencySellType;
    const currencyBuyType = action.payload;

    const currenciesSell = await listenerApi.dispatch(
      api.endpoints.getCurrenciesSell.initiate(
        `${selectedCurrencySellType} - ${currencyBuyType}` as Direction
      )
    );
    if (!currenciesSell.data) return;
    listenerApi.dispatch(setCurrenciesSell(currenciesSell.data));
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
    const {
      selectedCurrencyBuyType,
      selectedCurrencySellType,
      selectedCurrencyBuy,
    } = state.exchange;
    const selectedCurrencySell = action.payload;
    const currencyType = state.exchange.selectedCurrencyBuyType;

    if (action.payload.type === "COIN") {
      listenerApi.dispatch(setNetworks(action.payload.directions));
      listenerApi.dispatch(
        setSelectedNetworkValue(action.payload.directions[0] || null)
      );
    }

    if (action.payload.type === "BANK") {
      listenerApi.dispatch(setBanks(action.payload.directions));
      listenerApi.dispatch(setSelectedBankValue(null));
    }

    if (!currencyType || !selectedCurrencySell.id) return;
    const currenciesBuy = await listenerApi.dispatch(
      api.endpoints.getCurrenciesBuy.initiate({
        give_currency_id: selectedCurrencySell.id,
        currency_type: currencyType,
      })
    );

    if (!currenciesBuy.data) return;
    const updatedSelectedCurrencyBuy = currenciesBuy.data[0];
    listenerApi.dispatch(setCurrenciesBuy(currenciesBuy.data));
    listenerApi.dispatch(setSelectedCurrencyBuy(currenciesBuy.data[0]));

    if (
      selectedCurrencyBuyType !== "CASH" &&
      selectedCurrencySellType !== "CASH"
    ) {
      if (!updatedSelectedCurrencyBuy?.id) return;
      const rate = await listenerApi.dispatch(
        api.endpoints.getExchangeRate.initiate({
          give_currency: selectedCurrencySell.id,
          get_currency: updatedSelectedCurrencyBuy.id,
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
        currency_give: action.payload.id,
        currency_get: updatedSelectedCurrencyBuy.id,
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

    if (action.payload.type === "COIN") {
      listenerApi.dispatch(setNetworks(action.payload.directions));
      listenerApi.dispatch(
        setSelectedNetworkValue(action.payload.directions[0] || null)
      );
    }
    if (action.payload.type === "BANK") {
      listenerApi.dispatch(setBanks(action.payload.directions));
      listenerApi.dispatch(setSelectedBankValue(null));
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
    if (!action.payload || !selectedCurrencySellId || !selectedCurrencyBuyId)
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

const calculateInputAmountBasedOnAnotherOne = (
  amount: number | null,
  rate: ExchangeRate | null,
  position: "given" | "received"
): number | null => {
  if (!amount || !rate) return null;

  const { course } = rate;
  const actualRate = course;

  // console.log(amount, course);
  const res = position === "given" ? amount * actualRate : amount / actualRate;
  return roundTo8(res);
};

exchangeSliceListener.startListening({
  actionCreator: setCurrencySellAmountValue,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const { exchangeRate, activeInputType } = state.exchange;

    if (!exchangeRate || activeInputType !== "given") return;

    const calculatedAmount = calculateInputAmountBasedOnAnotherOne(
      action.payload,
      exchangeRate,
      "given"
    );

    if (calculatedAmount !== null) {
      listenerApi.dispatch(setCurrencyBuyAmountValue(calculatedAmount));
    }
  },
});

exchangeSliceListener.startListening({
  actionCreator: setCurrencyBuyAmountValue,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const { exchangeRate, activeInputType } = state.exchange;

    if (!exchangeRate || activeInputType !== "received") return;

    const calculatedAmount = calculateInputAmountBasedOnAnotherOne(
      action.payload,
      exchangeRate,
      "received"
    );

    if (calculatedAmount !== null) {
      listenerApi.dispatch(setCurrencySellAmountValue(calculatedAmount));
    }
  },
});

exchangeSliceListener.startListening({
  actionCreator: setExchangeRate,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const { currencySellAmount } = state.exchange;

    if (!action.payload || currencySellAmount.value === null) return;

    // Всегда пересчитываем сумму покупки на основе суммы продажи
    const calculatedAmount = calculateInputAmountBasedOnAnotherOne(
      currencySellAmount.value,
      action.payload,
      "given"
    );

    if (calculatedAmount !== null) {
      listenerApi.dispatch(setCurrencyBuyAmountValue(calculatedAmount));
    }
  },
});

const formatNumber = (num: number, decimals: number = 8) => {
  return num.toLocaleString("fullwide", {
    useGrouping: false,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export { exchangeSliceListener };
