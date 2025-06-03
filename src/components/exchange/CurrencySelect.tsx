import React, { memo } from "react";

export type CurrencyOption = {
  value: string;
  icon: string;
  name: string;
};

export type CurrencySelectProps = {
  options: CurrencyOption[];
  value: CurrencyOption
};

const CurrencySelect: React.FC<CurrencySelectProps> = memo(({}) => {
  return <div className="">CurrencySelect component</div>;
});

CurrencySelect.displayName = "CurrencySelect";

export default CurrencySelect;
