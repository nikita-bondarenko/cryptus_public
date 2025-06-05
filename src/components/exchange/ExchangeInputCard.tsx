import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ExchangeInputProps } from "./ExchangeInputCrypto";
import { cryptoCurrencyList } from "@/data/cryptoCurrencyList";
import { cryptoNets } from "@/data/cryptoNets";
import {
  formatWithSpacesCardNumber,
  normalizeInput,
  valueMask,
} from "@/helpers/valueMask";
import SectionHeading, { SectionHeadingProps } from "../ui/SectionHeading";
import { CryptoNetOption } from "./CryptoNetSelect";
import CurrencyInput from "./CurrencyInput";
import { CurrencyOption } from "./CurrencySelect";
import Select, { SelectOption } from "./Select";
import { nonCryptoCurrencyList } from "@/data/nonCryptoCurrencyList";
import { banksList } from "@/data/banksList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectSectionHeadingProps } from "@/redux/selectors";
import {
  setActiveInputType,
  setCardInput,
  setCashInput,
} from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { usePlaceholder } from "@/hooks/usePlaceholder";

export type ExchangeInputCardProps = ExchangeInputProps;

const ExchangeInputCard: React.FC<ExchangeInputCardProps> = memo(
  ({ position }) => {
    const [value, setValue] = useState<number | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(
      nonCryptoCurrencyList[0]
    );
    const [bank, setBank] = useState<SelectOption | null>(null);
    const [cardNumber, setCardNumber] = useState<string>("");
    const onSelectChange = useCallback((option: CurrencyOption) => {
      setSelectedCurrency(option);
    }, []);
    const onInputChange = useCallback((value: number | null) => {
      dispatch(setActiveInputType("card"));

      setValue(value);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
      const isNumber = /^[0-9]$/.test(e.key);

      if (!isNumber && !allowed.includes(e.key)) {
        e.preventDefault();
      }
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = normalizeInput(e.target.value);
      setCardNumber(formatWithSpacesCardNumber(raw));
    };

    const memoizedSelector = useMemo(
      () => selectSectionHeadingProps(position),
      [position]
    );
    const sectionHeadingProps = useAppSelector(memoizedSelector);

    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(
        setCardInput({
          amountValue: value,
          currency: selectedCurrency,
          bankValue: bank,
          cardNumberValue: cardNumber,
        })
      );
    }, [value, selectedCurrency, bank, cardNumber]);

    const currencyOptions = useAppSelector(
      (state) => state.exchangeInput.options.nonCryptoCurrencyOptions
    );

    useEffect(() => {
      setSelectedCurrency(currencyOptions[0]);
    }, [currencyOptions]);

    const bankOptions = useAppSelector(
      (state) => state.exchangeInput.options.bankOptions
    );
    useEffect(() => {
      setBank(null);
    }, [bankOptions]);

    const globalStateValue = useAppSelector(
      (state) => state.exchangeInput.cardInput.amount.value
    );

    useEffect(() => {
      setValue(globalStateValue);
    }, [globalStateValue]);

    const placeholder = usePlaceholder(position);

    return (
      <div className="flex flex-col gap-[12px]">
        <div className="">
          <SectionHeading {...sectionHeadingProps}></SectionHeading>
          <CurrencyInput
            placeholder={placeholder}
            inputValue={globalStateValue}
            onInputChange={onInputChange}
            onSelectChange={onSelectChange}
            selectValue={selectedCurrency}
            options={currencyOptions}
          ></CurrencyInput>
        </div>
        <Select
          value={bank}
          options={bankOptions}
          onChange={setBank}
          placeholder="Выберите банк получения"
        ></Select>
        {position === "received" && (
          <input
            onChange={handleCardNumberChange}
            onKeyDown={handleKeyDown}
            value={cardNumber}
            type="text"
            className="shimmer-on-loading border-[1px] border-[#dedede] rounded-[6px] bg-white text-[13px] leading-[107%] px-[18px] py-[15px] w-full"
            placeholder="Номер  карты"
          />
        )}
      </div>
    );
  }
);

ExchangeInputCard.displayName = "ExchangeInputCard";

export default ExchangeInputCard;
