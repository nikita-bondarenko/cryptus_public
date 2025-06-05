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
import { setPageName } from "@/redux/slices/uiSlice";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { memo, useCallback, useEffect, useMemo } from "react";

export default memo(function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading] = usePrepareExchangeInputPage();
  const { cardInput, cashInput, cryptoInput } = useAppSelector(
    (state) => state.exchangeInput
  );

  useEffect(() => {
    console.log(cryptoInput);
  }, [cryptoInput]);
  useEffect(() => {
    console.log(cardInput);
  }, [cardInput]);
  useEffect(() => {
    console.log(cashInput);
  }, [cashInput]);

  const onSubmit = useCallback(() => {
    // console.log(cardInput, cashInput, cryptoInput);
    return;
    router.push("/exchange/");
  }, [router, cardInput, cashInput, cryptoInput]);

  const memoizedSelector = useMemo(() => selectCurrencyTypes(), []);
  const { givenCurrencyType, receivedCurrencyType } =
    useAppSelector(memoizedSelector);

  useEffect(() => {
    dispatch(setPageName("детали обмена"));
  });

  const getCurrencyInput = (
    cyrrencyType: CurrencyType,
    position: CurrencyPosition
  ) => {
    switch (cyrrencyType) {
      case "crypto": {
        return (
          <ExchangeInputCrypto
            placeholder={8092}
            position={position}
          ></ExchangeInputCrypto>
        );
      }
      case "card": {
        return (
          <ExchangeInputCard
            placeholder={8092}
            position={position}
          ></ExchangeInputCard>
        );
      }
      case "cash": {
        return (
          <ExchangeInputCash
            placeholder={8092}
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
