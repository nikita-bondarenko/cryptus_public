import clsx from "clsx";
import { memo } from "react";
import Icon from "../helpers/Icon";

const RequestStatus: React.FunctionComponent<{
  isInProcess: boolean;
  id: string;
}> = memo(({ isInProcess, id }) => {
  return (
    <div
      className={clsx("transition-all select-none mb-[20px] w-full", {
        " opacity-100 ": isInProcess,
      })}
    >
      <div className="px-[17px] pt-[14px] pb-[16px] rounded-[8px] flex items-center gap-[11px] w-full bg-white">
        <Icon src="clock.svg" className="w-[30px] h-[30px]"></Icon>
        <div>
          <p className="text-[13px] mb-[4px]">Заявка {id} в работе</p>
          <span className="text-[10px] text-[#BFBFBF] leading-[120%] block">
            Наш оператор скоро с вами свяжется
          </span>
        </div>
      </div>
    </div>
  );
});

RequestStatus.displayName = "RequestStatus"

export default RequestStatus