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
  error?: string | null;
};

const CitySelect: React.FC<CitySelectProps> = memo(
  ({ options, onChange, value, placeholder, placeholderFocused, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [searchValue, setSearchValue] = useState(value);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
        className="relative w-full shrink-0 [&_button]:text-16 shimmer-on-loading pb-16 -mb-16"
        ref={dropdownRef}
      >
        {!!error && (
          <p className="absolute left-0 text-primary-red text-12 bottom-0">
            {error}
          </p>
        )}
        <div
          className={clsx(
            "relative w-full flex items-center justify-between px-16 py-15 rounded-6 border border-neutral-gray-300 bg-neutral-white text-13 transition-all duration-500",
            { "[&]:border-primary-red": !!error }
          )}
        >
          {showCustomPlaceholder && (
            <div
              className={clsx(
                "absolute left-16 pointer-events-none text-16 transition-colors",
                focused ? "text-neutral-gray-400" : "text-neutral-black"
              )}
            >
              {focused ? placeholderFocused : placeholder}
            </div>
          )}

          <input
            ref={inputRef}
            type="text"
            className="w-full outline-none bg-transparent text-16 text-neutral-black placeholder:opacity-0"
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
        </div>

        {isOpen && (
          <div className="absolute left-0 top59 mt-1 w-full z-50 bg-neutral-white border border-neutral-gray-200 rounded-6 max-h-134 overflow-hidden">
            <SimpleBar style={{ maxHeight: 134 }} className="custom-scrollbar">
              <div className="flex flex-col py-6 gap-0">
                {filteredOptions.length === 0 ? (
                  <div className="px-18 py-9 text-13 text-neutral-gray-700">
                    ничего не нашлось
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <button
                      className="shrink-0 px-18 py-9 text-left w-full not-last:border-b not-last:border-neutral-gray-500"
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
