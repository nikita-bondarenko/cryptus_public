"use client";
import React, { useEffect, useMemo } from "react";
import Icon from "./helpers/Icon";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useTelegramWebApp } from "@/app/hooks/useTelegramWebApp";

export default function Header() {
  const webApp = useTelegramWebApp();
  const pathname = usePathname();
  const pageName = useAppSelector((state) => state.ui.pageName);
  const isHome = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  const router = useRouter();
  useEffect(() => {
    webApp?.ready();
  });
  const onBackButtonClick = () => {
    if (isHome) {
      webApp?.close();
    } else {
      router.back();
    }
  };

  return (
    <div className="container pt-[33px] pb-[23px] flex items-end justify-between">
      <button onClick={onBackButtonClick} className=" flex gap-[2px] items-center">
        <Icon
          src="arrow-left.svg"
          className="w-[10px] h-[10px]"
        ></Icon>
        <span className="header__text">Назад</span>
      </button>
      <span className="header__text">{pageName}</span>
      <button className="header__text">...</button>
    </div>
  );
}
