import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { ExchangeInputState, CryptoInput, CashInput, CardInput } from "@/redux/slices/exchangeInput/types";
import { selectCurrencyTypes } from "./currencyTypesSelector";

// Section Heading Props Selector
export const selectSectionHeadingProps = (position: "given" | "received") =>
  createSelector(
    (state: RootState) => state.exchangeInput,
    (exchangeInput) => {
      return position === "given"
        ? { title: "Я отдаю", minValue: exchangeInput.minValue }
        : { title: "Я получаю", rate: exchangeInput.rate };
    }
  );

// Currency Types Selector
export { selectCurrencyTypes };

// Currency Options Selector
export const selectCurrencyOptions = (type: "card" | "cash" | "crypto") =>
  createSelector(
    (state: RootState) => state.exchangeInput.options,
    (options) => {
      switch (type) {
        case "crypto":
          return options.cryptoCurrencyOptions;
        case "card":
          return options.cardCurrencyOptions;
        case "cash":
          return options.cashCurrencyOptions;
        default:
          return [];
      }
    }
  );

// Bank Options Selector
export const selectBankOptions = createSelector(
  (state: RootState) => state.exchangeInput.options,
  (options) => options.bankOptions
);

// City Options Selector
export const selectCityOptions = createSelector(
  (state: RootState) => state.exchangeInput.options,
  (options) => options.cityOptions
);

// Nets Options Selector
export const selectNetsOptions = createSelector(
  (state: RootState) => state.exchangeInput.options,
  (options) => options.netsOptions
);

// Input Value Selector
export const selectInputValue = (type: "card" | "cash" | "crypto") =>
  createSelector(
    (state: RootState) => state.exchangeInput,
    (exchangeInput) => {
      const input = exchangeInput[`${type}Input` as keyof ExchangeInputState] as CryptoInput | CashInput | CardInput;
      return input?.amount.value ?? null;
    }
  );

// Bank Value Selector
export const selectBankValue = (state: RootState) => state.exchangeInput.cardInput.bank.value;

// City Value Selector
export const selectCityValue = (state: RootState) => state.exchangeInput.cashInput.city.value;

// Card Number Value Selector
export const selectCardNumberValue = (state: RootState) => state.exchangeInput.cardInput.cardNumber.value;

// Net Value Selector
export const selectNetValue = (state: RootState) => state.exchangeInput.cryptoInput.net.value;

// Wallet Address Value Selector
export const selectWalletAddressValue = (state: RootState) => state.exchangeInput.cryptoInput.walletAddress.value;

// Selected Currency Selectors
export const selectCardCurrency = (state: RootState) => state.exchangeInput.cardInput.currency;

export const selectCashCurrency = (state: RootState) => state.exchangeInput.cashInput.currency;

export const selectCryptoCurrency = (state: RootState) => state.exchangeInput.cryptoInput.currency;

// Error Selectors
export const selectValueError = (type: "card" | "cash" | "crypto") =>
  createSelector(
    (state: RootState) => state.exchangeInput,
    (exchangeInput) => {
      const input = exchangeInput[`${type}Input` as keyof ExchangeInputState] as CryptoInput | CashInput | CardInput;
      return input?.amount.error ?? null;
    }
  );

export const selectBankError = (state: RootState) => state.exchangeInput.cardInput.bank.error;

export const selectCardNumberError = (state: RootState) => state.exchangeInput.cardInput.cardNumber.error;

export const selectCityError = (state: RootState) => state.exchangeInput.cashInput.city.error;

export const selectWalletAddressError = (state: RootState) => state.exchangeInput.cryptoInput.walletAddress.error;

// Errors Visibility Selector
export const selectAreErrorsVisible = (state: RootState) => state.exchangeInput.areErrorsVisible; 