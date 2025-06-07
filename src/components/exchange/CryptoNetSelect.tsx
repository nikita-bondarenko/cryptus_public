import clsx from "clsx";
import React, { memo } from "react";

export type CryptoNetOption = {
  name: string;
  value: string;
};

export type CryptoNetSelectProps = {
  options: CryptoNetOption[];
  value: CryptoNetOption;
  onChange: (value: CryptoNetOption) => void;
};

const CryptoNetSelect: React.FC<CryptoNetSelectProps> = memo(
  ({ options, value, onChange }) => {
    return (
      <div className="flex gap-x-8 gap-y-11 flex-wrap">
        {options.map((option, index) => (
          <button
            onClick={() => onChange(option)}
            key={index}
            className={clsx(
              "border shimmer-on-loading border-neutral-gray-200 rounded-full bg-white text-neutral-gray-400 text-13 leading-normal duration-500 px-20 py-9",
              {
                "[&]:border-primary-blue [&]:bg-primary-blue [&]:text-white pointer-events-none":
                  value?.value === option?.value,
              }
            )}
          >
            {option.name}
          </button>
        ))}
      </div>
    );
  }
);

CryptoNetSelect.displayName = "CryptoNetSelect";

export default CryptoNetSelect;
