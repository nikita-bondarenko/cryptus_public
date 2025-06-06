"use client";
import Icon from "@/components/helpers/Icon";
import Button from "@/components/ui/Button";
import { callSupport } from "@/helpers/callSupport";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const REQUEST_ID = "#151473";

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
    <div className="container flex flex-col items-center justify-center  ">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-[6px] border-[1px] border-[#E9E9E9] px-[26px] pt-[32px] pb-[25px] flex flex-col items-center mb-[30px]">
          <Icon src="clock.svg" className="w-[40px] h-[40px] mb-[18px]" />
          <div className="text-[17px] font-medium mb-[8px] text-center">
            Ваша заявка <br />
            принята в работу
          </div>
          <div className="text-[16px] text-[#BFBFBF] mb-[18px] text-center">
            Наш оператор свяжется <br />с вами в течение 15 минут
          </div>
          <div className="w-full h-[1px] bg-[#E8E8E8] mt-[5px] mb-[13px]"></div>
          <div className="flex flex-col items-center gap-[2px]">
            <div className="text-[16px] text-[#BFBFBF]">номер заявки</div>
            <div className="flex items-center gap-[7px]">
              <button
                onClick={handleCopy}
                className="p-1 flex items-center gap-[7px]"
              >
                <Icon src={"copy.svg"} className="w-[15px] h-[15px] translate-y-[1px]" />
                <span className="text-[16px] font-medium text-[#BFBFBF] select-all">
                  {REQUEST_ID}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[32px]">
          <div>
            <div
              className={clsx(
                "flex items-center justify-center gap-[8px] text-[16px]  h-[56px] opacity-0 transition-opacity duration-500 bg-white rounded-[6px] border-[1px] border-[#E9E9E9]",
                { "opacity-100": copied }
              )}
            >
              <Icon src="sign.svg" className="w-[12px] h-[12px] translate-y-[2px]" />
              номер заявки скопирован
            </div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <Button onClick={handleGoChat} type="primary" className="w-full text-[15px] py-[15px]">
              В чат с оператором
            </Button>
            <Button onClick={handleGoHome} type="secondary" className="w-full text-[15px] py-[15px]">
              В главное меню
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
