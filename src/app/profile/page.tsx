"use client";
import { useGetUserDetailQuery, useGetUserExchangesQuery, useUpdateProfileMutation } from "@/api/api";
import RequestStoryItem, {
  RequestStoryItemProps,
} from "@/components/profile/RequestStoryItem";
import Button from "@/components/ui/Button";
import { Notification } from "@/components/ui/Notification";
import { InputField } from "@/components/ui/ProfileInputField";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setPageName } from "@/redux/slices/uiSlice";
import { formSchema } from "@/schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";


export default function Page() {
  const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    dispatch(setPageName("Данные профиля"));
  }, [dispatch]);

  const methods = useForm({
    resolver: zodResolver(formSchema),
  });

  const userId = useAppSelector((state) => state.userData.userId);
  const [updateUser] = useUpdateProfileMutation();

  const onSubmit = methods.handleSubmit((data) => {
    if (!userId) return;
    
    updateUser({
      user_id: userId,
      full_name: data.name,
      phone: data.phone,
      email: data.email,
    }).then(() => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    });
  });

  const { data, isLoading, error } = useGetUserDetailQuery(userId || 0, {
    skip: !userId,
  });

  useEffect(() => {
    if (data) {
      methods.reset({
        name: data.full_name,
        phone: data.phone,
        email: data.email,
      });
    }
  }, [data, methods]);

const {data: exchanges} = useGetUserExchangesQuery({user_id: userId || 0, limit: 150}, {
  skip: !userId,
})

  return (
    <div className="container mt-10">
      <div className="mb-35">
        <FormProvider {...methods}>
          <form className="relative" onSubmit={onSubmit}>
            <h2 className="heading">Контактная информация</h2>
            <div className="flex flex-col mb-7">
              <InputField
                name="name"
                type="text"
                placeholder="ФИО"
              />
              <InputField
                name="phone"
                type="tel"
                placeholder="Номер телефона"
              />
              <InputField
                name="email"
                type="email"
                placeholder="Электронная почта"
              />
            </div>
            <Button submit type="primary">
              Сохранить
            </Button>
            <Notification 
              className="center w-[calc(100%-40px)]"
              isVisible={showSuccess}
              message="данные успешно сохранены"
            />
          </form>
        </FormProvider>
      </div>
      <div>
        <h2 className="heading">История обращений</h2>
        {exchanges?.map((exchange, index) => (
          <RequestStoryItem data={exchange} key={index} />
        ))}
      </div>
    </div>
  );
}
