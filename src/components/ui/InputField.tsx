// components/InputField.tsx
import { useFormContext } from "react-hook-form";
import React from "react";
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
    <div className=" w-full pb-16 relative">
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={clsx(
          "w-full bg-white text-16 leading-[107%] rounded-6 px-18 py-14 placeholder:text-[#CBCBCB] border border-[#DEDEDE]",
          {
            "[&]:border-[#FF676A] pr-30": errors[name],
          }
        )}
      />
      {errors[name] && (
        <>
          <p className="absolute left-0 text-[#FF676A] text-13 bottom--1">
            {(errors[name]?.message as string) || "Ошибка"}
          </p>
          <Icon
            src="alert.svg"
            className="w-16 h-16 absolute right-12 top-14"
          ></Icon>
        </>
      )}
    </div>
  );
};
