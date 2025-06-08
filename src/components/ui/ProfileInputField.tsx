// components/InputField.tsx
import { useFormContext } from "react-hook-form";
import React from "react";
import clsx from "clsx";
import { InputWrapper } from "./InputWrapper";

type Props = {
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
};

export const InputField: React.FC<Props> = ({
  name,
  type = "text",
  placeholder,
  value,
  disabled = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Если передан value и onChange, используем контролируемый input
  if (value !== undefined ) {
    return (
      <InputWrapper error={errors[name]?.message as string}>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          className={clsx(
            "w-full bg-white text-16 leading-normal rounded-6 px-18 py-14 placeholder:text-neutral-gray-1300 border border-neutral-gray-300",
            {
              "opacity-50 cursor-not-allowed": disabled,
            }
          )}
        />
      </InputWrapper>
    );
  }

  // Иначе используем неконтролируемый input с react-hook-form
  return (
    <InputWrapper error={errors[name]?.message as string}>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name)}
        className={clsx(
          "w-full bg-white text-16 leading-normal rounded-6 px-18 py-14 placeholder:text-neutral-gray-1300 border border-neutral-gray-300",
          {
            "opacity-50 cursor-not-allowed": disabled,
          }
        )}
      />
    </InputWrapper>
  );
};
