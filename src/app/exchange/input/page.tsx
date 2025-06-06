"use client";
import ExchangeInputCard from "@/components/exchange/ExchangeInputCard";
import ExchangeInputCash from "@/components/exchange/ExchangeInputCash";
import ExchangeInputCrypto from "@/components/exchange/ExchangeInputCrypto";
import ExchangePageLayout from "@/components/exchange/ExchangePageLayout";
import {
  CurrencyPosition,
  CurrencyType,
} from "@/components/request/RequestDetails";
import Button from "@/components/ui/Button";
import { SectionHeadingProps } from "@/components/ui/SectionHeading";
import { usePrepareExchangeInputPage } from "@/hooks/usePrepareExchangeInputPage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrencyTypes } from "@/redux/selectors";
import { setAreErrorsVisible } from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { setPageName } from "@/redux/slices/uiSlice";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { memo, useCallback, useEffect, useMemo } from "react";
import { store } from "@/redux/store";

export default memo(function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading] = usePrepareExchangeInputPage();

  console.log("page");
  const onSubmit = useCallback(() => {
    dispatch(setAreErrorsVisible(true));
    
    // Проверяем наличие ошибок
    const state = store.getState();
    const areErrors = state.exchangeInput.areErrors;
    
    // Если есть ошибки, не переходим дальше
    if (areErrors) {
      return;
    }
    
   router.push("/exchange/details");
    console.log("ошибок нет")
  }, [dispatch, router]);

  const memoizedSelector = useMemo(() => selectCurrencyTypes(), []);
  const { givenCurrencyType, receivedCurrencyType } =
    useAppSelector(memoizedSelector);

  useEffect(() => {
    dispatch(setPageName("детали обмена"));
    console.log(store.getState().exchangeInput)
    return () => {
      dispatch(setAreErrorsVisible(false));
    };
  });

  const getCurrencyInput = (
    cyrrencyType: CurrencyType,
    position: CurrencyPosition
  ) => {
    switch (cyrrencyType) {
      case "crypto": {
        return (
          <ExchangeInputCrypto
            position={position}
          ></ExchangeInputCrypto>
        );
      }
      case "card": {
        return (
          <ExchangeInputCard
            position={position}
          ></ExchangeInputCard>
        );
      }
      case "cash": {
        return (
          <ExchangeInputCash
            position={position}
          ></ExchangeInputCash>
        );
      }
    }
  };

  return (
    <div className="container">
      <div
        className={clsx("flex flex-col gap-[30px] mb-[22px] ", {
          loading: isLoading,
        })}
      >
        {getCurrencyInput(givenCurrencyType, "given")}
        {getCurrencyInput(receivedCurrencyType, "received")}
      </div>
      <Button type="primary" onClick={onSubmit}>
        Далее
      </Button>
    </div>
  );
});
