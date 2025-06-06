import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ExchangeInputProps } from "./ExchangeInputCrypto";

import SectionHeading from "../ui/SectionHeading";
import CurrencyInput from "./CurrencyInput";
import { CurrencyOption } from "./CurrencySelect";
import { nonCryptoCurrencyList } from "@/data/nonCryptoCurrencyList";

import CitySelect from "./CitySelect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectSectionHeadingProps } from "@/redux/selectors";
import { setCashInput } from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { usePlaceholder } from "@/hooks/usePlaceholder";
import { setActiveInputType } from "@/redux/slices/exchangeInput/exchangeInputSlice";

export type ExchangeInputCashProps = ExchangeInputProps;

const ExchangeInputCash: React.FC<ExchangeInputCashProps> = memo(
  ({ position }) => {
    const [value, setValue] = useState<number | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(
      nonCryptoCurrencyList[0]
    );
    const [city, setCity] = useState<string>("");
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const dispatch = useAppDispatch();

    const { selectedGiveType, selectedReceieveType } = useAppSelector(
      (state) => state.exchangeType
    );

    useEffect(() => {
      setIsInitialLoad(true);
    }, [selectedGiveType, selectedReceieveType]);

    const onSelectChange = useCallback((option: CurrencyOption) => {
      dispatch(setActiveInputType("cash"));
      setSelectedCurrency(option);
    }, [dispatch]);

    const onInputChange = useCallback((value: number | null) => {
      dispatch(setActiveInputType("cash"));
      setValue(value);
    }, [dispatch]);

    const memoizedSelector = useMemo(
      () => selectSectionHeadingProps(position),
      [position]
    );
    const sectionHeadingProps = useAppSelector(memoizedSelector);

    useEffect(() => {
      if (isInitialLoad) {
        setIsInitialLoad(false);
        return;
      }

      dispatch(
        setCashInput({
          amountValue: value,
          currency: selectedCurrency,
          cityValue: city,
        })
      );
    }, [value, selectedCurrency, city, isInitialLoad, dispatch]);

    useEffect(() => {
      return () => {
        setIsInitialLoad(true);
      };
    }, []);

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

    const valueError = useAppSelector(
      (state) => state.exchangeInput.cashInput.amount.error
    );

    const cityError = useAppSelector(
      (state) => state.exchangeInput.cashInput.city.error
    );

    const areErrorsVisible = useAppSelector(
      (state) => state.exchangeInput.areErrorsVisible
    );

    const placeholder = usePlaceholder(position);

    return (
      <div className="flex flex-col gap-[12px]">
        <div className="">
          <SectionHeading
            {...sectionHeadingProps}
            error={!!valueError && areErrorsVisible}
          ></SectionHeading>
          <CurrencyInput
            placeholder={placeholder}
            inputValue={globalStateValue}
            onInputChange={onInputChange}
            onSelectChange={onSelectChange}
            selectValue={selectedCurrency}
            options={currencyOptions}
            error={!!valueError && areErrorsVisible}
          ></CurrencyInput>
        </div>
        <CitySelect
          value={city}
          options={cityOptions}
          onChange={(option) => {
            dispatch(setActiveInputType("cash"));
            setCity(option);
          }}
          placeholder="Выберите город получения"
          placeholderFocused="Введите название города"
          error={cityError && areErrorsVisible ? cityError : null}
        ></CitySelect>
      </div>
    );
  }
);

ExchangeInputCash.displayName = "ExchangeInputCash";

export default ExchangeInputCash;
