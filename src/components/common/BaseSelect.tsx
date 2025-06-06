import React, { memo, useState, useRef, useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import { getSelectStyles } from '@/styles/common';
import clsx from 'clsx';

export type SelectOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

export type BaseSelectProps = {
  value: SelectOption;
  onChange: (value: SelectOption) => void;
  options: SelectOption[];
  placeholder?: string;
  maxHeight?: number;
  className?: string;
};

const BaseSelect: React.FC<BaseSelectProps> = memo(({
  value,
  onChange,
  options,
  placeholder,
  maxHeight = 134,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className={clsx("relative", className)}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {value.icon}
          <span>{value.label}</span>
        </div>
        <div className={clsx("transition-transform", isOpen ? "rotate-180" : "")}>
          ▼
        </div>
      </div>

      {isOpen && (
        <div className={getSelectStyles(maxHeight)}>
          <SimpleBar style={{ maxHeight }} className="custom-scrollbar">
            <div className="flex flex-col py-[6px] gap-[0px]">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="px-[19px] py-[8px] hover:bg-[#F5F5F5] cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </SimpleBar>
        </div>
      )}
    </div>
  );
});

BaseSelect.displayName = 'BaseSelect';

export default BaseSelect; 