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
      <div className=" flex items-center justify-between mb-7">
        <div className="flex items-center gap-5 shrink-0">
          <Icon
            src={icon}
            className={clsx("w-13 h-13 shrink-0", {
        
            })}
          ></Icon>
          <span className="text-13 leading-[107.5%] block translate-y-1">{name}</span>
        </div>
        {arrow && (
          <Icon
            src="long-arrow.svg"
            className="w-57 h-8 mr-21 shrink-0"
          ></Icon>
        )}
      </div>
      <span className="text-16 leading-[107%] break-all mr-20 text-left">{value}</span>
    </div>
  );
};

export default StoryCryptoData;
