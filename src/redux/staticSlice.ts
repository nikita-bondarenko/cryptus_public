// src/lib/features/uiSlice.ts
import { RequestStoryItemProps } from "@/components/profile/RequestStoryItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface staticState {
  requestStoryList: RequestStoryItemProps[];
}

const initialState: staticState = { requestStoryList: [
    
] };

export const staticSlice = createSlice({
  name: "static",
  initialState,
  reducers: {
    setPageName(state, action: PayloadAction<string | null>) {},
  },
});

export const { setPageName } = staticSlice.actions;
export default staticSlice.reducer;
