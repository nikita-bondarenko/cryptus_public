import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { ExchangeInputState, CryptoInput, CashInput, CardInput } from "@/redux/slices/exchangeInput/types";
import { selectCurrencyTypes } from "./currencyTypesSelector";
import { calculateRate } from "@/helpers/calculateRate";
import { translateCurrencies } from "@/helpers/translateCurrencies";
import { translateNetworks } from "../helpers/exchangeInputListener/translateNetworks";
import { CurrencyPosition } from "@/components/request/RequestDetails";
import { translateCurrency } from "@/helpers/translateCurrency";
import { translateNetwork } from "@/helpers/translateNetwork";

// Section Heading Props Selector
export const selectSectionHeadingProps = (position: "given" | "received") =>
  createSelector(
    (state: RootState) => state.exchange,
    (exchange) => {
      return position === "given"
        ? { title: "Я отдаю", minValue: exchange.exchangeRate?.min_amount }
        : { title: "Я получаю", rate: calculateRate({currencyGive: exchange.selectedCurrencySell?.title || '', currencyGet: exchange.selectedCurrencyBuy?.title || '', course: exchange.exchangeRate?.course || 0}) };
    }
  );

// Currency Types Selector
export { selectCurrencyTypes };

// Currency Options Selector
export const selectCurrencyOptions = (position: "given" | "received") =>
  createSelector(
    (state: RootState) => state.exchange,
    (exchange) => {
      switch (position) {
        case "given":
          return translateCurrencies(exchange.currenciesSell);
        case "received":
          return translateCurrencies(exchange.currenciesBuy);
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
  (state: RootState) => state.exchange,
    (exchange) => exchange.networks ? translateNetworks(exchange.networks) : []
  );

// Input Value Selector
export const selectInputValue = (position: CurrencyPosition) =>
  createSelector(
    (state: RootState) => state.exchange,
    (exchange) => {
      return position === "given" ? exchange.currencySellAmount.value : exchange.currencyBuyAmount.value;
    }
  );

// Bank Value Selector
export const selectBankValue = (state: RootState) => state.exchangeInput.cardInput.bank.value;

// City Value Selector
export const selectCityValue = (state: RootState) => state.exchangeInput.cashInput.city.value;

// Card Number Value Selector
export const selectCardNumberValue = (state: RootState) => state.exchangeInput.cardInput.cardNumber.value;

// Net Value Selector
  export const selectNetValue = (state: RootState) =>   translateNetwork(state.exchange.selectedNetwork?.value) ;

// Wallet Address Value Selector
export const selectWalletAddressValue = (state: RootState) => state.exchange.walletAddress.value;

// Selected Currency Selectors
export const selectCardCurrency = (state: RootState) => state.exchangeInput.cardInput.currency;

export const selectCashCurrency = (state: RootState) => state.exchangeInput.cashInput.currency;

export const selectCurrency = (position: CurrencyPosition) =>
  createSelector(
    (state: RootState) => state.exchange,
    (exchange) => position === "given" ? translateCurrency(exchange.selectedCurrencySell) : translateCurrency(exchange.selectedCurrencyBuy)
  );

  export const selectRate = () => createSelector(
    (state: RootState) => state.exchange,
    (exchange) => calculateRate({currencyGive: exchange.selectedCurrencySell?.title || '', currencyGet: exchange.selectedCurrencyBuy?.title || '', course: exchange.exchangeRate?.course || 0})
  );
  
// Error Selectors
export const selectValueError = (position: CurrencyPosition) =>
  createSelector(
    (state: RootState) => state.exchange,
    (exchange) => {
      return position === "given" ? exchange.currencySellAmount.error : exchange.currencyBuyAmount.error;
    }
  );

export const selectBankError = (state: RootState) => state.exchangeInput.cardInput.bank.error;

export const selectCardNumberError = (state: RootState) => state.exchangeInput.cardInput.cardNumber.error;

export const selectCityError = (state: RootState) => state.exchangeInput.cashInput.city.error;

export const selectWalletAddressError = (state: RootState) => state.exchange.walletAddress.error;

// Errors Visibility Selector
export const selectAreErrorsVisible = (state: RootState) => state.exchange.areErrorsVisible; 