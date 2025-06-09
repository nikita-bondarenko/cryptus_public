// src/lib/features/uiSlice.ts
import { ExchangeTypeItemProps } from "@/components/exchange/ExchangeTypeItem";
import { CurrencyType } from "@/components/request/RequestDetails";
import { exchangeTypesButtons } from "@/data/exchangeTypesButtons";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExchangeTypeState {
  selectedGiveType: CurrencyType;
  selectedReceieveType: CurrencyType;
  receiveOptions: ExchangeTypeItemProps[];
}

const initSelectedGiveType = "COIN";
const filterReceiveVariants = (selectedGiveType: CurrencyType) => {
  switch (selectedGiveType) {
    case "COIN": {
      return exchangeTypesButtons.filter(
        (item) => item.type !== selectedGiveType
      );
    }
    default: {
      return exchangeTypesButtons.filter((item) => item.type === "COIN");
    }
  }
};

const initialState: ExchangeTypeState = {
  selectedGiveType: initSelectedGiveType,
  selectedReceieveType: "BANK",
  receiveOptions: filterReceiveVariants(initSelectedGiveType),
};

export const exchangeTypeSlice = createSlice({
  name: "exchangeType",
  initialState,
  reducers: {
    selectGiveType(state, action: PayloadAction<CurrencyType>) {
      const type = action.payload;
      state.selectedGiveType = type;
      const receiveOptions = filterReceiveVariants(type);
      if (
        JSON.stringify(receiveOptions) !== JSON.stringify(state.receiveOptions)
      ) {
        state.receiveOptions = receiveOptions;
        state.selectedReceieveType = receiveOptions[0].type;
      }
    },
    selectReceiveType(state, action: PayloadAction<CurrencyType>) {
      state.selectedReceieveType = action.payload;
    },
  },
});

export const { selectGiveType, selectReceiveType } = exchangeTypeSlice.actions;
export default exchangeTypeSlice.reducer;
