import React, { memo } from "react";
import { CurrencyPosition, CurrencyType } from "../request/RequestDetails";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectGiveType, selectReceiveType } from "@/redux/slices/exchangeTypeSlice";
import clsx from "clsx";
import Icon from "../helpers/Icon";

export type ExchangeTypeItemProps = {
  icon: string;
  name: string;
  type: CurrencyType;
  position?: CurrencyPosition;
};

const ExchangeTypeItem: React.FC<ExchangeTypeItemProps> = memo(
  ({ icon, name, type, position }) => {
    const dispatch = useAppDispatch();

    const isSelected = useAppSelector((state) => {
      if (position === "received")
        return state.exchangeType.selectedReceieveType === type;
      else return state.exchangeType.selectedGiveType === type;
    });
    const onClick = () => {
      if (position === "received") dispatch(selectReceiveType(type));
      else dispatch(selectGiveType(type));
    };
    return (
      <button
        className={clsx(
          "h-46 flex items-center justify-between w-[101%] duration-500 transition-all bg-white px-18 relative",
          {
            "[&]:bg-[#F5F8F9]  pointer-events-none z-20": isSelected,
          }
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-11">
          <Icon src={icon} className={clsx("w-19 h-19", {
            "w-21 h-21": icon === 'cash.svg',
          })}></Icon>
          <span className="text-16 leading-[107%]">{name}</span>
        </div>
        <Icon
          src="sign.svg"
          className={clsx(
            "w-16 h-16 opacity-0 duration-500 transition-opacity",
            { "[&]:opacity-100": isSelected }
          )}
        ></Icon>
      </button>
    );
  }
);

ExchangeTypeItem.displayName = "ExchangeTypeItem";

export default ExchangeTypeItem;
