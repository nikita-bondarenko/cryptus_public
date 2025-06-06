import React, { memo } from 'react';
import BaseSelect, { SelectOption } from '../common/BaseSelect';

export type CurrencyOption = SelectOption & {
  code: string;
  rate?: number;
};

type CurrencySelectProps = {
  value: CurrencyOption;
  onChange: (value: CurrencyOption) => void;
  options: CurrencyOption[];
};

const CurrencySelect: React.FC<CurrencySelectProps> = memo(({
  value,
  onChange,
  options,
}) => {
  const handleChange = (option: SelectOption) => {
    // Since we know all options are CurrencyOptions, we can safely cast
    onChange(option as CurrencyOption);
  };

  return (
    <BaseSelect
      value={value}
      onChange={handleChange}
      options={options}
      maxHeight={200}
    />
  );
});

CurrencySelect.displayName = 'CurrencySelect';

export default CurrencySelect;
