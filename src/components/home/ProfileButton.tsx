import { FC, memo } from "react";
import Icon from "../helpers/Icon";

const ProfileButton: FC<{ onClick?: () => void }> = memo(({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative w-46 h-46 bg-[#6CCEFF]  rounded-full flex justify-center items-center shrink-0"
    >
      <span className="absolute  inset-0 rounded-full animation-wave border border-[#6CCEFF]  wave1"></span>
      <span className="absolute inset-0 rounded-full animation-wave border border-[#6CCEFF] delay-0.5s]  wave2"></span>
      <span className="absolute inset-0 rounded-full animation-wave border border-[#6CCEFF] delay-1s] wave3"></span>
      <span className="absolute inset-0 rounded-full border border-[#D2F0FF] z-20"></span>
      <Icon src="person.svg" className="w-15 h-17"></Icon>
    </button>
  );
});

ProfileButton.displayName = "ProfileButton"

export default ProfileButton;
