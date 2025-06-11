import { CurrencyType } from "@/components/request/RequestDetails";
import { currencyMaskList } from "@/data/currencyMaskList";

export const findIcon = (currencyType: CurrencyType, ...args: string[] | undefined[] | null[]): string => {

    let defaultIcon = "crypt.svg"
    switch (currencyType) {
        case "COIN":
            defaultIcon = "crypt.svg"
            break
        case "CASH":
            defaultIcon = "cash.svg"
            break
        case "BANK":
            defaultIcon = "card.svg"
            break
    }
   const currentMask = currencyMaskList?.find((currency) => args.some((arg) => arg === currency.title || arg?.includes(currency.label)   ))
//    console.log(args,currentMask)
  return currentMask?.icon || defaultIcon;
};

