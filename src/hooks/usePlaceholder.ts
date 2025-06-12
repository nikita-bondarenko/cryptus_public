import { CurrencyType } from './../components/request/RequestDetails';
import { CurrencyPosition } from "@/components/request/RequestDetails";
import { calculatePlaceholder } from "@/helpers/calculatePlaceholder";
import { valueMask } from "@/helpers/valueMask";
import { useAppSelector } from "@/redux/hooks";
import { selectRate } from "@/redux/selectors";
import { useMemo } from "react";

export const usePlaceholder = (position: CurrencyPosition, currencyType:CurrencyType) => {
  const minValue = useAppSelector((state) => state.exchange.exchangeRate?.min_amount);
  const rate = useAppSelector(selectRate());
  const placeholder = useMemo(() => {
    return valueMask(calculatePlaceholder({ minValue: minValue || 0, rate, position, currencyType }));
  }, [minValue, rate, position]);
  return placeholder
};
