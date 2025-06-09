import { GroupedCurrency } from "@/api/types";
import { calculateCurrencyTypeForFrontend } from "./calculateCurrencyTypeForFrontend";
import { findIcon } from "./findIcon";

export const translateCurrency = (currency: GroupedCurrency | null | undefined) => {
  return currency ? {
    value: currency.id,
    name: currency.code || currency.title,
    icon: findIcon(calculateCurrencyTypeForFrontend(currency.type),currency.title, currency.code),

  } : null;
}