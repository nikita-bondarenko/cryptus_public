import { CryptoNetOption } from "@/components/exchange/CryptoNetSelect";
import { CurrencyOption } from "@/components/exchange/CurrencySelect";
import { SelectOption } from "@/components/exchange/Select";
import { CurrencyType } from "@/components/request/RequestDetails";
import { PayloadAction } from "@reduxjs/toolkit";

export type RateSide = {
  value: number | null;
  name: string | null;
  type: CurrencyType | null;
};

export type Rate = {
  from: RateSide;
  to: RateSide;
};

export type Input<T> = {
  value: T | null;
  error: string | null;
};

export type CryptoInput = {
  currency: CurrencyOption | null;
  amount: Input<number>;
  amountPlaceholder: number | null;
  net: Input<CryptoNetOption>;
  walletAddress: Input<string>;
};

export type CashInput = {
  currency: CurrencyOption | null;
  amount: Input<number>;
  amountPlaceholder: number | null;
  city: Input<string>;
};

export type CardInput = {
  currency: CurrencyOption | null;
  amount: Input<number>;
  amountPlaceholder: number | null;
  bank: Input<SelectOption>;
  cardNumber: Input<string>;
};

export type InputOptions = {
  netsOptions: CryptoNetOption[];
  cityOptions: SelectOption[];
  bankOptions: SelectOption[];
  cryptoCurrencyOptions: CurrencyOption[];
  nonCryptoCurrencyOptions: CurrencyOption[];
};

export interface ExchangeInputState {
  activeInputType: CurrencyType | null;
  minValue: number;
  rate: Rate;
  options: InputOptions;
  cryptoInput: CryptoInput;
  cashInput: CashInput;
  cardInput: CardInput;
}
export type SetFetchedDataActionPayload = { rate: Rate; options: InputOptions };
export type SetFetchedDataAction = PayloadAction<SetFetchedDataActionPayload>;

export type InputActionPayload = {
  amountValue: number | null;
  currency: CurrencyOption;
};

export type SetCryptoInputActionPayload = {
  netValue: CryptoNetOption;
  walletAddressValue: string;
} & InputActionPayload;
export type SetCryptoActionInput = PayloadAction<SetCryptoInputActionPayload>;

export type SetCardInputActionPayload = {
  bankValue: SelectOption | null;
  cardNumberValue: string;
} & InputActionPayload;
export type SetCardActionInput = PayloadAction<SetCardInputActionPayload>;

export type SetCashInputActionPayload = {
  cityValue: string;
} & InputActionPayload;
export type SetCashInputAction = PayloadAction<SetCashInputActionPayload>;

export type SetInputAmountValuePayload = number | null;
export type SetInputAmountValueActionPayload =
  PayloadAction<SetInputAmountValuePayload>;
