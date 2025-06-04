import React, { memo, useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import { CurrencyOption } from "./CurrencySelect";

export type SelectOption = {
  name: string;
  value: string;
};

export type SelectProps = {
  options: SelectOption[];
  onChange: (value: SelectOption) => void;
  value: SelectOption | null | undefined;
  placeholder: string;
};

const Select: React.FC<SelectProps> = memo(
  ({ options, onChange, value: selected, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handlePointerDown = (event: PointerEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("pointerdown", handlePointerDown);
      return () => {
        document.removeEventListener("pointerdown", handlePointerDown);
      };
    }, []);

    const handleSelect = (option: SelectOption) => {
      onChange(option);
      setIsOpen(false);
    };
    // console.log("select");

    return (
      <div className="relative w-full shrink-0 [&_button]:text-[13px]" ref={dropdownRef}>
        <button
          type="button"
          className="w-full flex items-center justify-between px-[16px] py-[15px] rounded-[6px] border-[1px] border-[#DEDEDE] bg-white text-[13px]"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selected ? selected.name : placeholder}
          <svg
            className={`ml-2 w-[15px] h-[15px] transition-transform ${
              !isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="#999999"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute left-0 top-[105%] mt-1 w-full z-50 bg-white border border-[#DEDEDE] rounded-[6px] max-h-[134px] overflow-hidden">
            <SimpleBar style={{ maxHeight: 134 }} className="custom-scrollbar">
              <div className="flex flex-col py-[6px] gap-[0px]">
                {options.map((option) => (
                  <button
                    className="shrink-0 px-[18px] py-[9px] text-left w-full not-last:border-b-[1px] not-last:border-[#C3C3C3]"
                    key={option.value}
                    onClick={() => handleSelect(option)}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </SimpleBar>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
