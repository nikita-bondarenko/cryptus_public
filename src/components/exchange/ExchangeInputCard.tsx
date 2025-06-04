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

export type ExchangeInputCardProps = ExchangeInputProps;

const ExchangeInputCard: React.FC<ExchangeInputCardProps> = memo(
  ({ placeholder, position, title, rate, minValue }) => {
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
        <Select
          value={bank}
          options={banksList}
          onChange={setBank}
          placeholder="Выберите банк получения"
        ></Select>
        {position === "received" && (
          <input
            onChange={handleCardNumberChange}
            onKeyDown={handleKeyDown}
            value={cardNumber}
            type="text"
            className="border-[1px] border-[#dedede] rounded-[6px] bg-white text-[13px] leading-[107%] px-[18px] py-[15px] w-full"
            placeholder="Номер  карты"
          />
        )}
      </div>
    );
  }
);

ExchangeInputCard.displayName = "ExchangeInputCard";

export default ExchangeInputCard;
