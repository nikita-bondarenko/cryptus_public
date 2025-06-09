import { AppDispatch } from "../store";
import { RootState } from "../store";
import {
  setSelectedBankError,
  setCardNumberError,
  setSelectedCityError,
  setCurrencySellAmountError,
  setCurrencyBuyAmountError,
  setWalletAddressError,
  setAreErrors,
} from "../slices/exchangeSlice/exchangeSlice";
import { validateExchangeInput } from "./validateExchangeInput";

export const validateAllFields = (
  state: RootState,
  dispatch: AppDispatch
) => {
  const { selectedCurrencySellType, selectedCurrencyBuyType } = state.exchange;
  let hasErrors = false;

  // Validate crypto fields
  if (selectedCurrencySellType === "COIN" || selectedCurrencyBuyType === "COIN") {
    const { currencySellAmount, currencyBuyAmount, walletAddress, exchangeRate } = state.exchange;
    const position = selectedCurrencySellType === "COIN" ? "given" : "received";

    const amountError = validateExchangeInput({
      value: position === "given" ? currencySellAmount.value : currencyBuyAmount.value,
      inputType: "amount",
      position,
      minValue: exchangeRate?.min_amount || 0,
    });

    const walletAddressError = validateExchangeInput({
      value: walletAddress.value,
      inputType: "walletAddress",
      position,
      minValue: 0,
    });

    if (position === "given") {
      dispatch(setCurrencySellAmountError(amountError));
    } else {
      dispatch(setCurrencyBuyAmountError(amountError));
    }
    dispatch(setWalletAddressError(walletAddressError));

    hasErrors = !!(amountError || walletAddressError);
  }

  // Validate card fields
  if (selectedCurrencySellType === "BANK" || selectedCurrencyBuyType === "BANK") {
    const { currencySellAmount, currencyBuyAmount, selectedBank, cardNumber } = state.exchange;
    const position = selectedCurrencySellType === "BANK" ? "given" : "received";

    const amountError = validateExchangeInput({
      value: position === "given" ? currencySellAmount.value : currencyBuyAmount.value,
      inputType: "amount",
      position,
      minValue: 0,
    });

    const bankError = validateExchangeInput({
      value: selectedBank.value,
      inputType: "bank",
      position,
      minValue: 0,
    });

    const cardNumberError = validateExchangeInput({
      value: cardNumber.value,
      inputType: "cardNumber",
      position,
      minValue: 0,
    });

    if (position === "given") {
      dispatch(setCurrencySellAmountError(amountError));
    } else {
      dispatch(setCurrencyBuyAmountError(amountError));
    }
    dispatch(setSelectedBankError(bankError));
    dispatch(setCardNumberError(cardNumberError));

    hasErrors = hasErrors || !!(amountError || bankError || cardNumberError);
  }

  // Validate cash fields
  if (selectedCurrencySellType === "CASH" || selectedCurrencyBuyType === "CASH") {
    const { currencySellAmount, currencyBuyAmount, selectedCity } = state.exchange;
    const position = selectedCurrencySellType === "CASH" ? "given" : "received";

    const amountError = validateExchangeInput({
      value: position === "given" ? currencySellAmount.value : currencyBuyAmount.value,
      inputType: "amount",
      position,
      minValue: 0,
    });

    const cityError = validateExchangeInput({
      value: selectedCity.value,
      inputType: "city",
      position,
      minValue: 0,
    });

    if (position === "given") {
      dispatch(setCurrencySellAmountError(amountError));
    } else {
      dispatch(setCurrencyBuyAmountError(amountError));
    }
    dispatch(setSelectedCityError(cityError));

    hasErrors = hasErrors || !!(amountError || cityError);
  }

  dispatch(setAreErrors(hasErrors));
  return hasErrors;
}; 