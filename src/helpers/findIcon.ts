import { CurrencyType } from "@/components/request/RequestDetails";
import { icons } from "@/data/icons";

export const findIcon = (currencyType: CurrencyType, ...args: string[] | undefined[] | null[]): string => {

    let defaultIcon = "crypt.svg"
    switch (currencyType) {
        case "crypto":
            defaultIcon = "crypt.svg"
            break
        case "cash":
            defaultIcon = "cash.svg"
            break
        case "card":
            defaultIcon = "card.svg"
            break
    }
  return icons?.find((icon) => args.some((arg) => arg?.includes(icon.value)))?.icon || defaultIcon;
};

