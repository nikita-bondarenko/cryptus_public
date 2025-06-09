import React, { memo, useCallback, useEffect, useState } from "react";
import { CurrencyPosition } from "../request/RequestDetails";
import CurrencyInput from "./CurrencyInput";
import { CurrencyOption } from "./CurrencySelect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectSectionHeadingProps,
  selectCurrencyOptions,
  selectBankOptions,
  selectBankValue,
  selectCardNumberValue,
  selectCardCurrency,
  selectBankError,
  selectCardNumberError,
  selectAreErrorsVisible,
} from "@/redux/selectors";
import {
  setActiveInputType,
  setCardCurrency,
  setCardBank,
  setCardNumber as setCardNumberAction,
} from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { usePlaceholder } from "@/hooks/usePlaceholder";
import SectionHeading from "../ui/SectionHeading";
import { InputWrapper } from "../ui/InputWrapper";
import { Input } from "../ui/Input";
import BankSelect, { BankOption } from "./BankSelect";
import { formatWithSpacesCardNumber, normalizeInput } from "@/helpers/valueMask";
import { useExchangeInput } from "@/hooks/useExchangeInput";

export type ExchangeCardInputProps = {
  position: CurrencyPosition;
};

const ExchangeCardInput: React.FC<ExchangeCardInputProps> = memo(({ position }) => {
  const [bank, setBank] = useState<BankOption | null>(null);
  const [cardNumber, setCardNumber] = useState<string | null>(null);
  
  const dispatch = useAppDispatch();
  const {
    selectedCurrency,
    setSelectedCurrency,
    isInitialLoad,
    setIsInitialLoad,
    globalStateValue,
    valueError,
    areErrorsVisible,
    onSelectChange,
    onInputChange
  } = useExchangeInput("card");

  const sectionHeadingProps = useAppSelector(
    selectSectionHeadingProps(position)
  );

  const currencyOptions = useAppSelector(selectCurrencyOptions("card"));
  const bankOptions = useAppSelector(selectBankOptions);
  const bankValue = useAppSelector(selectBankValue);
  const cardNumberValue = useAppSelector(selectCardNumberValue);
  const selectedCardCurrency = useAppSelector(selectCardCurrency);
  const bankError = useAppSelector(selectBankError);
  const cardNumberError = useAppSelector(selectCardNumberError);

  const placeholder = usePlaceholder(position);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    const isNumber = /^[0-9]$/.test(e.key);

    if (!isNumber && !allowed.includes(e.key)) {
      e.preventDefault();
    }
  }, []);

  const handleCardNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setActiveInputType("card"));
    const raw = normalizeInput(e.target.value);
    setCardNumber(formatWithSpacesCardNumber(raw));
  }, [dispatch]);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    if (!selectedCurrency) return;

    if (selectedCurrency.value !== selectedCardCurrency?.value) {
      dispatch(setCardCurrency(selectedCurrency));
    }
  }, [selectedCurrency, selectedCardCurrency, isInitialLoad, dispatch]);

  useEffect(() => {
    if (isInitialLoad) return;
    if (!bank) return;
    if (bank.value === bankValue?.value) return;

    dispatch(setCardBank(bank));
  }, [bank, bankValue, isInitialLoad, dispatch]);

  useEffect(() => {
    if (isInitialLoad) return;
    if (!cardNumber) return;
    if (cardNumber === cardNumberValue) return;

    dispatch(setCardNumberAction(cardNumber));
  }, [cardNumber, cardNumberValue, isInitialLoad, dispatch]);

  useEffect(() => {
    if (bank?.value !== bankValue?.value) {
      setBank(bankValue);
    }
  }, [bankValue]);

  useEffect(() => {
    if (cardNumber !== cardNumberValue) {
      setCardNumber(cardNumberValue);
    }
  }, [cardNumberValue]);

  useEffect(() => {
    if (JSON.stringify(selectedCurrency) !== JSON.stringify(selectedCardCurrency)) {
      setSelectedCurrency(selectedCardCurrency);
    }
  }, [selectedCardCurrency, selectedCurrency, setSelectedCurrency]);

  return (
    <div className="flex flex-col">
      <div>
        <SectionHeading
          {...sectionHeadingProps}
          error={!!valueError && areErrorsVisible}
        />
        <CurrencyInput
          placeholder={placeholder}
          inputValue={globalStateValue}
          onInputChange={onInputChange}
          onSelectChange={onSelectChange}
          selectValue={selectedCurrency as CurrencyOption}
          options={currencyOptions || []}
          error={!!valueError && areErrorsVisible}
        />
      </div>

      <BankSelect
        value={bankValue}
        options={bankOptions || []}
        onChange={(option) => {
          dispatch(setActiveInputType("card"));
          setBank(option);
        }}
        placeholder="Выберите банк получения"
        error={bankError && areErrorsVisible ? bankError : null}
      />
      {position === "received" && (
        <div className="-mb-16">
          <InputWrapper error={cardNumberError && areErrorsVisible ? cardNumberError : null}>
            <Input
              onChange={handleCardNumberChange}
              onKeyDown={handleKeyDown}
              value={cardNumber ?? ""}
              type="text"
              className=" border border-neutral-gray-200 rounded-6 bg-neutral-white text-16 leading-normal px-18 py-15 w-full"
              placeholder="Номер карты"
            />
          </InputWrapper>
        </div>
      )}
    </div>
  );
});

ExchangeCardInput.displayName = "ExchangeCardInput";

export default ExchangeCardInput; 