import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SetActiveInputTypeAction,
  SetAreErrorsAction,
  SetAreErrorsVisibleAction,
  SetCardActionInput,
  SetCashInputAction,
  SetCryptoActionInput,
  SetInitFetchedDataAction,
  SetInputAmountValueActionPayload,
  SetCryptoAmountErrorAction,
  SetCryptoNetErrorAction,
  SetCryptoWalletAddressErrorAction,
  SetCashAmountErrorAction,
  SetCashCityErrorAction,
  SetCardAmountErrorAction,
  SetCardBankErrorAction,
  SetCardNumberErrorAction,
  SetCardCurrencyAction,
  SetCardBankAction,
  SetCardNumberAction,
  SetCashCurrencyAction,
  SetCashCityAction,
  SetCryptoCurrencyAction,
  SetCryptoNetAction,
  SetCryptoWalletAddressAction,
  Bank,
  Network,
} from "./types";
import { initialState } from "./initValues";
import { City, ExchangeRate, GroupedCurrency } from "@/api/types";
import { CurrencyOption } from "@/components/exchange/CurrencySelect";
import { translateNetworks } from "@/redux/helpers/exchangeInputListener/translateNetworks";
import { translateCities } from "@/redux/helpers/translateCities";

export const exchangeInputSlice = createSlice({
  name: "exchangeInput",
  initialState,
  reducers: {
    resetExchangeInput: (state) => {
      Object.assign(state, initialState);
    },
    setInitFetchedData(state, action: SetInitFetchedDataAction) {
      if (action.payload.rate) {
        state.rate = action.payload.rate
      }
      const options = action.payload.options;
      if (state.options.cryptoCurrencyOptions?.length === 0 && options.cryptoCurrencyOptions) {
        state.options.cryptoCurrencyOptions = options.cryptoCurrencyOptions;
      }
      if (state.options.cardCurrencyOptions?.length === 0 && options.cardCurrencyOptions) {
        state.options.cardCurrencyOptions = options.cardCurrencyOptions;
      }
      if (state.options.cashCurrencyOptions?.length === 0 && options.cashCurrencyOptions) {
        state.options.cashCurrencyOptions = options.cashCurrencyOptions;
      }
      if (state.options.bankOptions?.length === 0 && options.bankOptions) {
        state.options.bankOptions = options.bankOptions;
      }
      if (state.options.cityOptions?.length === 0 && options.cityOptions) {
        state.options.cityOptions = options.cityOptions;
      }
      if (state.options.netsOptions?.length === 0 && options.netsOptions) {
        state.options.netsOptions = options.netsOptions;
      }
      if (state.cryptoInput.currency === null && options.cryptoCurrencyOptions) {
        state.cryptoInput.currency = options.cryptoCurrencyOptions[0];
      }
      if (state.cashInput.currency === null && options.cashCurrencyOptions) {
        state.cashInput.currency = options.cashCurrencyOptions[0];
      }
      if (state.cardInput.currency === null && options.cardCurrencyOptions) {
        state.cardInput.currency = options.cardCurrencyOptions[0];
      }
      if (state.cryptoInput.net.value === null && options.netsOptions) {
        state.cryptoInput.net.value = options.netsOptions[0];
      }
    },

    setCryptoCurrenciesOptions(state, action: PayloadAction<CurrencyOption[]>) {
      state.options.cryptoCurrencyOptions = action.payload;
    },
    setCardCurrenciesOptions(state, action: PayloadAction<CurrencyOption[]>) {
      state.options.cardCurrencyOptions = action.payload;
    },
    setCashCurrenciesOptions(state, action: PayloadAction<CurrencyOption[]>) {
      state.options.cashCurrencyOptions = action.payload;
    },

    setCurrenciesSell(state, action: PayloadAction<GroupedCurrency[]>) {
      state.currenciesSell = action.payload;
      
    },
    setCurrenciesBuy(state, action: PayloadAction<GroupedCurrency[]>) {
      state.currenciesBuy = action.payload;
    },
    setCities(state, action: PayloadAction<City[]>) {
      state.cities = action.payload;
      state.options.cityOptions = translateCities(action.payload)
    },
    setNetworks(state, action: PayloadAction<Network[]>) {
      state.networks = action.payload;
      state.options.netsOptions = translateNetworks(action.payload)
    },
    setBanks(state, action: PayloadAction<Bank[]>) {
      state.banks = action.payload;
    },
    setExchangeRate(state, action: PayloadAction<ExchangeRate>) {
      state.exchangeRate = action.payload;
    },
    setCryptoInputAmountValue(state, action: SetInputAmountValueActionPayload) {
      state.cryptoInput.amount.value = action.payload;
    },
    setCardInputAmountValue(state, action: SetInputAmountValueActionPayload) {
      state.cardInput.amount.value = action.payload;
    },
    setCashInputAmountValue(state, action: SetInputAmountValueActionPayload) {
      state.cashInput.amount.value = action.payload;
    },
    setAutomaticlyCryptoInputAmountValue(state, action: SetInputAmountValueActionPayload) {
      state.cryptoInput.amount.value = action.payload;
    },
    setAutomaticlyCardInputAmountValue(state, action: SetInputAmountValueActionPayload) {
      state.cardInput.amount.value = action.payload;
    },
    setAutomaticlyCashInputAmountValue(state, action: SetInputAmountValueActionPayload) {
      state.cashInput.amount.value = action.payload;
    },
    setActiveInputType: (state, action: SetActiveInputTypeAction) => {
      state.activeInputType = action.payload;
    },
    setAreErrorsVisible: (state, action: SetAreErrorsVisibleAction) => {
      state.areErrorsVisible = action.payload;
    },
    setAreErrors: (state, action: SetAreErrorsAction) => {
      state.areErrors = action.payload;
    },
    
    // Crypto Input Error Reducers
    setCryptoAmountError: (state, action: SetCryptoAmountErrorAction) => {
      state.cryptoInput.amount.error = action.payload;
    },
    setCryptoNetError: (state, action: SetCryptoNetErrorAction) => {
      state.cryptoInput.net.error = action.payload;
    },
    setCryptoWalletAddressError: (state, action: SetCryptoWalletAddressErrorAction) => {
      state.cryptoInput.walletAddress.error = action.payload;
    },

    // Cash Input Error Reducers
    setCashAmountError: (state, action: SetCashAmountErrorAction) => {
      state.cashInput.amount.error = action.payload;
    },
    setCashCityError: (state, action: SetCashCityErrorAction) => {
      state.cashInput.city.error = action.payload;
    },

    // Card Input Error Reducers
    setCardAmountError: (state, action: SetCardAmountErrorAction) => {
      state.cardInput.amount.error = action.payload;
    },
    setCardBankError: (state, action: SetCardBankErrorAction) => {
      state.cardInput.bank.error = action.payload;
    },
    setCardNumberError: (state, action: SetCardNumberErrorAction) => {
      state.cardInput.cardNumber.error = action.payload;
    },

    // Card Input Reducers
    setCardCurrency: (state, action: SetCardCurrencyAction) => {
      state.cardInput.currency = action.payload;
    },
    setCardBank: (state, action: SetCardBankAction) => {
      state.cardInput.bank.value = action.payload;
    },
    setCardNumber: (state, action: SetCardNumberAction) => {
      state.cardInput.cardNumber.value = action.payload;
    },

    // Cash Input Reducers
    setCashCurrency: (state, action: SetCashCurrencyAction) => {
      state.cashInput.currency = action.payload;
    },
    setCashCity: (state, action: SetCashCityAction) => {
      state.cashInput.city.value = action.payload;
    },

    // Crypto Input Reducers
    setCryptoCurrency: (state, action: SetCryptoCurrencyAction) => {
      state.cryptoInput.currency = action.payload;
    },
    setCryptoNet: (state, action: SetCryptoNetAction) => {
      state.cryptoInput.net.value = action.payload;
    },
    setCryptoWalletAddress: (state, action: SetCryptoWalletAddressAction) => {
      state.cryptoInput.walletAddress.value = action.payload;
    },
  },
});

export const {
  resetExchangeInput,
  setInitFetchedData,
  setCardInputAmountValue,
  setCashInputAmountValue,
  setCryptoInputAmountValue,
  setActiveInputType,
  setAreErrors,
  setAreErrorsVisible,
  setCryptoAmountError,
  setCryptoNetError,
  setCryptoWalletAddressError,
  setCashAmountError,
  setCashCityError,
  setCardAmountError,
  setCardBankError,
  setCardNumberError,
  setAutomaticlyCryptoInputAmountValue,
  setAutomaticlyCardInputAmountValue,
  setAutomaticlyCashInputAmountValue,
  setCardCurrency,
  setCardBank,
  setCardNumber,
  setCashCurrency,
  setCashCity,
  setCryptoCurrency,
  setCryptoNet,
  setCryptoWalletAddress,
  setCurrenciesSell,
  setCurrenciesBuy,
  setCities,
  setNetworks,
  setBanks,
  setExchangeRate,
  setCryptoCurrenciesOptions,
  setCardCurrenciesOptions,
  setCashCurrenciesOptions,
} = exchangeInputSlice.actions;
export default exchangeInputSlice.reducer;
