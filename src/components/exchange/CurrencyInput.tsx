import {
  formatWithSpaces,
  normalizeInput,
  valueMask,
} from "@/helpers/valueMask";
import React, { memo, useEffect, useState, useCallback } from "react";
import CurrencySelect, { CurrencyOption } from "./CurrencySelect";
import clsx from "clsx";

export type CurrencyInputProps = {
  inputValue: number | null;
  onInputChange: (value: number | null) => void;
  placeholder: string;
  onSelectChange: (value: CurrencyOption) => void;
  options: CurrencyOption[];
  selectValue: CurrencyOption;
  error?: boolean
};

const CurrencyInput: React.FC<CurrencyInputProps> = memo(
  ({
    inputValue: outsideValue,
    onInputChange,
    onSelectChange,
    options,
    placeholder,
    selectValue,
    error
  }) => {
    const [inputValue, setInputValue] = useState<string>("");

    // Обработка внешнего значения
    useEffect(() => {
      const newValue = valueMask(outsideValue);

      if (outsideValue === null) {
        if (newValue !== "") {
          setInputValue("");
        }
         
        return;
      }
      if (newValue !== inputValue) {
        setInputValue(newValue);
      }
    }, [outsideValue, inputValue]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = normalizeInput(e.target.value);
      
      if (!raw) {
        setInputValue("");
        onInputChange(null);
        return;
      }

      const parts = raw.split(",");
      const intPart = parts[0];
      const decPart = parts[1]?.slice(0, 8);

      const combined = decPart !== undefined ? `${intPart},${decPart}` : intPart;
      const formatted = formatWithSpaces(combined);
      setInputValue(formatted);

      const numeric = parseFloat(combined.replace(/\s/g, "").replace(",", "."));
      onInputChange(!isNaN(numeric) ? numeric : null);
    }, [onInputChange]);

    const handleBlur = useCallback(() => {
      if (!inputValue) {
        onInputChange(null);
        return;
      }

      const cleaned = inputValue.replace(/[^\d,]/g, "").replace(/[,.]$/, "");
      const parts = cleaned.split(",");
      const intPart = parts[0] || "0";
      const decPart = parts[1]?.slice(0, 8);
      const normalized = decPart !== undefined ? `${intPart},${decPart}` : intPart;

      const formatted = formatWithSpaces(normalized);
      setInputValue(formatted);

      const numeric = parseFloat(normalized.replace(/\s/g, "").replace(",", "."));
      onInputChange(!isNaN(numeric) ? numeric : null);
    }, [inputValue, onInputChange]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
      const isNumber = /^[0-9]$/.test(e.key);
      const isSeparator = e.key === "," || e.key === ".";

      if (!isNumber && !allowed.includes(e.key) && !isSeparator) {
        e.preventDefault();
      }
    }, []);

    return (
      <div className={clsx("shimmer-on-loading rounded-6 border border-[#E9E9E9] min-w-0 bg-white flex items-center", {"[&]:border-[#FF6769]": error})}>
        <input
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          type="text"
          className="text-16 min-w-0 placeholder:text-[#CCCCCC] leading-[1.07] py-26 pl-19 pr-5 flex-grow"
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
