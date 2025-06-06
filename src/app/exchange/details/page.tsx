"use client";
import RequestDetails from "@/components/request/RequestDetails";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setPageName } from "@/redux/slices/uiSlice";
import { selectExchangeDetails } from "@/redux/selectors/exchangeDetailsSelector";
import React, { useCallback, useEffect } from "react";
import ExchangePageLayout from "@/components/exchange/ExchangePageLayout";
import { useRouter } from "next/navigation";

export default function ExchangeDetailsPage() {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectExchangeDetails);
  const router = useRouter();
  useEffect(() => {
    dispatch(setPageName("подтверждение заявки"));
  }, [dispatch]);

  const onSubmit = useCallback(() => {
    router.push("/exchange/result");
  }, [router]);

  return (
    <ExchangePageLayout onMainButtonClick={onSubmit} buttonText="Оставить заявку">
      <div className="flex flex-col gap-[26px]"> {details.map((item, idx) => (
        <RequestDetails {...item} key={idx} />
      ))}
</div> 

     
    </ExchangePageLayout>
  );
}
