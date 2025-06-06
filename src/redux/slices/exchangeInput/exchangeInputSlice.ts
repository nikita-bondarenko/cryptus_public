import { CryptoNetOption } from "@/components/exchange/CryptoNetSelect";
import { CurrencyOption } from "@/components/exchange/CurrencySelect";
import { ExchangeInputProps } from "@/components/exchange/ExchangeInputCrypto";
import { SelectOption } from "@/components/exchange/Select";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "next/dist/server/base-server";
import {
  InputOptions,
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
} from "./types";
import { initialState } from "./initValues";
import { CurrencyType } from "@/components/request/RequestDetails";

export const exchangeInputSlice = createSlice({
  name: "exchangeInput",
  initialState,
  reducers: {
    resetExchangeInput: (state) => {
   console.log('resetExchangeInput')
          state = initialState;
    },
    setFetchedData(state, action: SetFetchedDataAction) {
      state.rate = action.payload.rate;
      const options = action.payload.options;
      state.options = options;
      state.cryptoInput.currency = options.cryptoCurrencyOptions[0];
      state.cashInput.currency = options.nonCryptoCurrencyOptions[0];
      state.cardInput.currency = options.nonCryptoCurrencyOptions[0];
    },
    setCryptoInput(state, action: SetCryptoActionInput) {
      const { amountValue, currency, netValue, walletAddressValue } =
        action.payload;
      state.cryptoInput.amount.value = amountValue;
      state.cryptoInput.currency = currency;
      state.cryptoInput.net.value = netValue;
      state.cryptoInput.walletAddress.value = walletAddressValue;
    },
    setCardInput(state, action: SetCardActionInput) {
      const { amountValue, currency, bankValue, cardNumberValue } =
        action.payload;
      state.cardInput.amount.value = amountValue;
      state.cardInput.currency = currency;
      state.cardInput.bank.value = bankValue;
      state.cardInput.cardNumber.value = cardNumberValue;
    },
    setCashInput(state, action: SetCashInputAction) {
      const { amountValue, currency, cityValue } = action.payload;
      state.cashInput.amount.value = amountValue;
      state.cashInput.currency = currency;
      state.cashInput.city.value = cityValue;
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
  },
});

export const {
  resetExchangeInput,
  setFetchedData,
  setCardInput,
  setCashInput,
  setCryptoInput,
  setCardInputAmountValue,
  setCashInputAmountValue,
  setCryptoInputAmountValue,
  setActiveInputType,
  setAreErrors,
  setAreErrorsVisible,
  // Crypto Input Error Actions
  setCryptoAmountError,
  setCryptoNetError,
  setCryptoWalletAddressError,
  // Cash Input Error Actions
  setCashAmountError,
  setCashCityError,
  // Card Input Error Actions
  setCardAmountError,
  setCardBankError,
  setCardNumberError,
} = exchangeInputSlice.actions;
export default exchangeInputSlice.reducer;
