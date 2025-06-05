import {
  Input,
  CryptoInput,
  CashInput,
  CardInput,
  InputOptions,
  ExchangeInputState,
  Rate,
  RateSide,
} from "./types";

export const initInput: Input<any> = {
  value: null,
  error: null,
};

export const initRateSide: RateSide = {
  value: null,
  name: null,
  type: null,
};

export const initRate: Rate = {
  from: initRateSide,
  to: initRateSide,
};

export const initCryptoInput: CryptoInput = {
  currency: null,
  amount: initInput,
  amountPlaceholder: null,
  net: initInput,
  walletAddress: initInput,
};
export const initCashInput: CashInput = {
  currency: null,
  amount: initInput,
  amountPlaceholder: null,

  city: initInput,
};
export const initCardInput: CardInput = {
  currency: null,
  amount: initInput,
  amountPlaceholder: null,
  bank: initInput,
  cardNumber: initInput,
};

export const initOptions: InputOptions = {
  netsOptions: [],
  cityOptions: [],
  bankOptions: [],
  cryptoCurrencyOptions: [],
  nonCryptoCurrencyOptions: [],
};

export const initialState: ExchangeInputState = {
  activeInputType: null,
  minValue: 100,
  rate: initRate,
  options: initOptions,
  cryptoInput: initCryptoInput,
  cashInput: initCashInput,
  cardInput: initCardInput,
};
