"use client";
import ExchangePageLayout from "@/components/exchange/ExchangePageLayout";
import ExchangeTypeBlock from "@/components/exchange/ExchangeTypeBlock";
import { exchangeTypesButtons } from "@/data/exchangeTypesButtons";
import { callSupport } from "@/helpers/callSupport";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setPageName } from "@/redux/uiSlice";
import { useRouter } from "next/navigation";
import React, { memo, useCallback, useEffect, useRef } from "react";

export default memo(function Page() {
  const recieveOptions = useAppSelector(
    (state) => state.exchangeType.receiveOptions
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  const toExchangeInputPage = useCallback(() => {
    router.push("/exchange/input");
  }, [router]);
  useEffect(() => {
    dispatch(setPageName(""));
  });

  const giveOptions = useRef(exchangeTypesButtons)
  return (
    <ExchangePageLayout onMainButtonClick={toExchangeInputPage} buttonText="Подтвердить выбор">
       <div className="flex flex-col gap-[12px] justify-between mb-[50px]">
        <ExchangeTypeBlock
          position="given"
          title="Я отдаю"
          buttons={giveOptions.current}
        ></ExchangeTypeBlock>
        <ExchangeTypeBlock
          position="received"
          title="Я получаю"
          buttons={recieveOptions}
        ></ExchangeTypeBlock>
        <div className="border-[1px] rounded-[6px] border-[#DEDEDE] bg-white w-full h-[60px] flex flex-col items-center justify-center">
          <p className="text-[11px] text-[#939393]">
            Не нашли интересующий тип обмена?
          </p>
          <button
            onClick={callSupport}
            className="text-[11px] font-medium text-[#3F3F3F] underline underline-offset-1"
          >
            связаться с поддержкой
          </button>
        </div>
      </div>
    </ExchangePageLayout>
  );
});
