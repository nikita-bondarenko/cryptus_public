import { GroupedCurrency } from "@/api/types";
import { calculateCurrencyTypeForFrontend } from "./calculateCurrencyTypeForFrontend";
import { findIcon } from "./findIcon";
import { currencyMaskList } from "@/data/currencyMaskList";
    
export const translateCurrency = (currency: GroupedCurrency | null | undefined) => {

  const currencyMask = currencyMaskList.find(mask => mask.title === currency?.title);
  return currency ? {
    value: currency.id,
    name: currencyMask?.label || currency.code || currency.title,
    icon: currencyMask?.icon || findIcon(calculateCurrencyTypeForFrontend(currency.type),currency.title, currency.code),

  } : null;
}