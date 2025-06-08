import { GroupedCurrency } from "@/api/types";
import { CurrencyOption } from "@/components/exchange/CurrencySelect";
import { findIcon } from "./findIcon";
import { calculateCurrencyTypeForFrontend } from "./calculateCurrencyTypeForFrontend";

export const translateCurrencies = (currencies: GroupedCurrency[] | undefined): CurrencyOption[] => {
    if (!currencies) return []


 return currencies.map((currency) => ({
    value: currency.id,
    icon: findIcon(calculateCurrencyTypeForFrontend(currency.type),currency.title, currency.code),
    name: currency.title,
  }));
};