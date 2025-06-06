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

export const initInput: Input<unknown> = {
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
  amount: {
    value: null,
    error: "Введите сумму",
  },
  amountPlaceholder: null,
  net: {
    value: null,
    error: null,
  },
  walletAddress: {
    value: "",
    error: "Введите адрес кошелька",
  },
};
export const initCashInput: CashInput = {
  currency: null,
  amount: {
    value: null,
    error: "Введите сумму",
  },
  amountPlaceholder: null,
  city: {
    value: "",
    error: "Выберите город",
  },
};
export const initCardInput: CardInput = {
  currency: null,
  amount: {
    value: null,
    error: "Введите сумму",
  },
  amountPlaceholder: null,
  bank: {
    value: null,
    error: "Выберите банк",
  },
  cardNumber: {
    value: "",
    error: "Введите номер карты",
  },
};

export const initOptions: InputOptions = {
  netsOptions: [],
  cityOptions: [],
  bankOptions: [],
  cryptoCurrencyOptions: [],
  nonCryptoCurrencyOptions: [],
};

export const initialState: ExchangeInputState = {
  areErrorsVisible: false,
  areErrors: true,
  activeInputType: null,
  minValue: 100,
  rate: initRate,
  options: initOptions,
  cryptoInput: initCryptoInput,
  cashInput: initCashInput,
  cardInput: initCardInput,
};
