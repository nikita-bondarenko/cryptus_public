"use client";
import ExchangePageLayout from "@/components/exchange/ExchangePageLayout";
import ExchangeTypeBlock from "@/components/exchange/ExchangeTypeBlock";
import { exchangeTypesButtons } from "@/data/exchangeTypesButtons";
import { callSupport } from "@/helpers/callSupport";
import { validateAllFields } from "@/redux/helpers";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetExchangeInput } from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { setPageName } from "@/redux/slices/uiSlice";
import { store, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { memo, useCallback, useEffect, useRef } from "react";

export default memo(function Page() {
  const recieveOptions = useAppSelector(
    (state) => state.exchangeType.receiveOptions
  );
  
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(() => {
    router.push("/exchange/input");
  }, [router]);

  useEffect(() => {
    dispatch(setPageName("выбор типа обмена"));
    const state = store.getState() as RootState;

    dispatch(resetExchangeInput());

    validateAllFields(state, dispatch);
  }, [dispatch]);

  const giveOptions = useRef(exchangeTypesButtons);
  return (
    <ExchangePageLayout onMainButtonClick={onSubmit} buttonText="Подтвердить выбор">
      <div className="flex flex-col gap-12 justify-between mb-50">
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
        <div className="border-1 rounded-6 border-neutral-gray-300 bg-white w-full h-60 flex flex-col items-center justify-center">
          <p className="text-13 text-neutral-gray-1500">
            Не нашли интересующий тип обмена?
          </p>
          <button
            onClick={callSupport}
            className="text-13 font-medium text-neutral-gray-900 underline underline-offset-1"
          >
            связаться с поддержкой
          </button>
        </div>
      </div>
    </ExchangePageLayout>
  );
});
