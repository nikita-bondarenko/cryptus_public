import { exchangeSlice, initialState } from "./exchangeSlice";
import {
  setCurrencySellAmountValue,
  setCurrencyBuyAmountValue,
  setWalletAddressValue,
  setSelectedBankValue,
  setCardNumberValue,
  setSelectedCityValue,
  setSelectedCurrencySell,
  setSelectedCurrencyBuy,
  setSelectedCurrencySellType,
  setSelectedCurrencyBuyType,
  setExchangeRate,
  setSelectedNetworkValue,
} from "./exchangeSlice";
import { City, Directions, ExchangeBank, ExchangeNetwork, GroupedCurrency } from "./types";

describe("exchangeSlice", () => {
  it("should handle setCurrencySellAmountValue", () => {
    const value = 100;
    const nextState = exchangeSlice.reducer(initialState, setCurrencySellAmountValue(value));
    expect(nextState.currencySellAmount.value).toBe(value);
  });

  it("should handle setCurrencyBuyAmountValue", () => {
    const value = 200;
    const nextState = exchangeSlice.reducer(initialState, setCurrencyBuyAmountValue(value));
    expect(nextState.currencyBuyAmount.value).toBe(value);
  });

  it("should handle setWalletAddressValue", () => {
    const value = "0x123";
    const nextState = exchangeSlice.reducer(initialState, setWalletAddressValue(value));
    expect(nextState.walletAddress.value).toBe(value);
  });

  it("should handle setSelectedBankValue", () => {
    const value: ExchangeBank = { id: 1, title: "Test Bank", code: "TEST", weight: 1 };
    const nextState = exchangeSlice.reducer(initialState, setSelectedBankValue(value));
    expect(nextState.selectedBank.value).toEqual(value);
  });

  it("should handle setCardNumberValue", () => {
    const value = "1234567890";
    const nextState = exchangeSlice.reducer(initialState, setCardNumberValue(value));
    expect(nextState.cardNumber.value).toBe(value);
  });

  it("should handle setSelectedCityValue", () => {
    const value: City = { id: 1, title: "Test City", api_id: "TEST", weight: 1 };
    const nextState = exchangeSlice.reducer(initialState, setSelectedCityValue(value));
    expect(nextState.selectedCity.value).toEqual(value);
  });

  it("should handle setSelectedCurrencySell", () => {
    const value: GroupedCurrency = { 
      id: 1, 
      code: "USD", 
      title: "US Dollar",
      type: "BANK",
      weight: 1,
      directions: []
    };
    const nextState = exchangeSlice.reducer(initialState, setSelectedCurrencySell(value));
    expect(nextState.selectedCurrencySell).toEqual(value);
  });

  it("should handle setSelectedCurrencyBuy", () => {
    const value: GroupedCurrency = { 
      id: 1, 
      code: "EUR", 
      title: "Euro",
      type: "BANK",
      weight: 1,
      directions: []
    };
    const nextState = exchangeSlice.reducer(initialState, setSelectedCurrencyBuy(value));
    expect(nextState.selectedCurrencyBuy).toEqual(value);
  });

  it("should handle setSelectedCurrencySellType", () => {
    const value = "COIN";
    const nextState = exchangeSlice.reducer(initialState, setSelectedCurrencySellType(value));
    expect(nextState.selectedCurrencySellType).toBe(value);
  });

  it("should handle setSelectedCurrencyBuyType", () => {
    const value = "BANK";
    const nextState = exchangeSlice.reducer(initialState, setSelectedCurrencyBuyType(value));
    expect(nextState.selectedCurrencyBuyType).toBe(value);
  });

  it("should handle setExchangeRate", () => {
    const value: Directions = { 
      id: 1,
      course: 1.5,
      direction: "BUY",
      course_title: "1.5 USD/EUR",
      give_currency: "USD",
      get_currency: "EUR",
      min_amount: 10
    };
    const nextState = exchangeSlice.reducer(initialState, setExchangeRate(value));
    expect(nextState.exchangeRate).toEqual(value);
  });

  it("should handle setSelectedNetwork", () => {
    const value: ExchangeNetwork = { 
      id: 1, 
      title: "BEP20",
      code: "BEP20",
      title_network: "BEP20",
      type: "COIN",
      weight: 1
    };
    const nextState = exchangeSlice.reducer(initialState, setSelectedNetworkValue(value));
    expect(nextState.selectedNetwork.value).toEqual(value);
  });
}); 