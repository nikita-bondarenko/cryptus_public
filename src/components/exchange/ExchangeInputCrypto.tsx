import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { CurrencyPosition } from "../request/RequestDetails";
import SectionHeading, { SectionHeadingProps } from "../ui/SectionHeading";
import CurrencyInput from "./CurrencyInput";
import CurrencySelect, { CurrencyOption } from "./CurrencySelect";
import { cryptoCurrencyList } from "@/data/cryptoCurrencyList";
import { valueMask } from "@/helpers/valueMask";
import CryptoNetSelect, { CryptoNetOption } from "./CryptoNetSelect";
import { cryptoNets } from "@/data/cryptoNets";

export type ExchangeInputProps = {
  placeholder: number;
  position: CurrencyPosition;
} & SectionHeadingProps;

export type ExchangeInputCryptoProps = ExchangeInputProps

const ExchangeInputCrypto: React.FC<ExchangeInputCryptoProps> = memo(
  ({ title, rate, minValue, placeholder, position }) => {
    const [value, setValue] = useState<number | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(
      cryptoCurrencyList[0]
    );
    const [selectedNet, setSelectedNet] = useState<CryptoNetOption>(
      cryptoNets[0]
    );
    const onSelectChange = useCallback((option: CurrencyOption) => {
      setSelectedCurrency(option);
    }, []);
    const onInputChange = useCallback((value: number | null) => {
      setValue(value);
    }, []);

        const [city, setCity] = useState("");


    return (
      <div className="">
        <div className="mb-[22px]">
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
            options={cryptoCurrencyList}
          ></CurrencyInput>
        </div>
        <div>
          <SectionHeading title={"Выберите сеть"}></SectionHeading>
          <CryptoNetSelect
            onChange={setSelectedNet}
            value={selectedNet}
            options={cryptoNets}
          ></CryptoNetSelect>
        </div>
        {position === "received" && (
          <input
            className="border-[1px] mt-[20px] border-[#dedede] rounded-[6px] bg-white text-[13px] leading-[107%] px-[18px] py-[15px] w-full"
            type="text"
            onChange={(e) => setCity(e.target.value)}
            placeholder={`Адрес кошелька в сети ${selectedNet.name}`}
          />
        )}
      </div>
    );
  }
);

ExchangeInputCrypto.displayName = "ExchangeInputCrypto";

export default ExchangeInputCrypto;
