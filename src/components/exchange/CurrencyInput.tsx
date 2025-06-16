import {
  formatWithSpaces,
  normalizeInput,
  valueMask,
} from "@/helpers/valueMask";
import React, { memo, useEffect, useState, useCallback } from "react";
import CurrencySelect from "./CurrencySelect";
import { InputWrapper } from "../ui/InputWrapper";
import { Input } from "../ui/Input";
import { Currency } from "@/redux/api/types";

export type CurrencyInputProps = {
  inputValue: number | null;
  onInputChange: (value: number | null) => void;
  onSelectChange: (option: Currency) => void;
  selectValue: Currency;
  options: Currency[];
  placeholder?: string;
  error?: boolean;
};

const CurrencyInput: React.FC<CurrencyInputProps> = memo(
  ({
    inputValue: outsideValue,
    onInputChange,
    onSelectChange,
    options,
    placeholder,
    selectValue,
    error,
  }) => {
    const [inputValue, setInputValue] = useState<string>("");

    // Обработка внешнего значения
    useEffect(() => {
      if (outsideValue === null) {
        setInputValue("");
        return;
      }
      const newValue = valueMask(outsideValue);

      if (newValue !== inputValue) {
        setInputValue(newValue);
      }
    }, [outsideValue]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = normalizeInput(e.target.value);

        if (!raw) {
          setInputValue("");
          onInputChange(null);
          return;
        }

        const parts = raw.split(",");
        const intPart = parts[0];
        const decPart = parts[1]?.slice(0, 8);

        const combined =
          decPart !== undefined ? `${intPart},${decPart}` : intPart;
        const formatted = formatWithSpaces(combined);
        setInputValue(formatted);

        const numeric = parseFloat(
          combined.replace(/\s/g, "").replace(",", ".")
        );
        onInputChange(!isNaN(numeric) ? numeric : null);
      },
      [onInputChange]
    );

    const handleBlur = useCallback(() => {
      if (!inputValue) {
        onInputChange(null);
        return;
      }

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
      onInputChange(!isNaN(numeric) ? numeric : null);
    }, [inputValue, onInputChange]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowed = [
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "Tab",
        ];
        const isNumber = /^[0-9]$/.test(e.key);
        const isSeparator = e.key === "," || e.key === ".";

        if (!isNumber && !allowed.includes(e.key) && !isSeparator) {
          e.preventDefault();
        }
      },
      []
    );

    return (
      <div className="relative">
        <InputWrapper
          error={error ? "error" : null}
          showErrorText={false}
          errorIcon={false}
          className="pb-0"
        >
          <div className="py-7 rounded-6 border transition-all duration-500 border-neutral-gray-300 bg-neutral-white">
            <div className="relative w-full flex items-center justify-between text-13">
              <Input
                value={inputValue || ""}
                onChange={handleChange}
                placeholder={placeholder}
              />
              <CurrencySelect
                value={selectValue}
                options={options}
                onChange={onSelectChange}
              />
            </div>
          </div>
        </InputWrapper>
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;
