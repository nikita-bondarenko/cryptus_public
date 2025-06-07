"use client";
import RequestDetails from "@/components/request/RequestDetails";
import { requestDetails } from "@/data/requestDetails";
import { useAppDispatch } from "@/redux/hooks";
import { setPageName } from "@/redux/slices/uiSlice";
import React, { useEffect } from "react";

const Page: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageName("заявка #151473"));
  });

  return (
    <div className="container mt-10 flex flex-col gap-26">
      {requestDetails.map((request, index) => (
        <RequestDetails {...request} key={index}></RequestDetails>
      ))}
    </div>
  );
};

export default Page;
