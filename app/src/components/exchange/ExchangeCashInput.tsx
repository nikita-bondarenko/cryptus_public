import React, { memo, useEffect, useState } from "react";
import { CurrencyPosition } from "../request/RequestDetails";
import CurrencyInput from "./CurrencyInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectSectionHeadingProps,
  selectCurrencyOptions,
  selectCityOptions,
  selectCityValue,
  selectCityError,
  selectAreErrorsVisible,
} from "@/redux/selectors";

import { usePlaceholder } from "@/hooks/usePlaceholder";
import SectionHeading from "../ui/SectionHeading";
import CitySelect, { CityOption } from "./CitySelect";
import { useExchangeInput } from "@/hooks/useExchangeInput";
import { setSelectedCityValue } from "@/redux/slices/exchangeSlice/exchangeSlice";
import { Currency } from "@/redux/api/types";


export type ExchangeCashInputProps = {
  position: CurrencyPosition;
};

const ExchangeCashInput: React.FC<ExchangeCashInputProps> = memo(({ position }) => {
  
  const dispatch = useAppDispatch();
  const {
    selectedCurrency,
    isInitialLoad,
    setIsInitialLoad,
    globalStateValue,
    valueError,
    areErrorsVisible,
    onSelectChange,
    onInputChange
  } = useExchangeInput(position);

  const sectionHeadingProps = useAppSelector(
    selectSectionHeadingProps(position)
  );

  const currencyOptions = useAppSelector(selectCurrencyOptions(position));
  const cityOptions = useAppSelector(selectCityOptions);
  const cities = useAppSelector(state => state.exchange.cities);
  const cityValue = useAppSelector(selectCityValue);
  
  const cityError = useAppSelector(selectCityError);

  const placeholder = usePlaceholder(position, "CASH");

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

  }, []);

  const onSelectCity = (cityName: string | null) => {
    if (isInitialLoad) return;

    const city = cities?.find(city => city.name === cityName) || null;
    dispatch(setSelectedCityValue(city));
  }

  useEffect(() => {
    // console.log(cityValue)
  }, [cityValue])

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
          selectValue={selectedCurrency as Currency}
          options={currencyOptions || []}
          error={!!valueError && areErrorsVisible}
        />
      </div>

      <CitySelect
        value={cityValue.value?.name || ''}
        options={cityOptions || []}
        onChange={onSelectCity}
        placeholder="Выберите город получения"
        placeholderFocused="Введите название города"
        error={cityError && areErrorsVisible ? cityError : null}
      />
    </div>
  );
});

ExchangeCashInput.displayName = "ExchangeCashInput";

export default ExchangeCashInput;

