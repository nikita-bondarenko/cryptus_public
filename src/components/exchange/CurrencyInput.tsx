import React, { memo, useEffect, useState } from "react";
// import CurrencySelect, { CurrencySelectProps } from "./CurrencySelect";

export type CurrencyInputProps = {
  // selector: CurrencySelectProps;
  value: number | null;
  onChange: (value: number) => void;
};

const formatWithSpaces = (value: string) => {
  const [intPart, decPart] = value.split(",");
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return decPart !== undefined ? `${formattedInt},${decPart}` : formattedInt;
};

const normalizeInput = (val: string) => {
  return val
    .replace(/[^\d.,]/g, "") // только цифры, , и .
    .replace(/[,\.]{2,}/g, "") // убираем подряд идущие ,
    .replace(/[.]/g, ","); // заменяем точку на запятую
};

const CurrencyInput: React.FC<CurrencyInputProps> = memo(
  ({
    //  selector,
      value: outsideValue, onChange }) => {
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
      if (outsideValue && !isNaN(outsideValue) ) {
        const stringVal = outsideValue.toString().replace(".", ",");
        setInputValue(formatWithSpaces(stringVal));
      } else {
        setInputValue('')
      }
    }, [outsideValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = normalizeInput(e.target.value);

      const parts = raw.split(",");
      const intPart = parts[0];
      const decPart = parts[1]?.slice(0, 8); // ограничить до 8 знаков

      const combined = decPart !== undefined ? `${intPart},${decPart}` : intPart;
      setInputValue(formatWithSpaces(combined));

      // Парсинг и вызов onChange
      const numeric = parseFloat(combined.replace(/\s/g, "").replace(",", "."));
      if (!isNaN(numeric)) {
        onChange(numeric);
      }
    };

    const handleBlur = () => {
      const cleaned = inputValue.replace(/[^\d,]/g, "").replace(/[,.]$/, "");
      const parts = cleaned.split(",");
      const intPart = parts[0] || "0";
      const decPart = parts[1]?.slice(0, 8);
      const normalized = decPart !== undefined ? `${intPart},${decPart}` : intPart;

      const formatted = formatWithSpaces(normalized);
      setInputValue(formatted);

      const numeric = parseFloat(normalized.replace(/\s/g, "").replace(",", "."));
      if (!isNaN(numeric)) {
        onChange(numeric);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    };

    return (
      <div className="rounded-[6px] border-[1px] border-[#DEDEDE] bg-white flex items-center">
        <input
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          inputMode="decimal"
          type="text"
          className="text-[13px] placeholder:text-[#CCCCCC] leading-[107%] py-[26px] pl-[19px] pr-[5px] flex-grow"
        />
        {/* <CurrencySelect {...selector} /> */}
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;
