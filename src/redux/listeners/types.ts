import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BankOption } from "@/components/exchange/BankSelect";
import { CryptoNetOption } from "@/components/exchange/CryptoNetSelect";
import { PayloadAction, ListenerEffectAPI } from "@reduxjs/toolkit";
import { SelectOption } from "@/components/exchange/BankSelect";
import { AppDispatch } from "../store";

// Base Listener Types
export type ListenerMiddleware = Middleware<
  {}, // extra argument type
  RootState // state type
>;

// Card Input Listener Types
export type CardBankListenerPayload = {
  bank: BankOption | null;
};

export type CardNumberListenerPayload = {
  cardNumber: string | null;
};

// Cash Input Listener Types
export type CityListenerPayload = {
  city: string | null;
};

// Crypto Input Listener Types
export type CryptoNetListenerPayload = {
  net: CryptoNetOption | null;
};

export type WalletAddressListenerPayload = {
  walletAddress: string | null;
};

// Validation Result Types
export type ValidationResult = {
  isValid: boolean;
  error?: string;
};

// Listener Action Types
export type ListenerAction = {
  type: string;
  payload: CardBankListenerPayload | CardNumberListenerPayload | CityListenerPayload | CryptoNetListenerPayload | WalletAddressListenerPayload;
};

export type ListenerProps<T> = {
  action: PayloadAction<T>;
  listenerApi: ListenerEffectAPI<RootState, AppDispatch, PayloadAction<T>>;
};

export type AmountAction = PayloadAction<number | null>;
export type StringAction = PayloadAction<string | null>;
export type SelectOptionAction = PayloadAction<SelectOption | null>; 