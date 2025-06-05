"use client";
import RequestStoryItem, {
  RequestStoryItemProps,
} from "@/components/profile/RequestStoryItem";
import Button from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { useAppDispatch } from "@/redux/hooks";
import { setPageName } from "@/redux/slices/uiSlice";
import { formSchema } from "@/schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const story: RequestStoryItemProps[] = [
  {
    date: "26 мая 13:32",
    id: "#151473",
    currencyFrom: {
      value: "10 000",
      name: "RUB",
      icon: "rub.svg",
    },
    currencyTo: {
      value: "130 ",
      name: "Tether",
      icon: "usdt.svg",
    },
  },
  {
    date: "13 апреля 11:14",
    id: "#315423",
    currencyFrom: {
      value: "53 000",
      name: "RUB",
      icon: "rub.svg",
    },
    currencyTo: {
      value: "0,006612763",
      name: "BTC",
      icon: "btc.svg",
    },
  },
];

export default function Page() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageName("Данные профиля"));
  });

  const methods = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = methods.handleSubmit((data) => {
    alert("Form Data: \n" + JSON.stringify(data));
  });

  return (
    <div className="container mt-[10px]">
      <div className="mb-[35px]">
        <FormProvider  {...methods}>
          <form onSubmit={onSubmit}>
            <h2 className="heading">Контактная информация</h2>
            <div className="flex flex-col mb-[7px]">
              <InputField
                name="name"
                type="text"
                placeholder="ФИО"
              ></InputField>
              <InputField
                name="phone"
                type="phone"
                placeholder="Номер телефона"
              ></InputField>
              <InputField
                name="email"
                type="email"
                placeholder="Электронная почта"
              ></InputField>
            </div>
            <Button submit  type="primary">
              Сохранить
            </Button>
          </form>
        </FormProvider>
      </div>
      <div>
        <h2 className="heading">История обращений</h2>
        {story.map((request, index) => (
          <RequestStoryItem {...request} key={index}></RequestStoryItem>
        ))}
      </div>
    </div>
  );
}
