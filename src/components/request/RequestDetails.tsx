import React, { memo } from "react";
import Icon from "../helpers/Icon";
import clsx from "clsx";
import SectionHeading, { SectionHeadingProps } from "../ui/SectionHeading";

export type CurrencyType = "cash" | "card" | "crypto";
export type CurrencyPosition = "given" | "received";

export type CurrencyDetails = {
  icon: string;
  name: string;
  value: string;
  type: CurrencyType;
  typeLabel: string;
  position: CurrencyPosition;
  wayDetails?: {
    title: string;
    value: string;
  };
};

export type RequestDetailsProps = {
  currency: CurrencyDetails;
} & SectionHeadingProps;

const RequestDetails: React.FC<RequestDetailsProps> = memo(
  ({ title, rate, currency }) => {
    return (
      <div className="">
        <SectionHeading title={title} rate={rate}></SectionHeading>
        <div className="bg-white rounded-[6px] px-[20px] py-[24px] flex flex-col gap-[20px]">
          <div>
            <div className="mb-[11px] flex  items-center justify-between">
              <div className="flex  items-center gap-[6.33px]">
                <Icon
                  src={currency.icon}
                  className={clsx("w-[24px] h-[24px]", {
                 
                  })}
                ></Icon>
                <span className="text-[13px] leading-[107%]">
                  {currency.name}
                </span>
              </div>
              <span className="text-[13px] leading-[107%] text-[#BFBFBF]">
                {currency.typeLabel}
              </span>
            </div>
            <span className="text-[21px] leading-[107%]">{currency.value}</span>
          </div>
          {currency.wayDetails && (
            <div>
              <h3 className="text-[#BFBFBF] text-[13px] leading-[107%] mb-[10px]">
                {currency.wayDetails.title}
              </h3>
              <span
                className={clsx("break-all text-[16px] leading-[107%]", {
                  "max-w-[250px]": currency.type === "crypto",
                  "tracking-[5px]": currency.type === "card",
                })}
              >
                {currency.wayDetails.value}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

RequestDetails.displayName = "RequestDetails";

export default RequestDetails;
