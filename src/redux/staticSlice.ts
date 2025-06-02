// src/lib/features/uiSlice.ts
import { RequestStoryItemProps } from "@/components/profile/RequestStoryItem";
import { createSlice } from "@reduxjs/toolkit";

export interface staticState {
  requestStoryList: RequestStoryItemProps[];
}

const initialState: staticState = { requestStoryList: [
    
] };

export const staticSlice = createSlice({
  name: "static",
  initialState,
  reducers: {
  },
});

export const {} = staticSlice.actions;
export default staticSlice.reducer;

