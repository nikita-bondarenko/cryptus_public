// import {
//   CurrencyPosition,
//   CurrencyType,
// } from "@/components/request/RequestDetails";
// import {
//   setCryptoInputAmountValue,
//   setCardInputAmountValue,
//   setCashInputAmountValue,
//   setCardInput,
//   setCashInput,
//   setCryptoInput,
//   setCryptoAmountError,
//   setCryptoWalletAddressError,
//   setCardAmountError,
//   setCardBankError,
//   setCardNumberError,
//   setCashAmountError,
//   setCashCityError,
//   setAreErrors,
// } from "./slices/exchangeInput/exchangeInputSlice";
// import { AppDispatch } from "./store";
// import { Rate } from "./slices/exchangeInput/types";
// import { RootState } from "./store";

// export type TranslateCurrencyValueProps = {
//   position: CurrencyPosition;
//   rate: Rate;
//   value: number | null;
// };

// export const roundTo8 = (num: number | null | undefined): number | null => {
//   if (num === null || num === undefined) return null;
//   return Math.round(num * 1e8) / 1e8;
// };

// export const translateCurrencyValue = ({
//   value,
//   position,
//   rate,
// }: TranslateCurrencyValueProps) => {
//   if (rate.from.value === null || rate.to.value === null) {
//     console.error("Rate is not set");
//     return null;
//   }

//   if (value === null) {
//     // console.error("Value is not number");
//     return null;
//   }

//   const coifficient = rate.from.value / rate.to.value;
//   const translatedValue =
//     position === "given" ? value * coifficient : value / coifficient;
//   const roundedValue = roundTo8(translatedValue);
//   return roundedValue;
// };




// export const getCurrencyTypeFromAction = (
//   actionType: string
// ): CurrencyType | null => {
//   if (actionType === setCardInput.type) return "card";
//   if (actionType === setCashInput.type) return "cash";
//   if (actionType === setCryptoInput.type) return "crypto";
//   return null;
// };

// // File: src/redux/helpers.ts

// // Assuming CurrencyPosition is defined elsewhere, e.g.:
// // type CurrencyPosition = 'from' | 'to';

// // Define the union type for all validatable fields
// export type ValidatedField = 'amount' | 'walletAddress' | 'cardNumber' | 'bank' | 'city';

// // Define the array of validatable fields for consistency
// export const validatedFields: ValidatedField[] = ['amount', 'walletAddress', 'cardNumber', 'bank', 'city'];

// // Define a type for the options passed to validators
// type ValidatorOptions = {
//   minValue?: number;
//   position?: CurrencyPosition;
// };

// // Define the type for a validator function
// type Validator = (value: unknown, options?: ValidatorOptions) => string | null;

// // --- Individual Validator Functions ---

// const validateAmount: Validator = (value, options) => {
//   // Only validate amount for 'given' position
//   if (options?.position !== 'given') return null;

//   if (value === null || value === undefined) {
//     return "Введите сумму";
//   }

//   const amount = Number(value);
//   const minValue = options?.minValue ?? 0;
//   if (isNaN(amount) || amount < minValue) {
//     return `Минимальная сумма должна быть не меньше ${minValue}`;
//   }
//   return null;
// };

// const validateWalletAddress: Validator = (value, options) => {
//   // Wallet address is optional for 'given' position
//   if (options?.position === 'given') return null;
  
//   if (!value || typeof value !== 'string' || value.trim() === '') {
//     return "Введите адрес кошелька";
//   }
//   return null;
// };

// const validateCardNumber: Validator = (value, options) => {
//   // Card number is optional for 'given' position
//   if (options?.position === 'given') return null;

//   if (!value || typeof value !== 'string') {
//     return "Введите номер карты";
//   }

//   const clearValue = value.trim().split(' ').join('');
//   if (clearValue.length < 16 || clearValue.length > 19 || !/^\d+$/.test(clearValue)) {
//     return "Неверный номер карты";
//   }
//   return null;
// };

// const validateBank: Validator = (value) => {
//   // Bank is required for both positions
//   if (!value) {
//     return "Выберите банк";
//   }
//   return null;
// };

// const validateCity: Validator = (value) => {
//   // City is required for both positions
//   if (!value || typeof value !== 'string' || value.trim() === '') {
//     return "Выберите город";
//   }
//   return null;
// };

// // --- Validator Map ---

// const validators: Record<ValidatedField, Validator> = {
//   amount: validateAmount,
//   walletAddress: validateWalletAddress,
//   cardNumber: validateCardNumber,
//   bank: validateBank,
//   city: validateCity,
// };

// // --- Main Validation Function ---

// export type ValidateExchangeInput = (props: {
//   value: unknown;
//   inputType: ValidatedField;
//   position: CurrencyPosition;
//   minValue: number;
// }) => string | null;

// export const validateExchangeInput: ValidateExchangeInput = ({ value, inputType, position, minValue }) => {
//   const validator = validators[inputType];

//   if (validator) {
//     const options: ValidatorOptions = {
//       minValue: inputType === 'amount' ? minValue : undefined,
//       position
//     };
//     return validator(value, options);
//   }

//   console.warn(`No specific validator found for input type: ${inputType}. Returning null.`);
//   return null;
// };

// export interface ExchangeInputState {
//   // ...
//   isInitialLoad: boolean;
// }

// export const validateAllFields = (
//   state: RootState,
//   dispatch: AppDispatch
// ) => {
//   const { selectedGiveType, selectedReceieveType } = state.exchangeType;
//   const { minValue } = state.exchangeInput;
//   let hasErrors = false;

//   // Validate crypto fields
//   if (selectedGiveType === "crypto" || selectedReceieveType === "crypto") {
//     const { amount, walletAddress } = state.exchangeInput.cryptoInput;
//     const position = selectedGiveType === "crypto" ? "given" : "received";

//     const amountError = validateExchangeInput({
//       value: amount.value,
//       inputType: "amount",
//       position,
//       minValue,
//     });

//     const walletAddressError = validateExchangeInput({
//       value: walletAddress.value,
//       inputType: "walletAddress",
//       position,
//       minValue,
//     });

//     dispatch(setCryptoAmountError(amountError));
//     dispatch(setCryptoWalletAddressError(walletAddressError));

//     hasErrors = hasErrors || !!(amountError || walletAddressError);
//   }

//   // Validate card fields
//   if (selectedGiveType === "card" || selectedReceieveType === "card") {
//     const { amount, bank, cardNumber } = state.exchangeInput.cardInput;
//     const position = selectedGiveType === "card" ? "given" : "received";

//     const amountError = validateExchangeInput({
//       value: amount.value,
//       inputType: "amount",
//       position,
//       minValue,
//     });

//     const bankError = validateExchangeInput({
//       value: bank.value,
//       inputType: "bank",
//       position,
//       minValue,
//     });

//     const cardNumberError = validateExchangeInput({
//       value: cardNumber.value,
//       inputType: "cardNumber",
//       position,
//       minValue,
//     });

//     dispatch(setCardAmountError(amountError));
//     dispatch(setCardBankError(bankError));
//     dispatch(setCardNumberError(cardNumberError));

//     hasErrors = hasErrors || !!(amountError || bankError || cardNumberError);
//   }

//   // Validate cash fields
//   if (selectedGiveType === "cash" || selectedReceieveType === "cash") {
//     const { amount, city } = state.exchangeInput.cashInput;
//     const position = selectedGiveType === "cash" ? "given" : "received";

//     const amountError = validateExchangeInput({
//       value: amount.value,
//       inputType: "amount",
//       position,
//       minValue,
//     });

//     const cityError = validateExchangeInput({
//       value: city.value,
//       inputType: "city",
//       position,
//       minValue,
//     });

//     dispatch(setCashAmountError(amountError));
//     dispatch(setCashCityError(cityError));

//     hasErrors = hasErrors || !!(amountError || cityError);
//   }

//   dispatch(setAreErrors(hasErrors));
//   return hasErrors;
// };
