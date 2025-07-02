"use client";
import Icon from "@/components/helpers/Icon";
import Button from "@/components/ui/Button";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Notification } from "@/components/ui/Notification";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsLoading } from "@/redux/slices/uiSlice";
import {
  clearAll,
  setSelectedCurrencyBuyType,
  setSelectedCurrencySellType,
} from "@/redux/slices/exchangeSlice/exchangeSlice";
import { useCallSupport } from "@/hooks/useCallSupport";
import { setUserId } from "@/redux/slices/userSlice/userSlice";

export default function ExchangeResultPage() {
  const [copied, setCopied] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const exchangeId = useAppSelector((state) => state.ui.exchangeId);
  const userId = useAppSelector((state) => state.user.id);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(exchangeId?.toString() || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoChat = () => {
  window.Telegram.WebApp.close();
  };

  const updateUserData = () => {
    if (userId) dispatch(setUserId(userId));
  };

  useEffect(() => {
    dispatch(clearAll());
    dispatch(setSelectedCurrencySellType("COIN"));
    dispatch(setSelectedCurrencyBuyType("BANK"));

    return () => {
      updateUserData();
    };
  }, []);

  return (
    <div className="container h-full  ">
      <div className="w-full mx-auto flex flex-col h-full justify-between">
        <div className="bg-white rounded-6 border-1 border-neutral-gray-200 px-26 pt-32 pb-25 flex flex-col items-center mb-30">
          <Icon src="clock.svg" className="w-40 h-40 mb-18" />
          <div className="text-17 font-medium mb-8 text-center">
            Ваша заявка <br />
            принята в работу
          </div>
          <div className="text-16 text-neutral-gray-1000 mb-18 text-center">
          Наш оператор свяжется <br />с вами в течение 15 минут <br /> <br />
            Курс обмена может меняться в&nbsp;зависимости от&nbsp;волатильности
            рынка. Итоговый курс сделки озвучит оператор.
            
          </div>
          <div className="w-full h-1 bg-neutral-gray-1200 mt-5 mb-13"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-16 text-neutral-gray-1000">номер заявки</div>
            <div className="flex items-center gap-7">
              <button
                onClick={handleCopy}
                className="p-1 flex items-center gap-7"
              >
                <Icon src={"copy.svg"} className="w-15 h-15 translate-y-1" />
                <span className="text-16 font-medium text-neutral-gray-1000 select-all">
                  {exchangeId?.toString() || ""}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow gap-32 justify-between">
          <Notification
            isVisible={copied}
            message="номер заявки скопирован"
            iconSrc="sign.svg"
          />
          <div className="flex flex-col gap-12">
            <Button
              onClick={handleGoChat}
              type="primary"
              className="w-full text-15 py-15"
            >
              В чат с оператором
            </Button>
            <Button
              onClick={handleGoHome}
              type="secondary"
              className="w-full text-15 py-15"
            >
              В главное меню
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
