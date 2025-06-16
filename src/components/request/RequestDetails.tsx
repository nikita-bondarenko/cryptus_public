import React, { memo } from "react";
import Icon from "../helpers/Icon";
import clsx from "clsx";
import SectionHeading, { SectionHeadingProps } from "../ui/SectionHeading";
import { CurrencyType } from "@/redux/slices/exchangeSlice/exchangeSlice";


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
        <div className="bg-white rounded-6 px-20 py-24 flex flex-col gap-20">
          <div>
            <div className="mb-15 flex  items-center justify-between">
              <div className="flex  items-center gap-6">
                <Icon
                  src={currency.icon}
                  server
                  className={clsx("w-24 h-24", {
                 
                  })}
                ></Icon>
                <span className="text-16 leading-normal">
                  {currency.name}
                </span>
              </div>
              <span className="text-16 leading-normal text-neutral-gray-1000">
                {currency.typeLabel}
              </span>
            </div>
            <span className="text-21 leading-normal">{currency.value}</span>
          </div>
          {currency.wayDetails && (
            <div>
              <h3 className="text-neutral-gray-1000 text-13 leading-normal mb-10">
                {currency.wayDetails.title}
              </h3>
              <span
                className={clsx("break-all text-16 leading-normal", {
                  "max-w-250": currency.type === "COIN",
                  "tracking-[4px]": currency.type === "BANK",
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
