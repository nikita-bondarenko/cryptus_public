// src/lib/features/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type uiState = {
  pageName: string | null;
  isLoading: boolean;
  exchangeId: number | null;
}

const initialState: uiState = { pageName: "", isLoading: true, exchangeId: null };

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setPageName(state, action: PayloadAction<string | null>) {
      state.pageName = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setExchangeId(state, action: PayloadAction<number | null>) {
      state.exchangeId = action.payload;
    },
  },
});

export const { setPageName, setIsLoading, setExchangeId } = uiSlice.actions;
export default uiSlice.reducer;
