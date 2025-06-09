import { GroupedCurrency } from "@/api/types";
import { CurrencyPosition, CurrencyType } from "@/components/request/RequestDetails";
import { translateCurrencies } from "@/helpers/translateCurrencies";
import { setCardCurrenciesOptions, setCardCurrency, setCashCurrenciesOptions, setCashCurrency, setCryptoCurrenciesOptions, setCryptoCurrency, setNetworks } from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ListenerEffectAPI, PayloadAction } from "@reduxjs/toolkit";
import { calculateNetworksOptions } from "./calculateNetworksOptions";
import { calculateBanksOptions } from "./calculateBanksOptions";
import { calculateCityOptions } from "./calculateCityOptions";

export const setOptionsAndCurrency=  async (state: RootState, dispatch: AppDispatch, currencyType: CurrencyType, currencies: GroupedCurrency[]) => {
const translatedCurrencies = translateCurrencies(currencies)
const selectedCurrency = translatedCurrencies[0]
const selecterFetchedCurrency = currencies[0]

switch (currencyType) {
    case "COIN":
        dispatch(setCryptoCurrenciesOptions(translatedCurrencies))
        dispatch(setCryptoCurrency(selectedCurrency))
        calculateNetworksOptions(dispatch, state, selecterFetchedCurrency)
        break;
    case "BANK":
        dispatch(setCardCurrenciesOptions(translatedCurrencies))
        dispatch(setCardCurrency(selectedCurrency))
        calculateBanksOptions(dispatch, state, selecterFetchedCurrency)
        break;
    case "CASH":
        dispatch(setCashCurrenciesOptions(translatedCurrencies))
        dispatch(setCashCurrency(selectedCurrency))
        break;
}


};