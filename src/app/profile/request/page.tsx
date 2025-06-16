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
        icon: request.currency_give?.icon || '',
        name: request.currency_give?.name || '',
        value: valueMask(roundTo8(request.currency_give?.amount || 0)),
        type: request.currency_give?.network || '',
        typeLabel: request.currency_give?.network || "Наличные" ,
        position: "given",

      },
      rate: calculateRate({
        course: request.course || 0,
        currencyGive: request.currency_give?.name || '',
        currencyGet: request.currency_get?.name || '',
      }),
    },
    {
      title: "Я получил",
  
      currency: {
        icon: request.currency_get?.icon || '',
        name: request.currency_get?.name || '',
        value: valueMask(roundTo8(request.currency_get?.amount || 0)),
        type: request.currency_get?.network || '',
        typeLabel: request.currency_get?.network || "Наличные" ,
        position: "received",
        wayDetails: calculateWayDetails({
          direction: request.currency_get?.network || '',
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
