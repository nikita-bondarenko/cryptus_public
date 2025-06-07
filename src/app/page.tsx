"use client";

import DescriptionItem from "@/components/home/DescriptionItem";
import ProfileButton from "@/components/home/ProfileButton";
import RequestStatus from "@/components/home/RequestStatus";
import AdditionallySectionButton from "@/components/home/AdditionallySectionButton";
import Button from "@/components/ui/Button";
import clsx from "clsx";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setPageName } from "@/redux/slices/uiSlice";
import { callSupport } from "@/helpers/callSupport";
import { resetExchangeInput } from "@/redux/slices/exchangeInput/exchangeInputSlice";

export default function Home() {
  const [additionallySectionOpen, setAdditionallySectionOpen] = useState(false);
  const additionallySectionList = useRef<HTMLUListElement>(null);
  const [additionallySectionListHeight, setAdditionallySectionListHeight] =
    useState(0);

  const router = useRouter();
  const dispatch = useAppDispatch()

  const openAdditionallySectionList = () => {
    if (additionallySectionList.current)
      setAdditionallySectionListHeight(
        additionallySectionList.current?.clientHeight
      );
  };
  const closeAdditionallySectionList = () => {
    setAdditionallySectionListHeight(0);
  };
  useEffect(() => {
    if (additionallySectionOpen) {
      openAdditionallySectionList();
    } else {
      closeAdditionallySectionList();
    }
  }, [additionallySectionOpen]);

  const toProfilePage = useCallback(() => {
    router.push("/profile");
  }, [router]);

  const toExchangePage = useCallback(() => {
    router.push("/exchange/type");
  }, [router]);

   const toFaqPage = useCallback(() => {
    router.push("/faq");
  }, [router]);


  const additionallySectionListItems = useRef([
    {
      text: "FAQ",
      onClick: toFaqPage,
    },
    {
      text: "Соглашение",
      onClick: () => {},
    },
    {
      text: "Политика AML",
      onClick: () => {},
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

  useEffect(() => {
    dispatch(resetExchangeInput())
  }, [])


  return (
    <>
      <div className="container">
        <div
          className="rounded-6 px-23 pt-35 pb-28 mb-17"
          style={{
            background: "linear-gradient(45deg, #C7ECFF 0%, #B8D1F6 100%)",
          }}
        >
          <div className=" flex justify-between">
            <div className="max-w-205">
              <h1 className="font-bold text-32 mb-15 leading-normal">
                CRYPTUS EXCHANGE
              </h1>
              <p className="text-16 font-medium mb-30">
                Обменник, которым ты всегда хотел пользоваться, но нечего было
                менять
              </p>
            </div>
            <ProfileButton onClick={toProfilePage}></ProfileButton>
          </div>

          <ul className=" flex flex-col gap-11 mb-16">
            {descriptionItems.current.map((item, index) => (
              <DescriptionItem icon={item.icon} key={index}>
                {item.text}
              </DescriptionItem>
            ))}
          </ul>
          <RequestStatus isInProcess={true} id={"#151473"}></RequestStatus>
          <div className=" grid grid-cols-2 gap-6">
            <Button
              onClick={toExchangePage}
              className="home-btn"
              type={"primary"}
            >
              Начать обмен
            </Button>
            <Button onClick={callSupport} className="home-btn" type={"secondary"}>
              Поддержка
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-8">
          <AdditionallySectionButton
            onClick={() => setAdditionallySectionOpen((prev) => !prev)}
            arrowPosition={additionallySectionOpen ? "bottom" : "top"}
            arrow
          >
            Дополнительно
          </AdditionallySectionButton>
          <div
            className={clsx(
              " transition-all duration-500 border-neutral-gray-400  relative overflow-hidden",
              { "border-top": additionallySectionOpen }
            )}
            style={{ height: additionallySectionListHeight }}
          >
            <ul
              className="absolute w-full bottom-0 left-0"
              ref={additionallySectionList}
            >
              {additionallySectionListItems.current.map((item, index) => (
                <li key={index}>
                  <AdditionallySectionButton border onClick={item.onClick}>
                    {item.text}
                  </AdditionallySectionButton>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
