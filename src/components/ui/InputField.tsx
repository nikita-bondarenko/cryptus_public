// components/InputField.tsx
import { useFormContext } from "react-hook-form";
import React, { useEffect, useMemo } from "react";
import clsx from "clsx";
import Icon from "../helpers/Icon";

type Props = {
  name: string;
  type?: string;
  placeholder?: string;
};

export const InputField: React.FC<Props> = ({
  name,
  type = "text",
  placeholder,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();




  return (
    <div className=" w-full pb-[15px] relative">
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={clsx(
          "w-full bg-white text-[13px] leading-[107%] rounded-[6.3px] px-[18px] py-[14px] placeholder:text-[#CBCBCB] border-[1px] border-[#DEDEDE]",
          {
            "[&]:border-[#FF676A] pr-[30px]": errors[name],
          }
        )}
      />
      {errors[name] && (
        <>
          <p className="absolute left-0 text-[#FF676A] text-[10px] bottom-0">
            {(errors[name]?.message as string) || "Ошибка"}
          </p>
          <Icon
            src="alert.svg"
            className="w-[16px] h-[16px] absolute right-[12px] top-[14px]"
          ></Icon>
        </>
      )}
    </div>
  );
};
