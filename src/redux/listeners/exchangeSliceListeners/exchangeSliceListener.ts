import {
  ExchangeBank,
} from "@/redux/slices/exchangeSlice/exchangeSlice";
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
} from "../../slices/exchangeSlice/exchangeSlice";
import { RootState } from "@/redux/store";


export const exchangeSliceListener = createListenerMiddleware();
