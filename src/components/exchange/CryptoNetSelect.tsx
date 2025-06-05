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
      <div className="flex gap-x-[8.33px] gap-y-[11.33px] flex-wrap">
        {options.map((option, index) => (
          <button
            onClick={() => onChange(option)}
            key={index}
            className={clsx(
              "border-[1px] shimmer-on-loading border-[#dedede] rounded-full bg-white text-[#B5B5B5] text-[13px] leading-[107%]  duration-500 px-[20px] py-[9px]",
              {
                "[&]:border-[#43C0FF] [&]:bg-[#43C0FF] [&]:text-white pointer-events-none":
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
