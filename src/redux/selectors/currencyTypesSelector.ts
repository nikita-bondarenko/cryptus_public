import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CurrencyType } from "@/components/request/RequestDetails";

export type CurrencyTypes = {
  givenType: CurrencyType;
  receivedType: CurrencyType;
};

export const selectCurrencyTypes = createSelector(
  (state: RootState) => state.exchangeType,
  (exchangeType): CurrencyTypes => ({
    givenType: exchangeType.selectedGiveType,
    receivedType: exchangeType.selectedReceieveType,
  })
); 