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
      <button onClick={goToRequestDetails} className="mb-26 w-full">
        <div className="flex justify-between items-center mb-9">
          <span className="story-info">{date}</span>
          <span className="story-info">заявка {id}</span>
        </div>
        <div className="bg-white border border-[#E9E9E9] rounded-6.33 px-19 py-14 grid grid-cols-2 relative">
          <StoryCryptoData {...currencyFrom} arrow></StoryCryptoData>
          <StoryCryptoData {...currencyTo}></StoryCryptoData>
          <Icon
            src="arrow-right.svg"
            className="w-7 h-10 absolute top-50%] translate-y--50%] right-26"
          ></Icon>
        </div>
      </button>
    );
  }
);

RequestStoryItem.displayName = "";

export default RequestStoryItem;
