import { CryptoNetOption } from "@/components/exchange/CryptoNetSelect";
import { CurrencyOption } from "@/components/exchange/CurrencySelect";
import { ExchangeInputProps } from "@/components/exchange/ExchangeInputCrypto";
import { SelectOption } from "@/components/exchange/Select";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "next/dist/server/base-server";
import {
  InputOptions,
  SetCardActionInput,
  SetCashInputAction,
  SetCryptoActionInput,
  SetFetchedDataAction,
  SetInputAmountValueActionPayload,
} from "./types";
import { initialState } from "./initValues";
import { CurrencyType } from "@/components/request/RequestDetails";

export const exchangeInputSlice = createSlice({
  name: "exchangeInput",
  initialState,
  reducers: {
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
    setActiveInputType: (state, action: PayloadAction<CurrencyType | null>) => {
      state.activeInputType = action.payload;
    },
  },
});

export const {
  setFetchedData,
  setCardInput,
  setCashInput,
  setCryptoInput,
  setCardInputAmountValue,
  setCashInputAmountValue,
  setCryptoInputAmountValue,
  setActiveInputType
} = exchangeInputSlice.actions;
export default exchangeInputSlice.reducer;
