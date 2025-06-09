import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserDataState = {
  userId: number | null;
}

const initialState: UserDataState = {
  userId: null,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },
  },
});
export const { setUserId } = userDataSlice.actions;
export default userDataSlice.reducer;
