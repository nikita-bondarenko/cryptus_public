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
        case "cash":
          return options.nonCryptoCurrencyOptions;
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
export const selectBankValue = createSelector(
  (state: RootState) => state.exchangeInput.cardInput.bank.value,
  (value) => value
);

// City Value Selector
export const selectCityValue = createSelector(
  (state: RootState) => state.exchangeInput.cashInput.city.value,
  (value) => value
);

// Card Number Value Selector
export const selectCardNumberValue = createSelector(
  (state: RootState) => state.exchangeInput.cardInput.cardNumber.value,
  (value) => value
);

// Net Value Selector
export const selectNetValue = createSelector(
  (state: RootState) => state.exchangeInput.cryptoInput.net.value,
  (value) => value
);

// Wallet Address Value Selector
export const selectWalletAddressValue = createSelector(
  (state: RootState) => state.exchangeInput.cryptoInput.walletAddress.value,
  (value) => value
);

// Selected Currency Selectors
export const selectCardCurrency = createSelector(
  (state: RootState) => state.exchangeInput.cardInput.currency,
  (currency) => currency
);

export const selectCashCurrency = createSelector(
  (state: RootState) => state.exchangeInput.cashInput.currency,
  (currency) => currency
);

export const selectCryptoCurrency = createSelector(
  (state: RootState) => state.exchangeInput.cryptoInput.currency,
  (currency) => currency
);

// Error Selectors
export const selectValueError = (type: "card" | "cash" | "crypto") =>
  createSelector(
    (state: RootState) => state.exchangeInput,
    (exchangeInput) => {
      const input = exchangeInput[`${type}Input` as keyof ExchangeInputState] as CryptoInput | CashInput | CardInput;
      return input?.amount.error ?? null;
    }
  );

export const selectBankError = createSelector(
  (state: RootState) => state.exchangeInput.cardInput.bank.error,
  (error) => error
);

export const selectCardNumberError = createSelector(
  (state: RootState) => state.exchangeInput.cardInput.cardNumber.error,
  (error) => error
);

export const selectCityError = createSelector(
  (state: RootState) => state.exchangeInput.cashInput.city.error,
  (error) => error
);

export const selectWalletAddressError = createSelector(
  (state: RootState) => state.exchangeInput.cryptoInput.walletAddress.error,
  (error) => error
);

// Errors Visibility Selector
export const selectAreErrorsVisible = createSelector(
  (state: RootState) => state.exchangeInput.areErrorsVisible,
  (areErrorsVisible) => areErrorsVisible
); 