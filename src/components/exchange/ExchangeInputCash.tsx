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
import { cityList } from "@/data/cityList";
import CitySelect from "./CitySelect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { title } from "process";
import { selectSectionHeadingProps } from "@/redux/selectors";
import { setCashInput } from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { usePlaceholder } from "@/hooks/usePlaceholder";

export type ExchangeInputCashProps = ExchangeInputProps;

const ExchangeInputCash: React.FC<ExchangeInputCashProps> = memo(
  ({ position }) => {
    const [value, setValue] = useState<number | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(
      nonCryptoCurrencyList[0]
    );
    const [city, setCity] = useState<string>("");
    const onSelectChange = useCallback((option: CurrencyOption) => {
      setSelectedCurrency(option);
    }, []);
    const onInputChange = useCallback((value: number | null) => {
      setValue(value);
    }, []);

    const memoizedSelector = useMemo(
      () => selectSectionHeadingProps(position),
      [position]
    );
    const sectionHeadingProps = useAppSelector(memoizedSelector);

    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(
        setCashInput({
          amountValue: value,
          currency: selectedCurrency,
          cityValue: city,
        })
      );
    }, [value, selectedCurrency, city]);

    const currencyOptions = useAppSelector(
      (state) => state.exchangeInput.options.nonCryptoCurrencyOptions
    );

    useEffect(() => {
      setSelectedCurrency(currencyOptions[0]);
    }, [currencyOptions]);

    const cityOptions = useAppSelector(
      (state) => state.exchangeInput.options.cityOptions
    );

    useEffect(() => {
      setCity("");
    }, [cityOptions]);

    const globalStateValue = useAppSelector(
      (state) => state.exchangeInput.cashInput.amount.value
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
        <CitySelect
          value={city}
          options={cityOptions}
          onChange={setCity}
          placeholder="Выберите город получения"
          placeholderFocused="Введите название города"
        ></CitySelect>
      </div>
    );
  }
);

ExchangeInputCash.displayName = "ExchangeInputCash";

export default ExchangeInputCash;
