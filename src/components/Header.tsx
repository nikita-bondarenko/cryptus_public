"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./helpers/Icon";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import clsx from "clsx";
import { callSupport } from "@/helpers/callSupport";
import useClickOutside from "@/hooks/useClickOutside";

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
  const handleMenuToggle = () => {
   setMenuOpen((v) => !v)
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useClickOutside<HTMLDivElement, HTMLButtonElement>(menuRef, menuButtonRef, () => setMenuOpen(false));

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
        "container pt-33 pb-23 flex items-end justify-between transition-all duration-500 relative",
        {
          "[&]:h-30 [&]:opacity-0 [&]:pointer-events-none [&]:pt-10":
            isHome,
        }
      )}
    >
      {/* Back button */}
      <button
        ref={backButton}
        onClick={onBackButtonClick}
        className="flex gap-2 items-center"
      >
        <Icon src="header-arrow.svg" className="w-13 h-13" />
      </button>
      {isProfile && <span className="header__text translate-y-5">{pageName}</span>}
      {/* Stepper */}
      {isExchange && (
        <div className="flex  items-center gap-5 [&_*]:transition-all [&_*]:duration-500 ">
          <div
            className={clsx(
              "w-20 h-20  rounded-full relative shrink-0",
              {
                "bg-neutral-blue-100": true,
              }
            )}
          >
            <Icon
              src="white-sign.svg"
              className="w-10 h-10  top-6 center-x "
            ></Icon>
          </div>
          <div className="w-52 h-2 bg-neutral-gray-300 rounded-full relative">
            <div
              className={clsx(
                "h-2 bg-neutral-blue-100 rounded-full absolute top-0 left-0",
                {
                  "w-0": currentStep === 0,
                  "w-26": currentStep === 1,
                  "w-52": currentStep === 2 || currentStep === 3,
                  "delay-1000": isBackward
                }
              )}
            ></div>
          </div>
          <div
            className={clsx(
              "w-20 h-20 border-2 border-neutral-blue-100  rounded-full flex items-center justify-center relative shrink-0",
              {
                "bg-neutral-blue-100": currentStep === 2 || currentStep === 3,
                "delay-500": true,
              }
            )}
          >
            <Icon
              src="white-sign.svg"
              className={clsx(
                "w-10 h-10 opacity-0 top-5 center-x",
                {
                  "[&]:opacity-100": currentStep === 2 || currentStep === 3,
                  "delay-500":true,
                }
              )}
            ></Icon>
          </div>
          <div className="w-52 h-2 bg-neutral-gray-300 rounded-full relative">
            <div
              className={clsx(
                "h-2 bg-neutral-blue-100 rounded-full absolute top-0 left-0",
                {
                  "w-0": currentStep === 0 || currentStep === 1,
                  "w-26": currentStep === 2,
                  "w-52": currentStep === 3,
                  "delay-1000": !isBackward &&  currentStep !== 3,
                  
                }
              )}
            ></div>
          </div>
          <div
            className={clsx(
              "w-20 h-20 border-2 border-neutral-blue-100  rounded-full flex items-center justify-center relative shrink-0 delay-500",
              {
                "bg-neutral-blue-100 ": currentStep === 3,
              }
            )}
          >
            <Icon
              src="white-sign.svg"
              className={clsx(
                "w-10 h-10 opacity-0 top-5 center-x delay-500",
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
          ref={menuButtonRef}
          className="flex items-center justify-center"
        >
          <Icon
            src="menu.svg"  
            className={clsx("w-14 h-14 transition-all duration-500 ", {
              "opacity-0": menuOpen,
              "opacity-100": !menuOpen,
            })}
          />
          <Icon
            src="close.svg"
            className={clsx(
              "w-10 h-10 transition-all duration-500 center",
              {
                "opacity-100": menuOpen,
                "opacity-0": !menuOpen,
              }
            )}
          />
        </button>
        {menuOpen && (
          <div ref={menuRef} className="absolute right-0 top-[120%] z-50 min-w-180 bg-white rounded-10 shadow-lg border border-neutral-gray-200  flex flex-col animate-fade-in rounded-6">
            <button
              className="flex items-center gap-8 px-11 py-13  rounded-6"
              onClick={handleMakeQuestion}
            >
              <Icon src="support.svg" className="w-13 h-13" />
              <span className="text-13 leading-normal">Задать вопрос</span>
            </button>
            <div className="border-b border-neutral-gray-200"></div>
            <button
              className="flex items-center gap-6 px-11 py-13  rounded"
              onClick={() => window.location.reload()}
            >
              <Icon src="reload.svg" className="w-15 h-15" />
              <span className="text-13 leading-normal">
                Обновить страницу
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
