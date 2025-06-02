import { memo, ReactNode, useRef } from "react";
import Icon from "../helpers/Icon";

const DescriptionItem: React.FunctionComponent<{
  icon: string;
  children: ReactNode;
}> = memo(({ icon, children }) => {

  return (
    <li className="rounded-full h-[34px] w-fit flex items-center justify-center px-[17px] gap-[7px] bg-[#E4F5FF] ">
      <Icon src={icon} className="w-[20px] h-[20px]"></Icon>
      <span className="font-medium text-[13px] text-[#759EB2]">{children}</span>
    </li>
  );
});

export default DescriptionItem