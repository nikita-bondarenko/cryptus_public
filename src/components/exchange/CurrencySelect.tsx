import React, { memo, useEffect, useRef, useState } from "react";
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
  <span className="flex items-center gap-[6px] overflow-hidden text-ellipsis whitespace-nowrap">
    <Icon src={icon} className="w-[24px] h-[24px]" />
    {name}
  </span>
));

const CurrencySelect: React.FC<CurrencySelectProps> = memo(
  ({ options, onChange, value: selected }) => {
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

    const handleSelect = (option: CurrencyOption) => {
      onChange(option);
      setIsOpen(false);
    };
    // console.log("select");

    return (
      <div className="relative w-[128px] shrink-0 shimmer-on-loading" ref={dropdownRef}>
        <button
          type="button"
          className="w-full flex items-center justify-between px-[16px] py-[14px] border-l-[1px] border-[#DEDEDE] bg-white text-[13px]"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selected ? (
            <ButtonDisplay {...selected} />
          ) : (
            <span className="text-[#999]">Выбрать</span>
          )}
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
          <div className="absolute left-0 top-[120%] mt-1 w-full z-50 bg-white border border-[#DEDEDE] rounded-[6px] max-h-[200px] overflow-hidden">
            <SimpleBar style={{ maxHeight: 200 }} className="custom-scrollbar">
              <div className="flex flex-col py-[6px] gap-[0px]">
                {options.map((option) => (
                  <button
                    className="shrink-0 px-[16px] py-[4px] text-left w-full"
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
