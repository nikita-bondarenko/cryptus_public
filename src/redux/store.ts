// src/lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import exchangeTypeReducer from "./exchangeTypeSlice";

export const store = configureStore({
  reducer: { ui: uiReducer, exchangeType: exchangeTypeReducer },
  devTools: process.env.NODE_ENV !== "production",
});

// Типы для TS-хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
