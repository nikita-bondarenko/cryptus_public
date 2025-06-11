import React, { memo } from "react";
import StoryCryptoData, { StoryCryptoDataProps } from "./StoryCryptoData";
import Icon from "../helpers/Icon";
import { useRouter } from "next/navigation";
import { UserExchange } from "@/api/types";
import { valueMask } from "@/helpers/valueMask";
import { findIcon } from "@/helpers/findIcon";
import { formatDate } from "@/helpers/formatDate";
import { roundTo8 } from "@/redux/helpers";
import { setRequestDetails } from "@/redux/slices/requestDetailsSlice";
import { useAppDispatch } from "@/redux/hooks";
import { calculateCurrencyTypeFromDirection, Direction } from "@/helpers/calculateCurrencyTypeFromDirection";

export type RequestStoryItemProps = {
  data: UserExchange;
};

const RequestStoryItem: React.FC<RequestStoryItemProps> = memo(({ data }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const goToRequestDetails = () => {

    dispatch(setRequestDetails(data));
    router.push("/profile/request");
  };
  return (
    <button onClick={goToRequestDetails} className="mb-26 w-full">
      <div className="flex justify-between items-center mb-9">
        <span className="story-info">{formatDate(data.created_at)}</span>
        <span className="story-info">заявка {data.id}</span>
      </div>
      <div className="bg-white border border-neutral-gray-200 rounded-6 px-19 py-14 grid grid-cols-2 relative">
        <StoryCryptoData
          name={data.currency_give_name || data.currency_give}
          value={valueMask(roundTo8(data.amount_give))}
          arrow
          icon={findIcon(calculateCurrencyTypeFromDirection(data.direction as Direction, "given"),data.currency_give_name)}
        ></StoryCryptoData>
        <StoryCryptoData
          name={data.currency_get_name || data.currency_get}
          value={valueMask(roundTo8(data.amount_get))}
          icon={findIcon(calculateCurrencyTypeFromDirection(data.direction as Direction, "received"),data.currency_get_name)}
        ></StoryCryptoData>
        <Icon
          src="arrow-right.svg"
          className="w-7 h-10 center-y right-26"
        ></Icon>
      </div>
    </button>
  );
});

RequestStoryItem.displayName = "RequestStoryItem";

export default RequestStoryItem;
