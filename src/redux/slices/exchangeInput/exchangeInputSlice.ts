import { createSlice } from "@reduxjs/toolkit";
import {
  SetActiveInputTypeAction,
  SetAreErrorsAction,
  SetAreErrorsVisibleAction,
  SetCardActionInput,
  SetCashInputAction,
  SetCryptoActionInput,
  SetFetchedDataAction,
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
} from "./types";
import { initialState } from "./initValues";

export const exchangeInputSlice = createSlice({
  name: "exchangeInput",
  initialState,
  reducers: {
    resetExchangeInput: (state) => {
      Object.assign(state, initialState);
    },
    setFetchedData(state, action: SetFetchedDataAction) {
      state.rate = action.payload.rate;
      const options = action.payload.options;
      if (state.options.cryptoCurrencyOptions.length === 0) {
        state.options.cryptoCurrencyOptions = options.cryptoCurrencyOptions;
      }
      if (state.options.nonCryptoCurrencyOptions.length === 0) {
        state.options.nonCryptoCurrencyOptions = options.nonCryptoCurrencyOptions;
      }
      if (state.options.bankOptions.length === 0) {
        state.options.bankOptions = options.bankOptions;
      }
      if (state.options.cityOptions.length === 0) {
        state.options.cityOptions = options.cityOptions;
      }
      if (state.cryptoInput.currency === null) {
      state.cryptoInput.currency = options.cryptoCurrencyOptions[0];
      }
      if (state.cashInput.currency === null) {
        state.cashInput.currency = options.nonCryptoCurrencyOptions[0];
      }
      if (state.cardInput.currency === null) {
        state.cardInput.currency = options.nonCryptoCurrencyOptions[0];
      }
        
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
  setFetchedData,
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
} = exchangeInputSlice.actions;
export default exchangeInputSlice.reducer;
