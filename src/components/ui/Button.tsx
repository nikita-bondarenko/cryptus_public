import clsx from "clsx";
import React, { memo, ReactNode } from "react";

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
          "flex items-center justify-center w-full text-white text-16 rounded-6 h-47",
          {
            "bg-primary-blue": type === "primary",
            "bg-neutral-gray-1400": type === "secondary",
          }
        )}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button"
export default Button;
