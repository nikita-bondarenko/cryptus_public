import { CurrencyType } from "@/components/request/RequestDetails";
import { ServerCurrencyType } from "./calculateCurrencyTypeForFetching";

export const calculateCurrencyTypeForFrontend = (currencyType: ServerCurrencyType): CurrencyType => {
    switch (currencyType) {
        case "COIN":
            return "crypto";
        case "CASH":
            return "cash";
        case "BANK":
            return "card";
        default:
            return "crypto";
    }
};  