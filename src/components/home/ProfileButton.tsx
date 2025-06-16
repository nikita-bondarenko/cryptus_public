import { FC, memo } from "react";
import Icon from "../helpers/Icon";

const ProfileButton: FC<{ onClick?: () => void, avatar?: string }> = memo(({ onClick, avatar }) => {
  return (
    <button
      onClick={onClick}
      className="relative w-46 h-46 bg-neutral-blue-cyan  rounded-full flex justify-center items-center shrink-0"
    >
      <span className="absolute  inset-0 rounded-full animation-wave border border-neutral-blue-cyan  wave1"></span>
      <span className="absolute inset-0 rounded-full animation-wave border border-neutral-blue-cyan   wave2"></span>
      <span className="absolute inset-0 rounded-full animation-wave border border-neutral-blue-cyan  wave3"></span>
      <span className="absolute inset-0 rounded-full border border-neutral-blue-ice z-20"></span>
      {!avatar && <Icon src="person.svg" className="w-15 h-17"></Icon>}
      {avatar && (
        <img
          src={avatar}
          alt="user avatar"
          className="w-full h-full object-cover rounded-full"
        />
      )}
    </button>
  );
});

ProfileButton.displayName = "ProfileButton";

export default ProfileButton;
