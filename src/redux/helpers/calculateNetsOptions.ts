import { CurrencyType } from "@/components/request/RequestDetails"
import { CurrencyTypeFunction } from "./types"
import { GroupedCurrency } from "@/api/types"

export type CalculateNetsOptionsProps = {
    givenCurrencyType: CurrencyType,
    receivedCurrencyType: CurrencyType,
    givenCurrency: GroupedCurrency,
    receivedCurrency: GroupedCurrency,
}

export const calculateNetsOptions = ({givenCurrencyType, receivedCurrencyType, givenCurrency, receivedCurrency}: CalculateNetsOptionsProps): SVGAElement => {
    if (givenCurrencyType === "crypto") { 
        return givenCurrency.nets.map((net) => ({
            id: net.id,
            title: net.title,
        }))
    }

    
    return []
}