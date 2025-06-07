// src/lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import exchangeInputReducer from "./slices/exchangeInput/exchangeInputSlice";
import exchangeTypeReducer from "./slices/exchangeTypeSlice";
import uiReducer from "./slices/uiSlice";
import { exchangeInputValueChangingListener } from "./listeners/exchangeInputValueChangingListener";
import { cardBankListener } from "./listeners/cardBankListener";
import { cardNumberListener } from "./listeners/cardNumberListener";
import { cityInputListener } from "./listeners/cityInputListener";
import { walletInputListener } from "./listeners/walletInputListener";

export const store = configureStore({
  reducer: {
    exchangeInput: exchangeInputReducer,
    exchangeType: exchangeTypeReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      exchangeInputValueChangingListener.middleware,
      cardBankListener.middleware,
      cardNumberListener.middleware,
      cityInputListener.middleware,
      walletInputListener.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

// Типы для TS-хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


