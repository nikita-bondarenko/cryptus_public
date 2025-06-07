import { CryptoNetOption } from "@/components/exchange/CryptoNetSelect";
import { CurrencyOption } from "@/components/exchange/CurrencySelect";
import { SelectOption } from "@/components/exchange/BankSelect";
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
  areErrorsVisible: boolean;
  areErrors: boolean;
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
  currency: CurrencyOption;
};

export type SetCryptoInputActionPayload = {
  netValue: CryptoNetOption | null;
  walletAddressValue: string | null;
} & InputActionPayload;
export type SetCryptoActionInput = PayloadAction<SetCryptoInputActionPayload>;

export type SetCardInputActionPayload = {
  bankValue: SelectOption | null;
  cardNumberValue: string | null;
} & InputActionPayload;
export type SetCardActionInput = PayloadAction<SetCardInputActionPayload>;

export type SetCashInputActionPayload = {
  cityValue: string | null;
} & InputActionPayload;
export type SetCashInputAction = PayloadAction<SetCashInputActionPayload>;

export type SetInputAmountValueActionPayload = PayloadAction<number | null>;

export type SetActiveInputTypeAction = PayloadAction<CurrencyType | null>;

export type SetAreErrorsVisibleAction = PayloadAction<boolean>;
export type SetAreErrorsAction = PayloadAction<boolean>;

// Crypto Input Error Actions
export type SetCryptoAmountErrorAction = PayloadAction<string | null>;
export type SetCryptoNetErrorAction = PayloadAction<string | null>;
export type SetCryptoWalletAddressErrorAction = PayloadAction<string | null>;

// Cash Input Error Actions
export type SetCashAmountErrorAction = PayloadAction<string | null>;
export type SetCashCityErrorAction = PayloadAction<string | null>;

// Card Input Error Actions
export type SetCardAmountErrorAction = PayloadAction<string | null>;
export type SetCardBankErrorAction = PayloadAction<string | null>;
export type SetCardNumberErrorAction = PayloadAction<string | null>;

// Card Input Action Types
export type SetCardCurrencyAction = PayloadAction<CurrencyOption>;
export type SetCardBankAction = PayloadAction<SelectOption | null>;
export type SetCardNumberAction = PayloadAction<string | null>;

// Cash Input Action Types
export type SetCashCurrencyAction = PayloadAction<CurrencyOption>;
export type SetCashCityAction = PayloadAction<string | null>;

// Crypto Input Action Types
export type SetCryptoCurrencyAction = PayloadAction<CurrencyOption>;
export type SetCryptoNetAction = PayloadAction<CryptoNetOption | null>;
export type SetCryptoWalletAddressAction = PayloadAction<string | null>;

