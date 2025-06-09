import React, { memo, useEffect, useState } from "react";
import { CurrencyPosition } from "../request/RequestDetails";
import CurrencyInput from "./CurrencyInput";
import { CurrencyOption } from "./CurrencySelect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectSectionHeadingProps,
  selectCurrencyOptions,
  selectCityOptions,
  selectCityValue,
  selectCashCurrency,
  selectCityError,
  selectAreErrorsVisible,
} from "@/redux/selectors";
import {
  setActiveInputType,
  setCashCurrency,
  setCashCity,
} from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { usePlaceholder } from "@/hooks/usePlaceholder";
import SectionHeading from "../ui/SectionHeading";
import CitySelect from "./CitySelect";
import { useExchangeInput } from "@/hooks/useExchangeInput";

export type ExchangeCashInputProps = {
  position: CurrencyPosition;
};

const ExchangeCashInput: React.FC<ExchangeCashInputProps> = memo(({ position }) => {
  const [city, setCity] = useState<string | null>(null);
  
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
  } = useExchangeInput("cash");

  const sectionHeadingProps = useAppSelector(
    selectSectionHeadingProps(position)
  );

  const currencyOptions = useAppSelector(selectCurrencyOptions("cash"));
  const cityOptions = useAppSelector(selectCityOptions);
  const cityValue = useAppSelector(selectCityValue);
  const selectedCashCurrency = useAppSelector(selectCashCurrency);
  const cityError = useAppSelector(selectCityError);

  const placeholder = usePlaceholder(position);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    if (!selectedCurrency) return;

    if (selectedCurrency.value !== selectedCashCurrency?.value) {
      dispatch(setCashCurrency(selectedCurrency));
    }
  }, [selectedCurrency, selectedCashCurrency, isInitialLoad, dispatch]);

  useEffect(() => {
    if (isInitialLoad) return;
    if (city === cityValue) return;
console.log(city)
    dispatch(setCashCity(city));
  }, [city, cityValue, isInitialLoad, dispatch]);

  useEffect(() => {
    if (city !== cityValue) {
      setCity(cityValue);
    }
  }, [cityValue]);

  useEffect(() => {
    if (JSON.stringify(selectedCurrency) !== JSON.stringify(selectedCashCurrency)) {
      setSelectedCurrency(selectedCashCurrency);
    }
  }, [selectedCashCurrency, selectedCurrency, setSelectedCurrency]);

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

      <CitySelect
        value={cityValue ?? ""}
        options={cityOptions || []}
        onChange={(option) => {
          dispatch(setActiveInputType("cash"));
          setCity(option);
          console.log(option)
        }}
        placeholder="Выберите город получения"
        placeholderFocused="Введите название города"
        error={cityError && areErrorsVisible ? cityError : null}
      />
    </div>
  );
});

ExchangeCashInput.displayName = "ExchangeCashInput";

export default ExchangeCashInput; 