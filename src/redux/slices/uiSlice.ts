// src/lib/features/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface uiState {
  pageName: string | null;
}

const initialState: uiState = { pageName: "" };

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setPageName(state, action: PayloadAction<string | null>) {
      state.pageName = action.payload;
    },
  },
});

export const { setPageName } = uiSlice.actions;
export default uiSlice.reducer;
