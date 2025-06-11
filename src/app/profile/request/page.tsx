"use client";
import RequestDetails, { RequestDetailsProps } from "@/components/request/RequestDetails";
import {  calculateCurrencyTypeFromDirection, Direction } from "@/helpers/calculateCurrencyTypeFromDirection";
import { calculateRate } from "@/helpers/calculateRate";
import { calculateWayDetails } from "@/helpers/calculateWayDetails";
import { findIcon } from "@/helpers/findIcon";
import { valueMask } from "@/helpers/valueMask";
import { roundTo8 } from "@/redux/helpers/roundTo8";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { setIsLoading, setPageName } from "@/redux/slices/uiSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";

const selectRequestDetails = (state: RootState) => state.requestDetails.data;

const Page: React.FC = () => {
  const dispatch = useAppDispatch();
  const request = useAppSelector(selectRequestDetails);
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
        name: request.currency_give_name,
        value: valueMask(roundTo8(request.amount_give)),
        type: calculateCurrencyTypeFromDirection(request.direction as Direction, "given"),
        typeLabel: calculateCurrencyTypeFromDirection(request.direction as Direction, "given") === "CASH" ? "Наличные" : request.currency_give_network || '',
        position: "given",

      },
      rate: calculateRate({
        course: request.course,
        currencyGive: request.currency_give_name,
        currencyGet: request.currency_get_name,
      }),
    },
    {
      title: "Я получил",
  
      currency: {
        icon: findIcon(calculateCurrencyTypeFromDirection(request.direction as Direction, "received"),request.currency_get),
        name: request.currency_get_name,
        value: valueMask(roundTo8(request.amount_get)),
        type: calculateCurrencyTypeFromDirection(request.direction as Direction, "received"),
        typeLabel: calculateCurrencyTypeFromDirection(request.direction as Direction, "received") === "CASH" ? "Наличные" : request.currency_get_network || '',
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
