import React, { memo, useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import clsx from "clsx";

export type SelectOption = {
  name: string;
  value: string;
};

export type SelectProps = {
  options: SelectOption[];
  onChange: (value: SelectOption) => void;
  value: SelectOption | null | undefined;
  placeholder: string;
  error?: string | null
};

const Select: React.FC<SelectProps> = memo(
  ({ options, onChange, value: selected, placeholder, error }) => {
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

    return (
      <div className="relative w-full shrink-0 [&_button]:text-[16px] shimmer-on-loading pb-[16px] mb-[-16px]" ref={dropdownRef}>
           {!!error && (
          <p className="absolute left-0 text-[#FF676A] text-[12px] bottom-0">
            {error}
          </p>
        )}
        <button
          type="button"
          className={clsx("w-full flex items-center justify-between px-[16px] py-[15px] rounded-[6px] border-[1px] border-[#DEDEDE] bg-white text-[13px]",  { "[&]:border-[#FF6769]": !!error })}
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
          <div className="absolute left-0 top-[59px] mt-1 w-full z-50 bg-white border border-[#E9E9E9] rounded-[6px] max-h-[134px] overflow-hidden">
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
