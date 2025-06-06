"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./helpers/Icon";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import clsx from "clsx";
import { callSupport } from "@/helpers/callSupport";

const EXCHANGE_STEPS = [
  { path: "/exchange/type", label: "Тип" },
  { path: "/exchange/input", label: "Ввод" },
  { path: "/exchange/details", label: "Детали" },
  { path: "/exchange/result", label: "Результат" },
];

export default function Header() {
  const webApp = useTelegramWebApp();
  const pathname = usePathname();
  const pageName = useAppSelector((state) => state.ui.pageName);
  const isHome = useMemo(() => pathname === "/", [pathname]);
  const isExchangeResult = useMemo(
    () => pathname === "/exchange/result",
    [pathname]
  );
  const isProfile = useMemo(() => pathname.includes("profile"), [pathname]);
  const isExchange = useMemo(
    () => pathname.startsWith("/exchange"),
    [pathname]
  );
  const router = useRouter();

  const backButton = useRef<HTMLButtonElement>(null);
  const [isBackward,setIsBackward] = useState(false)

  useEffect(() => {
    setTimeout(() => {setIsBackward(false)}, 200)
  }, [pathname])

  const onBackButtonClick = () => {
    if (isHome) {
      webApp?.close();
    } else if (isExchangeResult) {
      router.push("/");
    } else {
      setIsBackward(true)
      router.back();
    }
  };

  // --- Dropdown menu logic ---
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => setMenuOpen((v) => !v);

  // --- Stepper logic ---
  const currentStep = useMemo(() => {
    const idx = EXCHANGE_STEPS.findIndex((step) =>
      pathname.startsWith(step.path)
    );
    return idx === -1 ? null : idx;
  }, [pathname]);

  const handleMakeQuestion = () => {
    callSupport();
  };

  return (
    <div
      className={clsx(
        "container pt-[33px] pb-[23px] flex items-end justify-between transition-all duration-500 relative",
        {
          "[&]:h-[30px] [&]:opacity-0 [&]:pointer-events-none [&]:pt-[10px]":
            isHome,
        }
      )}
    >
      {/* Back button */}
      <button
        ref={backButton}
        onClick={onBackButtonClick}
        className="flex gap-[2px] items-center"
      >
        <Icon src="header-arrow.svg" className="w-[13px] h-[13px]" />
      </button>
      {isProfile && <span className="header__text">{pageName}</span>}
      {/* Stepper */}
      {isExchange && (
        <div className="flex  items-center gap-[5px] [&_*]:transition-all [&_*]:duration-500 ">
          <div
            className={clsx(
              "w-[20px] h-[20px]  rounded-full relative shrink-0",
              {
                "bg-[#4FC3FF]": true,
              }
            )}
          >
            <Icon
              src="white-sign.svg"
              className="w-[10px] h-[10px] absolute top-[6px] left-[50%] translate-x-[-50%] "
            ></Icon>
          </div>
          <div className="w-[52px] h-[2px] bg-[#DBDBDB] rounded-full relative">
            <div
              className={clsx(
                "h-[2px] bg-[#4FC3FF] rounded-full absolute top-0 left-0",
                {
                  "w-[0px]": currentStep === 0,
                  "w-[26px]": currentStep === 1,
                  "w-[52px]": currentStep === 2 || currentStep === 3,
                  "delay-1000": isBackward
                }
              )}
            ></div>
          </div>
          <div
            className={clsx(
              "w-[20px] h-[20px] border-[2px] border-[#4FC3FF]  rounded-full flex items-center justify-center relative shrink-0",
              {
                "bg-[#4FC3FF]": currentStep === 2 || currentStep === 3,
                "delay-500": true,
              }
            )}
          >
            <Icon
              src="white-sign.svg"
              className={clsx(
                "w-[10px] h-[10px] opacity-0 absolute top-[5px] left-[50%] translate-x-[-50%] ",
                {
                  "[&]:opacity-100": currentStep === 2 || currentStep === 3,
                  "delay-500":true,
                }
              )}
            ></Icon>
          </div>
          <div className="w-[52px] h-[2px] bg-[#DBDBDB] rounded-full relative">
            <div
              className={clsx(
                "h-[2px] bg-[#4FC3FF] rounded-full absolute top-0 left-0",
                {
                  "w-[0px]": currentStep === 0 || currentStep === 1,
                  "w-[26px]": currentStep === 2,
                  "w-[52px]": currentStep === 3,
                  "delay-1000": !isBackward && currentStep !== 2,
                  
                }
              )}
            ></div>
          </div>
          <div
            className={clsx(
              "w-[20px] h-[20px] border-[2px] border-[#4FC3FF]  rounded-full flex items-center justify-center relative shrink-0 delay-500",
              {
                "bg-[#4FC3FF] ": currentStep === 3,
              }
            )}
          >
            <Icon
              src="white-sign.svg"
              className={clsx(
                "w-[10px] h-[10px] opacity-0 absolute top-[5px] left-[50%] translate-x-[-50%] delay-500",
                { "[&]:opacity-100": currentStep === 3 }
              )}
            ></Icon>
          </div>
        </div>
      )}

      {/* Right side: menu */}
      <div className="flex justify-end relative">
        <button
          onClick={handleMenuToggle}
          className="flex items-center justify-center"
        >
          <Icon
            src="menu.svg"
            className={clsx("w-[12px] h-[12px] transition-all duration-500 ", {
              "opacity-0": menuOpen,
              "opacity-100": !menuOpen,
            })}
          />
          <Icon
            src="close.svg"
            className={clsx(
              "w-[10px] h-[10px] transition-all duration-500 absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%]",
              {
                "opacity-100": menuOpen,
                "opacity-0": !menuOpen,
              }
            )}
          />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-[120%] z-50 min-w-[180px] bg-white rounded-[10px] shadow-lg border border-[#E9E9E9]  flex flex-col animate-fade-in">
            <button
              className="flex items-center gap-[8px] px-[11px] py-[13px]  rounded"
              onClick={handleMakeQuestion}
            >
              <Icon src="support.svg" className="w-[13px] h-[13px]" />
              <span className="text-[13px] leading-[107%]">Задать вопрос</span>
            </button>
            <div className="border-b border-[#E9E9E9]"></div>
            <button
              className="flex items-center gap-[6px] px-[11px] py-[13px]  rounded"
              onClick={() => window.location.reload()}
            >
              <Icon src="reload.svg" className="w-[15px] h-[15px]" />
              <span className="text-[13px] leading-[107%]">
                Обновить страницу
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
