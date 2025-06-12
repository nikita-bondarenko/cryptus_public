import { CurrencyPosition, CurrencyType } from "@/components/request/RequestDetails";
import { roundTo8 } from "@/redux/helpers";
import { Rate } from "@/redux/slices/exchangeInput/types";

type calculatePlaceholderProps = {
  position: CurrencyPosition;
  minValue: number;
  rate: Rate | null;
  currencyType: CurrencyType
};
export const calculatePlaceholder = ({
  position,
  minValue,
  rate,
  currencyType
}: calculatePlaceholderProps) => {
  if (position === "given") {
    return minValue;
  } else {
    if (rate === null || rate?.from.value === null || rate?.to.value === null) return minValue;
    const result = (minValue / (rate?.from.value / rate?.to.value))
    return currencyType !== 'COIN' ? Number(result.toFixed(2)) : Number(result.toFixed(8));
  }
};
