import React, { memo, useState } from "react";
import Icon from "../helpers/Icon";
import BaseSelect from "../ui/BaseSelect";

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

const CurrencySelect = memo(({ options, onChange, value: selected }: CurrencySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BaseSelect
      options={options}
      value={selected}
      onChange={onChange}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      className="[&]:w-128"
      dropdownTop="top-[120%]"
      maxHeight={200}
      renderTrigger={({ isOpen }) => (
        <button
          type="button"
          className="w-full flex items-center justify-between px-16 py-10 border-l border-neutral-gray-300 bg-white text-16"
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
      )}
      renderOption={({ option, onClick }) => (
        <button
          className="shrink-0 px-16 py-4 text-left w-full"
          key={option.value}
          onClick={onClick}
        >
          <ButtonDisplay {...option} />
        </button>
      )}
    />
  );
});

CurrencySelect.displayName = "CurrencySelect";

export default CurrencySelect;
