import { CurrencyType } from "@/components/request/RequestDetails";

export type ServerCurrencyType = "COIN" | "BANK" | "CASH";


    export const calculateCurrencyTypeForFetching = (type: CurrencyType): ServerCurrencyType  => {
  if (type === "COIN") {
    return "COIN";
  } else if (type === "BANK") {
    return "BANK";
  } else if (type === "CASH") {
    return "CASH";
  }
  return "COIN";
};