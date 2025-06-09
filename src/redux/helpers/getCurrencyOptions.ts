import { CurrencyOption } from "@/components/exchange/CurrencySelect";
import { CurrencyType } from "@/components/request/RequestDetails";

export type GetCurrencyOptions = {
    type: CurrencyType,
    givenCurrencyType: CurrencyType,
    receivedCurrencyType: CurrencyType,
    currenciesGiven: CurrencyOption[],
    currenciesReceived: CurrencyOption[],
}

export const getCurrencyOptions = ({type, givenCurrencyType, receivedCurrencyType, currenciesGiven, currenciesReceived}: GetCurrencyOptions): CurrencyOption[]  => {
    if (type === givenCurrencyType) {
        return currenciesGiven
    }
    if (type === receivedCurrencyType) {
        return currenciesReceived
    }
    return []

}   