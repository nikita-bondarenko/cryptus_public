import clsx from "clsx";
import React, { memo, ReactNode, useRef } from "react";

type ButtonProps = {
  className?: string;
  type: "primary" | "secondary";
  children: ReactNode;
  onClick?: () => void;
  submit?: boolean
};

const Button: React.FC<ButtonProps> = memo(
  ({ className, type, children, onClick, submit }) => {

    return (
      <button
        onClick={onClick}
        type={submit ? "submit" : 'button'}
        className={clsx(
          className,
          "flex items-center justify-center w-full text-white text-[16px] rounded-[6px] h-[47px]",
          {
            "bg-[#43C0FF]": type === "primary",
            "bg-[#262626]": type === "secondary",
          }
        )}
      >
        {children}
      </button>
    );
  }
);

export default Button;
