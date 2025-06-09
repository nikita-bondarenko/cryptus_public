import { CurrencyPosition } from "@/components/request/RequestDetails";
import { Rate } from "@/redux/slices/exchangeInput/types";

type calculatePlaceholderProps = {
  position: CurrencyPosition;
  minValue: number;
  rate: Rate | null;
};
export const calculatePlaceholder = ({
  position,
  minValue,
  rate,
}: calculatePlaceholderProps) => {
  if (position === "given") {
    return minValue;
  } else {
    if (rate === null || rate?.from.value === null || rate?.to.value === null) return minValue;
    return minValue / (rate?.from.value / rate?.to.value);
  }
};
