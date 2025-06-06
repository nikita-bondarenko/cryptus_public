import React, { memo } from 'react';
import { getInputStyles } from '@/styles/common';

export type BaseInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: boolean;
  areErrorsVisible?: boolean;
  className?: string;
};

const BaseInput: React.FC<BaseInputProps> = memo(({
  value,
  onChange,
  placeholder,
  type = "text",
  error = false,
  areErrorsVisible = false,
  className,
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={getInputStyles(error, areErrorsVisible)}
    />
  );
});

BaseInput.displayName = 'BaseInput';

export default BaseInput; 