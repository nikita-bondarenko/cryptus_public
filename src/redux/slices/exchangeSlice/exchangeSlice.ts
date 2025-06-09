import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { City, ExchangeRate, GroupedCurrency } from "@/api/types";
import { ExchangeTypeItemProps } from "@/components/exchange/ExchangeTypeItem";
import { CurrencyType } from "@/components/request/RequestDetails";
import { exchangeTypesButtons } from "@/data/exchangeTypesButtons";
import { Input } from "../exchangeInput/types";

export type ExchangeInput<T> = {
    value: T | null;
    error: string | null;
  };

export type ExchangeCurrencyType = "COIN" | "CASH" | "BANK";

export type ExchangeNetwork = {
  code: string;
  id: number;
  title: string;
  title_network: string;
  type: ExchangeCurrencyType;
  weight: number;
};

export type ExchangeBank = {
    id:number
    title:string
    code:string
    weight:number
    directions:string
  }

export type ExchangeState = {
  currenciesSell: GroupedCurrency[];
  currenciesBuy: GroupedCurrency[];
  selectedCurrencySell: GroupedCurrency | null;
  selectedCurrencyBuy: GroupedCurrency | null;
  selectedCurrencySellType: ExchangeCurrencyType | null;
  selectedCurrencyBuyType: ExchangeCurrencyType | null;
  currencyBuyTypeOptions: ExchangeTypeItemProps[] | null;
  cities: City[] | null;
  selectedCity: ExchangeInput<City | null>;
  networks: ExchangeNetwork[] | null;
  selectedNetwork: ExchangeInput<ExchangeNetwork | null>;
  banks: ExchangeBank[] | null;
  selectedBank: ExchangeInput<ExchangeBank | null>;
  cardNumber: ExchangeInput<string | null>;
  walletAddress: ExchangeInput<string | null>;
  areErrorsVisible: boolean;
  areErrors: boolean;
  activeInputType: ExchangeCurrencyType | null;
  exchangeRate: ExchangeRate | null;

};

export const filterReceiveVariants = (
  selectedGiveType: ExchangeCurrencyType
) => {
  switch (selectedGiveType) {
    case "COIN": {
      return exchangeTypesButtons.filter(
        (item) => item.type !== selectedGiveType
      );
    }
    default: {
      return exchangeTypesButtons.filter((item) => item.type === "COIN");
    }
  }
};

const initialState: ExchangeState = {
  currenciesSell: [],
  currenciesBuy: [],
  selectedCurrencySell: null,
  selectedCurrencyBuy: null,
  selectedCurrencySellType: null,
  selectedCurrencyBuyType: null,
  currencyBuyTypeOptions: null,
  cities: null,
  selectedCity: {
    value: null,
    error: null
  },
  networks: null,
  selectedNetwork: {
    value: null,
    error: null
  },
  banks: null,
  selectedBank: {
    value: null,
    error: null
  },
  cardNumber: {
    value: null,
    error: null
  },
  walletAddress: {
    value: null,
    error: null
  },
  areErrorsVisible: false,
  areErrors: false,
  activeInputType: null,
  exchangeRate: null
};

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setCurrenciesSell: (state, action: PayloadAction<GroupedCurrency[]>) => {
      state.currenciesSell = action.payload;
    },
    setCurrenciesBuy: (state, action: PayloadAction<GroupedCurrency[]>) => {
      state.currenciesBuy = action.payload;
    },
    setSelectedCurrencySell: (
      state,
      action: PayloadAction<GroupedCurrency | null>
    ) => {
      state.selectedCurrencySell = action.payload;
    },
    setSelectedCurrencyBuy: (
      state,
      action: PayloadAction<GroupedCurrency | null>
    ) => {
      state.selectedCurrencyBuy = action.payload;
    },
    setSelectedCurrencySellType: (
      state,
      action: PayloadAction<ExchangeCurrencyType | null>
    ) => {
      if (state.selectedCurrencySellType === action.payload) return;
      state.selectedCurrencySellType = action.payload;
    },
    setSelectedCurrencyBuyType: (
      state,
      action: PayloadAction<ExchangeCurrencyType | null>
    ) => {
      if (state.selectedCurrencyBuyType === action.payload) return;
      state.selectedCurrencyBuyType = action.payload;
    },
    setCurrencyBuyTypeOptions: (
      state,
      action: PayloadAction<ExchangeTypeItemProps[] | null>
    ) => {
      state.currencyBuyTypeOptions = action.payload;
    },
    setCities: (state, action: PayloadAction<City[] | null>) => {
      state.cities = action.payload;
    },
    setSelectedCityValue: (state, action: PayloadAction<City | null>) => {
      state.selectedCity.value = action.payload;
    },
    setSelectedCityError: (state, action: PayloadAction<string | null>) => {
      state.selectedCity.error = action.payload;
    },
    setNetworks: (state, action: PayloadAction<ExchangeNetwork[] | null>) => {
      state.networks = action.payload;
    },
    setSelectedNetworkValue: (state, action: PayloadAction<ExchangeNetwork | null>) => {
      state.selectedNetwork.value = action.payload;
    },
    setSelectedNetworkError: (state, action: PayloadAction<string | null>) => {
      state.selectedNetwork.error = action.payload;
    },
    setBanks: (state, action: PayloadAction<ExchangeBank[] | null>) => {
      state.banks = action.payload;
    },
    setSelectedBankValue: (state, action: PayloadAction<ExchangeBank | null>) => {
      state.selectedBank.value = action.payload;
    },
    setSelectedBankError: (state, action: PayloadAction<string | null>) => {
      state.selectedBank.error = action.payload;
    },
    setCardNumberValue: (state, action: PayloadAction<string | null>) => {
      state.cardNumber.value = action.payload;
    },
    setCardNumberError: (state, action: PayloadAction<string | null>) => {
      state.cardNumber.error = action.payload;
    },
    setWalletAddressValue: (state, action: PayloadAction<string | null>) => {
      state.walletAddress.value = action.payload;
    },
    setWalletAddressError: (state, action: PayloadAction<string | null>) => {
      state.walletAddress.error = action.payload;
    },
    setAreErrorsVisible: (state, action: PayloadAction<boolean>) => {
      state.areErrorsVisible = action.payload;
    },
    setAreErrors: (state, action: PayloadAction<boolean>) => {
      state.areErrors = action.payload;
    },
    setActiveInputType: (state, action: PayloadAction<ExchangeCurrencyType | null>) => {
      state.activeInputType = action.payload;
    },
    setExchangeRate: (state, action: PayloadAction<ExchangeRate | null>) => {
      state.exchangeRate = action.payload;
    },
    clearCurrencies: (state) => {
      state.currenciesSell = [];
      state.currenciesBuy = [];
      state.selectedCurrencySell = null;
      state.selectedCurrencyBuy = null;
      state.selectedCurrencySellType = null;
      state.selectedCurrencyBuyType = null;
      state.currencyBuyTypeOptions = null;
    },
    clearAll: (state) => {
      return initialState;
    }
  },
});

export const {
  setCurrenciesSell,
  setCurrenciesBuy,
  setSelectedCurrencySell,
  setSelectedCurrencyBuy,
  setSelectedCurrencySellType,
  setSelectedCurrencyBuyType,
  setCurrencyBuyTypeOptions,
  setCities,
  setSelectedCityValue,
  setSelectedCityError,
  setNetworks,
  setSelectedNetworkValue,
  setSelectedNetworkError,
  setBanks,
  setSelectedBankValue,
  setSelectedBankError,
  setCardNumberValue,
  setCardNumberError,
  setWalletAddressValue,
  setWalletAddressError,
  setAreErrorsVisible,
  setAreErrors,
  setActiveInputType,
  setExchangeRate,
  clearCurrencies,
  clearAll
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
