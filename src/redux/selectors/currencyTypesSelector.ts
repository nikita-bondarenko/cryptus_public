import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CurrencyType } from "@/components/request/RequestDetails";
import { ExchangeCurrencyType } from "../slices/exchangeSlice/exchangeSlice";

export type CurrencyTypes = {
  givenType: ExchangeCurrencyType | null;
  receivedType: ExchangeCurrencyType | null;
};

export const selectCurrencyTypes = createSelector(
  (state: RootState) => state.exchange,
  (exchange): CurrencyTypes => ({
    givenType: exchange.selectedCurrencySellType,
    receivedType: exchange.selectedCurrencyBuyType,
  })
); 