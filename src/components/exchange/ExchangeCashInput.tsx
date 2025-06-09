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
import CitySelect, { CityOption } from "./CitySelect";
import { useExchangeInput } from "@/hooks/useExchangeInput";
import { setSelectedCityValue } from "@/redux/slices/exchangeSlice/exchangeSlice";
import { City } from "@/api/types";
import { SelectOption } from "@/components/exchange/BankSelect";

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

  const placeholder = usePlaceholder(position);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

  }, []);

  const onSelectCity = (cityName: string | null) => {
    if (isInitialLoad) return;

    const city = cities?.find(city => city.title === cityName);
    if (city) {
      dispatch(setSelectedCityValue(city));
    }
  }

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
        value={cityValue?.name ?? ""}
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

