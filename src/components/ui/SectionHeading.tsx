import React, { memo } from 'react';

export type Rate = {
  from: {
    value: string;
    name: string;
  };
  to: {
    value: string;
    name: string;
  };
};

export type SectionHeadingProps = {
    title: string;
    rate?: Rate;
    minValue?: string
}

const SectionHeading: React.FC<SectionHeadingProps> = memo(({title,rate, minValue}) => {
  return (
     <div className="flex items-center justify-between mb-[10px] pl-[6px]">
          <h2 className="text-[13px] font-medium leading-[107%]">{title}</h2>
          {rate && (
            <span
              className="text-[11px] leading-[107%] text-[#B1B1B1]"
              dangerouslySetInnerHTML={{
                __html: `${rate?.from.value} ${rate?.from.name} = <span class="text-black">${rate?.to.value}</span> ${rate?.to.name}`,
              }}
            ></span>
          )}
          {minValue && (
               <span
              className="text-[11px] leading-[107%] text-[#B1B1B1]"
              dangerouslySetInnerHTML={{
                __html: `минимальная сумма обмена <span class="text-black">${minValue}</span>`,
              }}
            ></span>
          )}
        </div>
  );
});

SectionHeading.displayName = "SectionHeading"

export default SectionHeading;