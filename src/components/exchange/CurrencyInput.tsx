import {
  formatWithSpaces,
  normalizeInput,
  valueMask,
} from "@/helpers/valueMask";
import React, { memo, ReactNode, useEffect, useState } from "react";
import CurrencySelect, { CurrencyOption } from "./CurrencySelect";

export type CurrencyInputProps = {
  inputValue: number | null;
  onInputChange: (value: number) => void;
  placeholder: string;
  onSelectChange: (value: CurrencyOption) => void;
  options: CurrencyOption[];
  selectValue: CurrencyOption;
};

const CurrencyInput: React.FC<CurrencyInputProps> = memo(
  ({
    inputValue: outsideValue,
    onInputChange,
    onSelectChange,
    options,
    placeholder,
    selectValue,
  }) => {
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
      const newValue = valueMask(outsideValue);
      if (inputValue !== newValue) setInputValue(newValue);
    }, [outsideValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = normalizeInput(e.target.value);

      const parts = raw.split(",");
      const intPart = parts[0];
      const decPart = parts[1]?.slice(0, 8); // ограничить до 8 знаков

      const combined =
        decPart !== undefined ? `${intPart},${decPart}` : intPart;
      setInputValue(formatWithSpaces(combined));

      // Парсинг и вызов onChange
      const numeric = parseFloat(combined.replace(/\s/g, "").replace(",", "."));
      if (!isNaN(numeric)) {
        onInputChange(numeric);
      }
    };

    const handleBlur = () => {
      const cleaned = inputValue.replace(/[^\d,]/g, "").replace(/[,.]$/, "");
      const parts = cleaned.split(",");
      const intPart = parts[0] || "0";
      const decPart = parts[1]?.slice(0, 8);
      const normalized =
        decPart !== undefined ? `${intPart},${decPart}` : intPart;

      const formatted = formatWithSpaces(normalized);
      setInputValue(formatted);

      const numeric = parseFloat(
        normalized.replace(/\s/g, "").replace(",", ".")
      );
      if (!isNaN(numeric)) {
        onInputChange(numeric);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
      const isNumber = /^[0-9]$/.test(e.key);
      const isSeparator = e.key === "," || e.key === ".";

      if (!isNumber && !allowed.includes(e.key) && !isSeparator) {
        e.preventDefault();
      }
    };

    // console.log("input");

    return (
      <div className="shimmer-on-loading rounded-[6px] border-[1px] border-[#DEDEDE] min-w-0 bg-white flex items-center">
        <input
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          type="text"
          className="text-[13px] min-w-0 placeholder:text-[#CCCCCC] leading-[107%] py-[26px] pl-[19px] pr-[5px] flex-grow"
        />
        <CurrencySelect
          value={selectValue}
          onChange={onSelectChange}
          options={options}
        />
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;
