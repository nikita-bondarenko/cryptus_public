import React from "react";
import Icon from "../helpers/Icon";
import clsx from "clsx";

export type StoryCryptoDataProps = {
  icon: string;
  name: string;
  value: string;
  arrow?: boolean;
};

const StoryCryptoData: React.FC<StoryCryptoDataProps> = ({
  icon,
  name,
  value,
  arrow,
}) => {
  return (
    <div className="flex flex-col">
      <div className=" flex items-center justify-between mb-[7px]">
        <div className="flex items-center gap-[5px] shrink-0">
          <Icon
            src={icon}
            className={clsx("w-[13px] h-[13px] shrink-0", {
        
            })}
          ></Icon>
          <span className="text-[13px] leading-[107.5%] block translate-y-[1px]">{name}</span>
        </div>
        {arrow && (
          <Icon
            src="long-arrow.svg"
            className="w-[57px] h-[13px] mr-[21px] shrink-0"
          ></Icon>
        )}
      </div>
      <span className="text-[16px] leading-[107%] break-all mr-[20px] text-left">{value}</span>
    </div>
  );
};

export default StoryCryptoData;
