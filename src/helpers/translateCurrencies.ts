import { GroupedCurrency } from "@/api/types";
import { CurrencyOption } from "@/components/exchange/CurrencySelect";
import { findIcon } from "./findIcon";
import { calculateCurrencyTypeForFrontend } from "./calculateCurrencyTypeForFrontend";
import { translateCurrency } from "./translateCurrency";

export const translateCurrencies = (currencies: GroupedCurrency[] | undefined): CurrencyOption[] => {
    if (!currencies) return []


 return currencies.map((currency) => translateCurrency(currency)).filter((currency): currency is NonNullable<typeof currency> => currency !== null);
};