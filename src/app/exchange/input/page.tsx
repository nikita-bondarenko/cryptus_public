"use client";
import ExchangeInputCard from "@/components/exchange/ExchangeInputCard";
import ExchangeInputCash from "@/components/exchange/ExchangeInputCash";
import ExchangeInputCrypto from "@/components/exchange/ExchangeInputCrypto";
import ExchangePageLayout from "@/components/exchange/ExchangePageLayout";
import Button from "@/components/ui/Button";
import { SectionHeadingProps } from "@/components/ui/SectionHeading";
import { useAppDispatch } from "@/redux/hooks";
import { setPageName } from "@/redux/uiSlice";
import { useRouter } from "next/navigation";
import React, { memo, useCallback, useEffect } from "react";

const givenHeadingInfo: SectionHeadingProps = {
  title: "Я отдаю",
  minValue: "100",
};

const receivedHeadingInfo: SectionHeadingProps = {
  title: "Я получаю",
  rate: {
    from: {
      value: "1",
      name: "USDT",
    },
    to: {
      value: "81,69",
      name: "RUB",
    },
  },
};

export default memo(function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toNextPage = useCallback(() => {
    router.push("/exchange/");
  }, [router]);

  useEffect(() => {
    dispatch(setPageName("детали обмена"));
  });
  console.log("page");
  return (
    <div className="container">
      <div className="flex flex-col gap-[30px] mb-[22px]">
        <ExchangeInputCrypto
          placeholder={1000}
          {...givenHeadingInfo}
          position="given"
        ></ExchangeInputCrypto>
        <ExchangeInputCrypto
          placeholder={8092}
          {...receivedHeadingInfo}
          position="received"
        ></ExchangeInputCrypto>
        <ExchangeInputCard
          placeholder={8092}
          {...givenHeadingInfo}
          position="given"
        ></ExchangeInputCard>
        <ExchangeInputCard
          placeholder={8092}
          {...receivedHeadingInfo}
          position="received"
        ></ExchangeInputCard>
        <ExchangeInputCash
          placeholder={8092}
          {...givenHeadingInfo}
          position="given"
        ></ExchangeInputCash>
        <ExchangeInputCash
          placeholder={8092}
          {...receivedHeadingInfo}
          position="received"
        ></ExchangeInputCash>
      </div>
      <Button type="primary" onClick={toNextPage}>
        Далее
      </Button>
    </div>
  );
});
