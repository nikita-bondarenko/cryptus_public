"use client";

import {
  CurrencyPosition,
  CurrencyType,
} from "@/components/request/RequestDetails";
import Button from "@/components/ui/Button";
import { usePrepareExchangeInputPage } from "@/hooks/usePrepareExchangeInputPage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrencyTypes } from "@/redux/selectors";
import { setAreErrorsVisible } from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { setPageName } from "@/redux/slices/uiSlice";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { memo, useCallback, useEffect, useMemo } from "react";
import { store } from "@/redux/store";
import ExchangeInput from "@/components/exchange/ExchangeInput";

export default memo(function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading] = usePrepareExchangeInputPage();

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
  }, [dispatch, router]);

  const memoizedSelector = useMemo(() => selectCurrencyTypes(), []);
  const { givenCurrencyType, receivedCurrencyType } =
    useAppSelector(memoizedSelector);

  useEffect(() => {
    dispatch(setPageName("детали обмена"));
    return () => {
      dispatch(setAreErrorsVisible(false));
    };
  });

  const getCurrencyInput = (
    cyrrencyType: CurrencyType,
    position: CurrencyPosition
  ) => {
    return (
      <ExchangeInput position={position} type={cyrrencyType}></ExchangeInput>
    );
  };

  return (
    <div className="container">
      <div
        className={clsx("flex flex-col gap-30 mb-22 ", {
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
