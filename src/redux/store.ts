// src/lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import exchangeTypeReducer from "./slices/exchangeTypeSlice";
import exchangeInputReducer from "./slices/exchangeInput/exchangeInputSlice";
import { exchangeInputValueChangingListener } from "./listeners/exchangeInputValueChangingListener";
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    exchangeType: exchangeTypeReducer,
    exchangeInput: exchangeInputReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      exchangeInputValueChangingListener.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

// Типы для TS-хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


