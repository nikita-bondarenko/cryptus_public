// components/InputField.tsx
import { useFormContext } from "react-hook-form";
import React from "react";
import clsx from "clsx";
import { InputWrapper } from "./InputWrapper";

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
    <InputWrapper error={errors[name]?.message as string}>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="w-full bg-white text-16 leading-normal rounded-6 px-18 py-14 placeholder:text-neutral-gray-1300 border border-neutral-gray-300"
      />
    </InputWrapper>
  );
};
