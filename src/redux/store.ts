// src/lib/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import exchangeInputReducer from "./slices/exchangeInput/exchangeInputSlice";
import exchangeTypeReducer from "./slices/exchangeTypeSlice";
import uiReducer from "./slices/uiSlice";
import { amountInputListener } from "./listeners/amountInputListener";
import { cardBankListener } from "./listeners/cardBankListener";
import { cardNumberListener } from "./listeners/cardNumberListener";
import { cityInputListener } from "./listeners/cityInputListener";
import { walletAddressInputListener } from "./listeners/walletAddressInputListener";
import { exchangeTypeListener } from "./listeners/exchangeTypeListener";
import { api } from "@/api/api";
import userDataReducer from "./slices/userDataSlice";
import requestDetailsReducer from "./slices/requestDetailsSlice";
import { loadState, saveState } from "./persistConfig";
import exchangeReducer from "./slices/exchangeSlice/exchangeSlice";
import { exchangeSliceListener } from "./slices/exchangeSliceListeners/exchangeSliceListener";
import { validateListener } from "./slices/exchangeSliceListeners/validateListener";

const rootReducer = combineReducers({
  exchangeInput: exchangeInputReducer,
  exchangeType: exchangeTypeReducer,
  ui: uiReducer,
  userData: userDataReducer,
  requestDetails: requestDetailsReducer,
  exchange: exchangeReducer,
  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedState = loadState() as Partial<RootState> | undefined;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .prepend(
        // amountInputListener.middleware,
        // cardBankListener.middleware,
        // cardNumberListener.middleware,
        // cityInputListener.middleware,
        // walletAddressInputListener.middleware,
        // exchangeTypeListener.middleware
        exchangeSliceListener.middleware,
        validateListener.middleware
      )
      .concat(api.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Subscribe to store changes to save state
store.subscribe(() => {
  const state = store.getState();
  // Only persist specific parts of the state that we want to keep
  saveState({
    exchange: state.exchange,
    userData: state.userData,
    requestDetails: state.requestDetails,
  });
});

export type AppDispatch = typeof store.dispatch;


