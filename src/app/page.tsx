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
import { setPageName } from "@/redux/uiSlice";
import { callSupport } from "@/helpers/callSupport";

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
    dispatch(setPageName(''))
  })
  return (
    <>
      <div className="container">
        <div
          className="rounded-[6px] px-[23px] pt-[35px] pb-[28px] mb-[17px]"
          style={{
            background: "linear-gradient(45deg, #C7ECFF 0%, #B8D1F6 100%)",
          }}
        >
          <div className=" flex justify-between">
            <div className="max-w-[205px]">
              <h1 className="font-bold text-[32px] mb-[15px] leading-[107.5%]">
                CRYPTUS EXCHANGE
              </h1>
              <p className="text-[13px] font-medium mb-[30px]">
                Обменник, которым ты всегда хотел пользоваться, но нечего было
                менять
              </p>
            </div>
            <ProfileButton onClick={toProfilePage}></ProfileButton>
          </div>

          <ul className=" flex flex-col gap-[11px] mb-[16px]">
            {descriptionItems.current.map((item, index) => (
              <DescriptionItem icon={item.icon} key={index}>
                {item.text}
              </DescriptionItem>
            ))}
          </ul>
          <RequestStatus isInProcess={true} id={"#151473"}></RequestStatus>
          <div className=" grid grid-cols-2 gap-[6px]">
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
        <div className="overflow-hidden rounded-[8px]">
          <AdditionallySectionButton
            onClick={() => setAdditionallySectionOpen((prev) => !prev)}
            arrowPosition={additionallySectionOpen ? "bottom" : "top"}
            arrow
          >
            Дополнительно
          </AdditionallySectionButton>
          <div
            className={clsx(
              " transition-all duration-500 border-[#C3C3C3]  relative overflow-hidden",
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
