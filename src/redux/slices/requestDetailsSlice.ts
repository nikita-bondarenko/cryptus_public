import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RequestDetails = {
  id?: string;
  date?: string;
  course?: number;
  currency_give?: {
    amount?: number;
    name?: string;
    icon?: string;
    network?: string;
  };
  currency_get?: {
    amount?: number;
    name?: string;
    icon?: string;
    network?: string;
  };
}


type RequestDetailsState = {
    data: RequestDetails | null;
};

export const requestDetailsSlice = createSlice({
  name: "requestDetails",
  initialState: { data: null } as RequestDetailsState,
  reducers: {
    setRequestDetails: (state, action: PayloadAction<RequestDetails>) => {
        if(action.payload) {
            state.data = action.payload;
        }
    },
  },
});

export const { setRequestDetails } = requestDetailsSlice.actions;
export default requestDetailsSlice.reducer;