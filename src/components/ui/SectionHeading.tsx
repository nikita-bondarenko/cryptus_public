import { valueMask } from '@/helpers/valueMask';
import React, { memo } from 'react';
import { Rate } from '@/redux/slices/exchangeInput/types';
import clsx from 'clsx';
import Icon from '../helpers/Icon';



export type SectionHeadingProps = {
    title: string;
    rate?: Rate | undefined;
    minValue?: number | undefined;
    error?: boolean
}

const SectionHeading: React.FC<SectionHeadingProps> = memo(({title,rate, minValue, error}) => {
  return (
     <div className="flex items-end justify-between mb-10 pl-6">
          <h2 className="text-16 font-medium leading-[107%] shimmer-on-loading">{title}</h2>
          {rate && (
            <span
              className="text-13 leading-[107%] text-[#B1B1B1] shimmer-on-loading"
              dangerouslySetInnerHTML={{
                __html: `${valueMask(rate?.from.value)} ${rate?.from.name} = <span class="text-black">${valueMask(rate?.to.value)}</span> ${rate?.to.name}`,
              }}
            ></span>
          )}
          {minValue && (
              <span className='relative block'>
                <Icon src='alert.svg' className={clsx('w-12 h-12 absolute top-1 left--17 opacity-0 transition-opacity duration-500', {"opacity-100": error})}></Icon>
                 <span
              className={clsx("block text-13 leading-[107%] text-[#B1B1B1] shimmer-on-loading ", {
                "[&]:text-[#FF6769] [&_span]:text-[#FF6769]": error
              })}
              dangerouslySetInnerHTML={{
                __html: `минимальная сумма обмена <span class="text-black">${valueMask(minValue)}</span>`,
              }}
            ></span>
              </span>
          )}
        </div>
  );
});

SectionHeading.displayName = "SectionHeading"

export default SectionHeading;