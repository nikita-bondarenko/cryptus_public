import { AppDispatch } from "../store";
import { RootState } from "../store";
import {
  setCryptoAmountError,
  setCryptoWalletAddressError,
  setCardAmountError,
  setCardBankError,
  setCardNumberError,
  setCashAmountError,
  setCashCityError,
  setAreErrors,
} from "../slices/exchangeInput/exchangeInputSlice";
import { validateExchangeInput } from "./validateExchangeInput";

export const validateAllFields = (
  state: RootState,
  dispatch: AppDispatch
) => {
  const { selectedGiveType, selectedReceieveType } = state.exchangeType;
  const { minValue } = state.exchangeInput;
  let hasErrors = false;

  // Validate crypto fields
  if (selectedGiveType === "crypto" || selectedReceieveType === "crypto") {
    const { amount, walletAddress } = state.exchangeInput.cryptoInput;
    const position = selectedGiveType === "crypto" ? "given" : "received";

    const amountError = validateExchangeInput({
      value: amount.value,
      inputType: "amount",
      position,
      minValue,
    });

    const walletAddressError = validateExchangeInput({
      value: walletAddress.value,
      inputType: "walletAddress",
      position,
      minValue,
    });

    dispatch(setCryptoAmountError(amountError));
    dispatch(setCryptoWalletAddressError(walletAddressError));
console.log(amountError, walletAddressError);
    hasErrors =  !!(amountError || walletAddressError);
  }

  // Validate card fields
  if (selectedGiveType === "card" || selectedReceieveType === "card") {
    const { amount, bank, cardNumber } = state.exchangeInput.cardInput;
    const position = selectedGiveType === "card" ? "given" : "received";

    const amountError = validateExchangeInput({
      value: amount.value,
      inputType: "amount",
      position,
      minValue,
    });

    const bankError = validateExchangeInput({
      value: bank.value,
      inputType: "bank",
      position,
      minValue,
    });

    const cardNumberError = validateExchangeInput({
      value: cardNumber.value,
      inputType: "cardNumber",
      position,
      minValue,
    });

    dispatch(setCardAmountError(amountError));
    dispatch(setCardBankError(bankError));
    dispatch(setCardNumberError(cardNumberError));

    hasErrors = hasErrors || !!(amountError || bankError || cardNumberError);
  }

  // Validate cash fields
  if (selectedGiveType === "cash" || selectedReceieveType === "cash") {
    const { amount, city } = state.exchangeInput.cashInput;
    const position = selectedGiveType === "cash" ? "given" : "received";

    const amountError = validateExchangeInput({
      value: amount.value,
      inputType: "amount",
      position,
      minValue,
    });

    const cityError = validateExchangeInput({
      value: city.value,
      inputType: "city",
      position,
      minValue,
    });

    dispatch(setCashAmountError(amountError));
    dispatch(setCashCityError(cityError));

    hasErrors = hasErrors || !!(amountError || cityError);
  }

  dispatch(setAreErrors(hasErrors));
  return hasErrors;
}; 