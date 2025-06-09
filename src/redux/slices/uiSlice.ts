// src/lib/features/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type uiState = {
  pageName: string | null;
  isLoading: boolean;
}

const initialState: uiState = { pageName: "", isLoading: true };

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
  },
});

export const { setPageName, setIsLoading } = uiSlice.actions;
export default uiSlice.reducer;
