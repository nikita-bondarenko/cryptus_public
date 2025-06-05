import { valueMask } from '@/helpers/valueMask';
import React, { memo } from 'react';
import { CurrencyType } from '../request/RequestDetails';
import { Rate } from '@/redux/slices/exchangeInput/types';



export type SectionHeadingProps = {
    title: string;
    rate?: Rate | undefined;
    minValue?: number | undefined
}

const SectionHeading: React.FC<SectionHeadingProps> = memo(({title,rate, minValue}) => {
  return (
     <div className="flex items-center justify-between mb-[10px] pl-[6px]">
          <h2 className="text-[13px] font-medium leading-[107%] shimmer-on-loading">{title}</h2>
          {rate && (
            <span
              className="text-[11px] leading-[107%] text-[#B1B1B1] shimmer-on-loading"
              dangerouslySetInnerHTML={{
                __html: `${valueMask(rate?.from.value)} ${rate?.from.name} = <span class="text-black">${valueMask(rate?.to.value)}</span> ${rate?.to.name}`,
              }}
            ></span>
          )}
          {minValue && (
               <span
              className="text-[11px] leading-[107%] text-[#B1B1B1] shimmer-on-loading"
              dangerouslySetInnerHTML={{
                __html: `минимальная сумма обмена <span class="text-black">${valueMask(minValue)}</span>`,
              }}
            ></span>
          )}
        </div>
  );
});

SectionHeading.displayName = "SectionHeading"

export default SectionHeading;