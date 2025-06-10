"use client";
import RequestDetails, { RequestDetailsProps } from "@/components/request/RequestDetails";
import {  calculateCurrencyTypeFromDirection, Direction } from "@/helpers/calculateCurrencyTypeFromDirection";
import { calculateRate } from "@/helpers/calculateRate";
import { calculateWayDetails } from "@/helpers/calculateWayDetails";
import { findIcon } from "@/helpers/findIcon";
import { valueMask } from "@/helpers/valueMask";
import { roundTo8 } from "@/redux/helpers/roundTo8";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsLoading, setPageName } from "@/redux/slices/uiSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";

const Page: React.FC = () => {
  const dispatch = useAppDispatch();
  const request = useAppSelector((state) => state.requestDetails.data);
const router = useRouter()
  useEffect(() => {
    dispatch(setPageName(`заявка ${request?.id}`));
    dispatch(setIsLoading(false))
    if (!request) {
      router.push('/profile')
    }
  },[request]);

  
  const requestDetails:RequestDetailsProps[] = useMemo(() => {
    if (!request) return [];
   return [
    {
      title: "Я отдал",
      currency: {
        icon: findIcon(calculateCurrencyTypeFromDirection(request.direction as Direction, "given"),request.currency_give),
        name: request.currency_give,
        value: valueMask(roundTo8(request.amount_give)),
        type: calculateCurrencyTypeFromDirection(request.direction as Direction, "given"),
        typeLabel: calculateCurrencyTypeFromDirection(request.direction as Direction, "given") === "CASH" ? "Наличные" : "",
        position: "given",

      },
      rate: calculateRate({
        course: request.course,
        currencyGive: request.currency_give,
        currencyGet: request.currency_get,
      }),
    },
    {
      title: "Я получил",
  
      currency: {
        icon: findIcon(calculateCurrencyTypeFromDirection(request.direction as Direction, "received"),request.currency_get),
        name: request.currency_get,
        value: valueMask(roundTo8(request.amount_get)),
        type: calculateCurrencyTypeFromDirection(request.direction as Direction, "received"),
        typeLabel: calculateCurrencyTypeFromDirection(request.direction as Direction, "received") === "CASH" ? "Наличные" : "",
        position: "received",
        wayDetails: calculateWayDetails({
          direction: request.direction as Direction,
          position: "received",
          type: calculateCurrencyTypeFromDirection(request.direction as Direction, "received"),
          address: request.get_to,
          cardNumber: request.get_to,
          city: request.city,
        }),
      },
    }
   ]
  }, [request]);

  return (
    <div className="container mt-10 flex flex-col gap-26">
      {requestDetails.map((request, index) => (
        <RequestDetails {...request} key={index}></RequestDetails>
      ))}
    </div>
  );
};

export default Page;
