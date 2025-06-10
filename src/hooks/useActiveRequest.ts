import { useGetUserExchangesQuery } from "@/api/api";
import { useAppSelector } from "@/redux/hooks";
import { useMemo } from "react";
import { useQueryWithLoading } from "./useQueryWithLoading";
import { IN_PROCESS_REQUEST_STATUS, NEW_REQUEST_STATUS } from "@/config";



export const useActiveRequest = () => {
  const userId = useAppSelector((state) => state.userData.userId);
  const isAppReady = useAppSelector((state) => state.ui.isAppReady);
  const { data: exchanges, isLoading } = useGetUserExchangesQuery({ user_id: userId }, { skip: !userId || !isAppReady })

  const activeRequests = useMemo(() => {
    return exchanges?.filter(
      (exchange) => exchange.status === IN_PROCESS_REQUEST_STATUS||exchange.status === NEW_REQUEST_STATUS
    );
  }, [exchanges, isAppReady]);

  return {
    activeRequests,
    isLoading,
    hasActiveRequest: !!activeRequests,
  };
}; 