import { CurrencyPosition } from "@/components/request/RequestDetails";
import { calculatePlaceholder } from "@/helpers/calculatePlaceholder";
import { valueMask } from "@/helpers/valueMask";
import { useAppSelector } from "@/redux/hooks";
import { useMemo } from "react";

export const usePlaceholder = (position: CurrencyPosition) => {
  const minValue = useAppSelector((state) => state.exchangeInput.minValue);
  const rate = useAppSelector((state) => state.exchangeInput.rate);
  const placeholder = useMemo(() => {
    return valueMask(calculatePlaceholder({ minValue, rate, position }));
  }, [minValue, rate, position]);
  return placeholder
};
