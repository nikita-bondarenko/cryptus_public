import { ExchangeTypeItemProps } from "@/components/exchange/ExchangeTypeItem";

export const exchangeTypesButtons: ExchangeTypeItemProps[] = [
  { icon: "crypt.svg", name: "Криптовалюта", type: "crypto" },
  { icon: "card.svg", name: "Безналичные", type: "card" },
  { icon: "cash.svg", name: "Наличные", type: "cash" },
];
