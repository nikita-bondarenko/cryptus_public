import { CurrencyType } from "@/components/request/RequestDetails";

export type ServerCurrencyType = "COIN" | "BANK" | "CASH";


    export const calculateCurrencyTypeForFetching = (type: CurrencyType): ServerCurrencyType | string => {
  if (type === "crypto") {
    return "COIN";
  } else if (type === "card") {
    return "BANK";
  } else if (type === "cash") {
    return "CASH";
  }
  return "";
};