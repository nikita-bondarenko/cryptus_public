import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export const selectSectionHeadingProps = (position: "given" | "received") =>
  createSelector(
    (state: RootState) => state.exchangeInput,
    (exchangeInput) => {
      return position === "given"
        ? { title: "Я отдаю", minValue: exchangeInput.minValue }
        : { title: "Я получаю", rate: exchangeInput.rate };
    }
  );

  export const selectCurrencyTypes = () =>  createSelector(
    (state: RootState) => state.exchangeType,
    (exchangeType) => {
      return {
        givenCurrencyType: exchangeType.selectedGiveType,
        receivedCurrencyType: exchangeType.selectedReceieveType,
      };
    }
  );