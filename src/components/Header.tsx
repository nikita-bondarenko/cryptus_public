"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./helpers/Icon";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";

export default function Header() {
  const webApp = useTelegramWebApp();
  const pathname = usePathname();
  const pageName = useAppSelector((state) => state.ui.pageName);
  const isHome = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  const router = useRouter();

  const backButton = useRef<HTMLButtonElement>(null);
  const [rightSideWidth, setRightSideWidth] = useState(48);
  useEffect(() => {
    webApp?.ready();
    if (backButton.current) setRightSideWidth(backButton.current.clientWidth);
  }, [webApp]);

  const onBackButtonClick = () => {
    if (isHome) {
      webApp?.close();
    } else {
      router.back();
    }
  };


  return (
    <div className="container pt-[33px] pb-[23px] flex items-end justify-between">
      <button
        ref={backButton}
        onClick={onBackButtonClick}
        className=" flex gap-[2px] items-center"
      >
        <Icon src="arrow-left.svg" className="w-[10px] h-[10px]"></Icon>
        <span className="header__text">Назад</span>
      </button>
      <span className="header__text">{pageName}</span>
      <div className="flex justify-end" style={{ width: rightSideWidth }}>
        <button className="header__text">...</button>
      </div>
    </div>
  );
}
