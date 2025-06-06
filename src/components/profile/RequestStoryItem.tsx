import React, { memo } from "react";
import StoryCryptoData, { StoryCryptoDataProps } from "./StoryCryptoData";
import Icon from "../helpers/Icon";
import { useRouter } from "next/navigation";

export type RequestStoryItemProps = {
  date: string;
  id: string;
  currencyFrom: StoryCryptoDataProps;
  currencyTo: StoryCryptoDataProps;
};

const RequestStoryItem: React.FC<RequestStoryItemProps> = memo(
  ({ date, id, currencyFrom, currencyTo }) => {
    const router = useRouter();

    const goToRequestDetails = () => {
      router.push("/profile/request");
    };
    return (
      <button onClick={goToRequestDetails} className="mb-[26px] w-full">
        <div className="flex justify-between items-center mb-[9px]">
          <span className="story-info">{date}</span>
          <span className="story-info">заявка {id}</span>
        </div>
        <div className="bg-white border-[1px] border-[#E9E9E9] rounded-[6.33px] px-[19px] py-[14px] grid grid-cols-2 relative">
          <StoryCryptoData {...currencyFrom} arrow></StoryCryptoData>
          <StoryCryptoData {...currencyTo}></StoryCryptoData>
          <Icon
            src={"arrow-right.svg"}
            className="w-[7px] h-[10px] absolute top-[50%] translate-y-[-50%] right-[26px]"
          ></Icon>
        </div>
      </button>
    );
  }
);

RequestStoryItem.displayName = "";

export default RequestStoryItem;
