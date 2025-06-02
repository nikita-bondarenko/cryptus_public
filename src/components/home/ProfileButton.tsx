import { FC, memo } from "react";
import Icon from "../helpers/Icon";

const ProfileButton: FC<{ onClick?: () => void }> = memo(({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative w-[46px] h-[46px] bg-[#6CCEFF]  rounded-full flex justify-center items-center"
    >
      <span className="absolute  inset-0 rounded-full animation-wave border-[1px] border-[#6CCEFF]  wave1"></span>
      <span className="absolute inset-0 rounded-full animation-wave border-[1px] border-[#6CCEFF] delay-[0.5s]  wave2"></span>
      <span className="absolute inset-0 rounded-full animation-wave border-[1px] border-[#6CCEFF] delay-[1s] wave3"></span>
      <span className="absolute inset-0 rounded-full border-[1px] border-[#D2F0FF] z-20"></span>
      <Icon src="person.svg" className="w-[15px] h-[17px]"></Icon>
    </button>
  );
});

export default ProfileButton;
