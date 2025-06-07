import { CurrencyPosition } from "@/components/request/RequestDetails";
import { Rate } from "../slices/exchangeInput/types";
import { roundTo8 } from "./roundTo8";

export type TranslateCurrencyValueProps = {
  position: CurrencyPosition;
  rate: Rate;
  value: number | null;
};

export const translateCurrencyValue = ({
  value,
  position,
  rate,
}: TranslateCurrencyValueProps) => {
  if (rate.from.value === null || rate.to.value === null) {
    console.error("Rate is not set");
    return null;
  }

  if (value === null) {
    return null;
  }

  const coifficient = rate.from.value / rate.to.value;
  const translatedValue =
    position === "given" ? value * coifficient : value / coifficient;
  const roundedValue = roundTo8(translatedValue);
  return roundedValue;
}; 