import { CurrencyType } from "@/components/request/RequestDetails";

export type Direction = "COIN - BANK" | "COIN - CASH" | "BANK - COIN" | "CASH - COIN";
type Position = "given" | "received";

export const calculateCurrencyTypeFromDirection = (
  direction: Direction,
  position: Position
): CurrencyType => {
  // Для позиции "given" (отдаю)
  if (position === "given") {
    if (direction?.startsWith("COIN")) {
      return "crypto";
    } else if (direction?.startsWith("BANK")) {
      return "card";
    } else if (direction?.startsWith("CASH")) {
      return "cash";
    }
  }

  // Для позиции "received" (получаю)
  if (position === "received") {
    if (direction.endsWith("COIN")) {
      return "crypto";
    } else if (direction.endsWith("BANK")) {
      return "card";
    } else if (direction.endsWith("CASH")) {
      return "cash";
    }
  }

  // По умолчанию возвращаем crypto
  return "crypto";
}; 