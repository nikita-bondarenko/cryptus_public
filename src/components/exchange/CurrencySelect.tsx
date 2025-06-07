import React, { memo, useEffect, useRef, useState, forwardRef } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Icon from "../helpers/Icon";

export type CurrencyOption = {
  value: string;
  icon: string;
  name: string;
};

export type CurrencySelectProps = {
  options: CurrencyOption[];
  onChange: (value: CurrencyOption) => void;
  value: CurrencyOption;
};

const ButtonDisplay = memo(({ icon, name }: CurrencyOption) => (
  <span className="flex items-center gap-6 overflow-hidden text-ellipsis whitespace-nowrap text-16">
    <Icon src={icon} className="w-24 h-24" />
    {name}
  </span>
));

ButtonDisplay.displayName = "ButtonDisplay";

const CurrencySelect = forwardRef<HTMLDivElement, CurrencySelectProps>(
  (props, ref) => {
    const { options, onChange, value: selected } = props;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    console.log(ref);
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

    const handleSelect = (option: CurrencyOption) => {
      onChange(option);
      setIsOpen(false);
    };

    return (
      <div
        className="relative w-128 shrink-0 shimmer-on-loading"
        ref={dropdownRef}
      >
        <button
          type="button"
          className="w-full flex items-center justify-between px-16 py-14 border-l border-neutral-gray-300 bg-white text-16"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selected ? (
            <ButtonDisplay {...selected} />
          ) : (
            <span className="text-neutral-gray-700">Выбрать</span>
          )}
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
        </button>

        {isOpen && (
          <div className="absolute left-0 top-[120%] mt-1 w-full z-50 bg-neutral-white border border-neutral-gray-200 rounded-6 max-h-200 overflow-hidden">
            <SimpleBar style={{ maxHeight: 200 }} className="custom-scrollbar">
              <div className="flex flex-col py-6 gap-0">
                {options.map((option) => (
                  <button
                    className="shrink-0 px-16 py-4 text-left w-full"
                    key={option.value}
                    onClick={() => handleSelect(option)}
                  >
                    <ButtonDisplay {...option} />
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

CurrencySelect.displayName = "CurrencySelect";

export default CurrencySelect;
