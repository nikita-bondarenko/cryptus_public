import { CurrencyType } from "@/components/request/RequestDetails";
import { icons } from "@/data/icons";

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
  return icons?.find((icon) => args.some((arg) => arg?.includes(icon.value)))?.icon || defaultIcon;
};

