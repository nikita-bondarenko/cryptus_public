"use client";

import DescriptionItem from "@/components/home/DescriptionItem";
import ProfileButton from "@/components/home/ProfileButton";
import RequestStatus from "@/components/home/RequestStatus";
import ExpandableList from "@/components/home/ExpandableList";
import Button from "@/components/ui/Button";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { resetExchangeInput } from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import { setUserId } from "@/redux/slices/userDataSlice";
import { POLICY_URL, TEST_USER_ID } from "@/config";
import { useActiveRequest } from "@/hooks/useActiveRequest";
import { useCallSupport } from "@/hooks/useCallSupport";
import { TERMS_URL } from "@/config";
import { setIsLoading } from "@/redux/slices/uiSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { activeRequests } = useActiveRequest();
  const { callSupport } = useCallSupport();

  const toProfilePage = useCallback(() => {
    router.push("/profile");
  }, [router]);

  const toExchangePage = useCallback(() => {

    router.push("/exchange/type");
  }, [router]);

  const toFaqPage = useCallback(() => {

    router.push("/faq");
  }, [router]);

  const openPolicy = useCallback(() => {
    window.open(POLICY_URL, "_blank");
  }, []);

  const openTerms = useCallback(() => {
    window.open(TERMS_URL, "_blank");
  }, []);

  const additionallySectionListItems = useRef([
    {
      text: "FAQ",
      onClick: toFaqPage,
    },
    {
      text: "Соглашение",
      onClick: openTerms,
    },
    {
      text: "Политика AML",
      onClick: openPolicy,
    },
    {
      text: "Профиль",
      onClick: toProfilePage,
    },
  ]);

  const descriptionItems = useRef([
    { icon: "rocket.svg", text: "Быстрый обмен" },
    { icon: "shield.svg", text: "Безопасность" },
  ]);

  return (
    <>
      <div className="container h-full flex flex-col">
        <div
          className="rounded-6 px-23 pt-35 pb-28 mb-17 flex-grow flex flex-col"
          style={{
            background: "linear-gradient(45deg, #C7ECFF 0%, #B8D1F6 100%)",
          }}
        >
          <div className="flex-grow flex flex-col justify-center">
          <div className="flex justify-between">
            <div className="max-w-205">
              <h1 className="font-bold text-32 mb-15 leading-normal">
                CRYPTUS EXCHANGE
              </h1>
              <p className="text-16 font-medium mb-30">
                Обменник, которым ты всегда хотел пользоваться, но нечего было
                менять
              </p>
            </div>
            <ProfileButton onClick={toProfilePage} />
          </div>

          <ul className="flex flex-col gap-11 mb-16">
            {descriptionItems.current.map((item, index) => (
              <DescriptionItem icon={item.icon} key={index}>
                {item.text}
              </DescriptionItem>
            ))}
          </ul>
          <div className="min-h-60 flex flex-col gap-11  mb-20">
            {activeRequests &&
              activeRequests.map((request) => (
                <RequestStatus
                  isInProcess={true}
                  id={request.id}
                  key={request.id}
                />
              ))}
          </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Button
              onClick={toExchangePage}
              className="home-btn"
              type={"primary"}
            >
              Начать обмен
            </Button>
            <Button
              onClick={callSupport}
              className="home-btn"
              type={"secondary"}
            >
              Поддержка
            </Button>
          </div>
        </div>
        <ExpandableList
          items={additionallySectionListItems.current}
          title="Дополнительно"
        />
      </div>
    </>
  );
}
