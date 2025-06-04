import clsx from "clsx";
import React, {
  memo,
  useEffect,
  useRef,
  useState,
  useMemo,
  ChangeEvent,
} from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export type CityOption = {
  name: string;
  value: string;
};

export type CitySelectProps = {
  options: CityOption[];
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
  placeholderFocused?: string;
};

const CitySelect: React.FC<CitySelectProps> = memo(
  ({ options, onChange, value, placeholder, placeholderFocused }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [searchValue, setSearchValue] = useState(value);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Закрытие при клике вне (работает в Safari)
    useEffect(() => {
      const handlePointerDown = (event: PointerEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setFocused(false);
        }
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () => {
        document.removeEventListener("pointerdown", handlePointerDown);
      };
    }, []);

    const filteredOptions = useMemo(() => {
      return options.filter((option) =>
        option.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [searchValue, options]);

    const handleSelect = (option: CityOption) => {
      setSearchValue(option.name);
      setIsOpen(false);
      onChange(option.value);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchValue(val);
      setIsOpen(true);
      onChange(val);
    };

    const handleFocus = () => {
      setFocused(true);
      setIsOpen(true);
    };

    const showCustomPlaceholder = !searchValue;

    return (
      <div
        className="relative w-full shrink-0 [&_button]:text-[13px]"
        ref={dropdownRef}
      >
        <div className="relative w-full flex items-center justify-between px-[16px] py-[15px] rounded-[6px] border-[1px] border-[#DEDEDE] bg-white text-[13px]">
          {showCustomPlaceholder && (
            <div
              className={clsx(
                "absolute left-[16px] pointer-events-none transition-colors",
                focused ? "text-[#CCCCCC]" : "text-black"
              )}
            >
              {focused ? placeholderFocused : placeholder}
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            className="w-full outline-none bg-transparent text-[13px] text-black placeholder:opacity-0"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
          />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            tabIndex={-1}
          >
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
        </div>

        {isOpen && (
          <div className="absolute left-0 top-[105%] mt-1 w-full z-50 bg-white border border-[#DEDEDE] rounded-[6px] max-h-[134px] overflow-hidden">
            <SimpleBar style={{ maxHeight: 134 }} className="custom-scrollbar">
              <div className="flex flex-col py-[6px] gap-[0px]">
                {filteredOptions.length === 0 ? (
                  <div className="px-[18px] py-[9px] text-[13px] text-[#999999]">
                    ничего не нашлось
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <button
                      className="shrink-0 px-[18px] py-[9px] text-left w-full not-last:border-b-[1px] not-last:border-[#C3C3C3]"
                      key={option.value}
                      onClick={() => handleSelect(option)}
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

CitySelect.displayName = "CitySelect";

export default CitySelect;
