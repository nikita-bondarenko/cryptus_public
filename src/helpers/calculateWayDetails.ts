import { CurrencyType } from "@/components/request/RequestDetails";
import { Direction } from "./calculateCurrencyTypeFromDirection";

interface WayDetails {
  title: string;
  value: string;
}

interface WayDetailsInput {
  direction: Direction;
  position: "given" | "received";
  type: CurrencyType;
  address?: string;
  cardNumber?: string;
  city?: string;
}

export const calculateWayDetails = ({
  direction,
  position,
  type,
  address,
  cardNumber,
  city,
}: WayDetailsInput): WayDetails | undefined => {
  // Для позиции "received" (получаю)
  if (position === "received") {
    // Для криптовалюты
    if (type === "crypto" && address) {
      return {
        title: "Адрес получения",
        value: address,
      };
    }

    // Для банковской карты
    if (type === "card" && cardNumber) {
      return {
        title: "Карта получения",
        value: cardNumber,
      };
    }

    // Для наличных
    if (type === "cash" && city) {
      return {
        title: "Город получения",
        value: city,
      };
    }
  }

  return undefined;
}; 