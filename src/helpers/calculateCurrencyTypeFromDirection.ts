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
      return "COIN";
    } else if (direction?.startsWith("BANK")) {
      return "BANK";
    } else if (direction?.startsWith("CASH")) {
      return "CASH";
    }
  }

  // Для позиции "received" (получаю)
  if (position === "received") {
    if (direction.endsWith("COIN")) {
      return "COIN";
    } else if (direction.endsWith("BANK")) {
      return "BANK";
    } else if (direction.endsWith("CASH")) {
      return "CASH";
    }
  }

  // По умолчанию возвращаем crypto
  return "COIN";
}; 