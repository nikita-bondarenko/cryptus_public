import React, { memo, useCallback, useState } from "react";
import { ExchangeInputProps } from "./ExchangeInputCrypto";
import { cryptoCurrencyList } from "@/data/cryptoCurrencyList";
import { cryptoNets } from "@/data/cryptoNets";
import {
  formatWithSpacesCardNumber,
  normalizeInput,
  valueMask,
} from "@/helpers/valueMask";
import SectionHeading from "../ui/SectionHeading";
import { CryptoNetOption } from "./CryptoNetSelect";
import CurrencyInput from "./CurrencyInput";
import { CurrencyOption } from "./CurrencySelect";
import Select, { SelectOption } from "./Select";
import { nonCryptoCurrencyList } from "@/data/nonCryptoCurrencyList";
import { banksList } from "@/data/banksList";
import { cityList } from "@/data/cityList";
import CitySelect from "./CitySelect";

export type ExchangeInputCashProps = ExchangeInputProps;

const ExchangeInputCash: React.FC<ExchangeInputCashProps> = memo(
  ({ placeholder,  title, rate, minValue }) => {
    const [value, setValue] = useState<number | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(
      nonCryptoCurrencyList[0]
    );  
    const [city, setCity] = useState<string>('');
    const onSelectChange = useCallback((option: CurrencyOption) => {
      setSelectedCurrency(option);
    }, []);
    const onInputChange = useCallback((value: number | null) => {
      setValue(value);
    }, []);

    return (
      <div className="flex flex-col gap-[12px]">
        <div className="">
          <SectionHeading
            title={title}
            rate={rate}
            minValue={minValue}
          ></SectionHeading>
          <CurrencyInput
            placeholder={valueMask(placeholder)}
            inputValue={value}
            onInputChange={onInputChange}
            onSelectChange={onSelectChange}
            selectValue={selectedCurrency}
            options={nonCryptoCurrencyList}
          ></CurrencyInput>
        </div>
        <CitySelect
          value={city}
          options={cityList}
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
