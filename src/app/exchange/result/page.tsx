"use client";
import Icon from "@/components/helpers/Icon";
import Button from "@/components/ui/Button";
import { callSupport } from "@/helpers/callSupport";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const REQUEST_ID = "[#151473";

export default function ExchangeResultPage() {
  const [copied, setCopied] = useState(false);

  const router = useRouter();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(REQUEST_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoChat = () => {
    callSupport()
  };

  return (
    <div className="container h-full  ">
      <div className="w-full mx-auto flex flex-col h-full justify-between">
        <div className="bg-white rounded-6 border-1 border-[#E9E9E9] px-26 pt-32 pb-25 flex flex-col items-center mb-30">
          <Icon src="clock.svg" className="w-40 h-40 mb-18" />
          <div className="text-17 font-medium mb-8 text-center">
            Ваша заявка <br />
            принята в работу
          </div>
          <div className="text-16 text-[#BFBFBF] mb-18 text-center">
            Наш оператор свяжется <br />с вами в течение 15 минут
          </div>
          <div className="w-full h-1 bg-[#E8E8E8] mt-5 mb-13"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-16 text-[#BFBFBF]">номер заявки</div>
            <div className="flex items-center gap-7">
              <button
                onClick={handleCopy}
                className="p-1 flex items-center gap-7"
              >
                <Icon src={"copy.svg"} className="w-15 h-15 translate-y-1" />
                <span className="text-16 font-medium text-[#BFBFBF] select-all">
                  {REQUEST_ID}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow gap-32 justify-between">
          <div >
            <div
              className={clsx(
                "flex items-center justify-center gap-8 text-16  h-56 opacity-0 transition-opacity duration-500 bg-white rounded-6 border-1 border-[#E9E9E9]",
                { "opacity-100": copied }
              )}
            >
              <Icon src="sign.svg" className="w-12 h-12 translate-y-2" />
              номер заявки скопирован
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <Button onClick={handleGoChat} type="primary" className="w-full text-15 py-15">
              В чат с оператором
            </Button>
            <Button onClick={handleGoHome} type="secondary" className="w-full text-15 py-15">
              В главное меню
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
