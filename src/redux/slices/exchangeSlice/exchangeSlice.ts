import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExchangeTypeItemProps } from "@/components/exchange/ExchangeTypeItem";
import { CurrencyPosition, CurrencyType } from "@/components/request/RequestDetails";
import { exchangeTypesButtons } from "@/data/exchangeTypesButtons";
import { ExchangeInputType } from "@/hooks/useExchangeInput";
import { Bank, City, Currency, Network, Rate } from "@/redux/api/types";

export type ExchangeInput<T> = {
    value: T | null;
    error: string | null;
  };

export type ExchangeCurrencyType = "COIN" | "CASH" | "BANK";




export type ExchangeState = {
  currenciesSell: Currency[];
  currenciesBuy: Currency[];
  selectedCurrencySell: Currency | null;
  selectedCurrencyBuy: Currency | null;
  selectedCurrencySellType: ExchangeCurrencyType | null;
  selectedCurrencyBuyType: ExchangeCurrencyType | null;
  currencyBuyTypeOptions: ExchangeTypeItemProps[] | null;
  cities: City[] | null;
  selectedCity: ExchangeInput<City | null>;
  networks: Network[] | null;
  selectedNetwork: ExchangeInput<Network | null>;
  banks: Bank[] | null;
  selectedBank: ExchangeInput<Bank | null>;
  cardNumber: ExchangeInput<string | null>;
  walletAddress: ExchangeInput<string | null>;
  areErrorsVisible: boolean;
  areErrors: boolean;
  activeInputType: CurrencyPosition | null;
  exchangeRate: Rate | null;
  currencySellAmount: ExchangeInput<number | null>;
  currencyBuyAmount: ExchangeInput<number | null>;
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

export const initialState: ExchangeState = {
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
  exchangeRate: null,
  currencySellAmount: {
    value: null,
    error: null
  },
  currencyBuyAmount: {
    value: null,
    error: null
  }
};

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setCurrenciesSell: (state, action: PayloadAction<Currency[]>) => {
      state.currenciesSell = action.payload;
    },
    setCurrenciesBuy: (state, action: PayloadAction<Currency[]>) => {
      state.currenciesBuy = action.payload;
    },
    setSelectedCurrencySell: (
      state,
      action: PayloadAction<Currency | null>
    ) => {
      state.selectedCurrencySell = action.payload;
    },
    setSelectedCurrencyBuy: (
      state,
      action: PayloadAction<Currency | null>
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
    setNetworks: (state, action: PayloadAction<Network[] | null>) => {
      state.networks = action.payload;
    },
    setSelectedNetworkValue: (state, action: PayloadAction<Network | null>) => {
      state.selectedNetwork.value = action.payload;
    },
    setSelectedNetworkError: (state, action: PayloadAction<string | null>) => {
      state.selectedNetwork.error = action.payload;
    },
    setBanks: (state, action: PayloadAction<Bank[] | null>) => {
      state.banks = action.payload;
    },
    setSelectedBankValue: (state, action: PayloadAction<Bank | null>) => {
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
    setActiveInputType: (state, action: PayloadAction<CurrencyPosition | null>) => {
      state.activeInputType = action.payload;
    },
    setExchangeRate: (state, action: PayloadAction<Rate | null>) => {
      console.log(action.payload)
      state.exchangeRate = action.payload;
    },
    setCurrencySellAmountValue: (state, action: PayloadAction<number | null>) => {
      state.currencySellAmount.value = action.payload;
    },
    setCurrencySellAmountError: (state, action: PayloadAction<string | null>) => {
      state.currencySellAmount.error = action.payload;
    },
    setCurrencyBuyAmountValue: (state, action: PayloadAction<number | null>) => {
      state.currencyBuyAmount.value = action.payload;
    },
    setCurrencyBuyAmountError: (state, action: PayloadAction<string | null>) => {
      state.currencyBuyAmount.error = action.payload;
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
  setCurrencySellAmountValue,
  setCurrencySellAmountError,
  setCurrencyBuyAmountValue,
  setCurrencyBuyAmountError,
  clearCurrencies,
  clearAll
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
