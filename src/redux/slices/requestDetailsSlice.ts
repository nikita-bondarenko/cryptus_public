import { UserExchange } from "@/api/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RequestDetailsState = {
    data: UserExchange | null;
};

export const requestDetailsSlice = createSlice({
  name: "requestDetails",
  initialState: { data: null } as RequestDetailsState,
  reducers: {
    setRequestDetails: (state, action: PayloadAction<UserExchange>) => {
        if(action.payload) {
            state.data = action.payload;
        }
    },
  },
});

export const { setRequestDetails } = requestDetailsSlice.actions;
export default requestDetailsSlice.reducer;