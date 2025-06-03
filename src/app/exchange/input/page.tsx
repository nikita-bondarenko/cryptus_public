"use client";
import ExchangeInputCrypto from "@/components/exchange/ExchangeInputCrypto";
import ExchangePageLayout from "@/components/exchange/ExchangePageLayout";
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

  return (
    <ExchangePageLayout buttonText="Далее" onMainButtonClick={toNextPage}>
      <div className="flex flex-col gap-[30px]">
        <ExchangeInputCrypto
          {...givenHeadingInfo}
          position="given"
        ></ExchangeInputCrypto>
        <ExchangeInputCrypto
          {...receivedHeadingInfo}
          position="received"
        ></ExchangeInputCrypto>
      </div>
    </ExchangePageLayout>
  );
});
