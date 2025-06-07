import React, { memo, useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import clsx from "clsx";
import "simplebar-react/dist/simplebar.min.css";
import { InputWrapper } from "../ui/InputWrapper";

export type SelectOption = {
  name: string;
  value: string;
};

export type BankOption = SelectOption;

export type BankSelectProps = {
  options: BankOption[];
  onChange: (value: BankOption | null) => void;
  value: BankOption | null;
  placeholder: string;
  error?: string | null;
};

const BankSelect: React.FC<BankSelectProps> = memo(
  ({ options, onChange, value, placeholder, error }) => {
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

    return (
      <div className="w-full shrink-0 [&_button]:text-16 shimmer-on-loading relative" ref={dropdownRef}>
        <InputWrapper error={error} errorIcon={false}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            tabIndex={-1}
            className={clsx(
              "relative w-full flex items-center justify-between px-16 py-15 rounded-6 border border-neutral-gray-300 bg-neutral-white text-13 transition-all duration-500",
              { "[&]:border-primary-red": !!error }
            )}
          >
            <div className="text-16 text-neutral-black">
              {value ? value.name : placeholder}
            </div>
            <div
            
            >
              <svg
                className={`ml-2 w-15 h-15 transition-transform ${
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
            </div>
          </button>
        </InputWrapper>

        {isOpen && (
          <div className="absolute left-0 top-59 mt-1 w-full z-50 bg-neutral-white border border-neutral-gray-200 rounded-6 max-h-134 overflow-hidden">
            <SimpleBar style={{ maxHeight: 134 }} className="custom-scrollbar">
              <div className="flex flex-col py-6 gap-0">
                {options.length === 0 ? (
                  <div className="px-18 py-9 text-13 text-neutral-gray-700">
                    ничего не нашлось
                  </div>
                ) : (
                  options.map((option) => (
                    <button
                      className="shrink-0 px-18 py-9 text-left w-full not-last:border-b not-last:border-neutral-gray-500"
                      key={option.value}
                      onClick={() => {
                        onChange(option);
                        setIsOpen(false);
                      }}
                    >
                      {option.name}
                    </button>
                  ))
                )}
              </div>
            </SimpleBar>
          </div>
        )}
      </div>
    );
  }
);

BankSelect.displayName = "BankSelect";

export default BankSelect;
