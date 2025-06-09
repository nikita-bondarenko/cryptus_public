import { CurrencyType } from "@/components/request/RequestDetails";
import { ServerCurrencyType } from "./calculateCurrencyTypeForFetching";

export const calculateCurrencyTypeForFrontend = (currencyType: ServerCurrencyType): CurrencyType => {
    switch (currencyType) {
        case "COIN":
            return "COIN";
        case "CASH":
            return "CASH";
        case "BANK":
            return "BANK";
        default:
            return "COIN";
    }
};  