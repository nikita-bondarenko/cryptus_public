import { RootState } from "../store";
import { RequestDetailsProps } from "@/components/request/RequestDetails";

export const selectExchangeDetails = (state: RootState): RequestDetailsProps[] => {
  const { selectedGiveType, selectedReceieveType } = state.exchangeType;
  const { rate, cryptoInput, cardInput, cashInput } = state.exchangeInput;

  // "Я отдаю"
  let give: RequestDetailsProps | null = null;
  if (selectedGiveType === "crypto") {
    give = {
      title: "Я отдаю",
      rate,
      currency: {
        icon: cryptoInput.currency?.icon || "usdt.svg",
        name: cryptoInput.currency?.name || "USDT",
        type: "crypto",
        typeLabel: cryptoInput.net.value?.name || "BEP 20",
        value: cryptoInput.amount.value ? String(cryptoInput.amount.value) : "",
        position: "given",
      },
    };
  } else if (selectedGiveType === "card") {
    give = {
      title: "Я отдаю",
      rate,
      currency: {
        icon: cardInput.currency?.icon || "rub.svg",
        name: cardInput.currency?.name || "RUB",
        type: "card",
        typeLabel: cardInput.bank.value?.name || "Банк",
        value: cardInput.amount.value ? String(cardInput.amount.value) : "",
        position: "given",
        wayDetails: cardInput.cardNumber.value
          ? { title: "Карта отправления", value: cardInput.cardNumber.value }
          : undefined,
      },
    };
  } else if (selectedGiveType === "cash") {
    give = {
      title: "Я отдаю",
      rate,
      currency: {
        icon: cashInput.currency?.icon || "rub.svg",
        name: cashInput.currency?.name || "RUB",
        type: "cash",
        typeLabel: "Наличные",
        value: cashInput.amount.value ? String(cashInput.amount.value) : "",
        position: "given",
        wayDetails: cashInput.city.value
          ? { title: "Город отправления", value: cashInput.city.value }
          : undefined,
      },
    };
  }

  // "Я получаю"
  let receive: RequestDetailsProps | null = null;
  if (selectedReceieveType === "crypto") {
    receive = {
      title: "Я получаю",
      currency: {
        icon: cryptoInput.currency?.icon || "usdt.svg",
        name: cryptoInput.currency?.name || "USDT",
        type: "crypto",
        typeLabel: cryptoInput.net.value?.name || "BEP 20",
        value: cryptoInput.amount.value ? String(cryptoInput.amount.value) : "",
        position: "received",
        wayDetails: cryptoInput.walletAddress.value
          ? { title: "Адрес получения", value: cryptoInput.walletAddress.value }
          : undefined,
      },
    };
  } else if (selectedReceieveType === "card") {
    receive = {
      title: "Я получаю",
      currency: {
        icon: cardInput.currency?.icon || "rub.svg",
        name: cardInput.currency?.name || "RUB",
        type: "card",
        typeLabel: cardInput.bank.value?.name || "Банк",
        value: cardInput.amount.value ? String(cardInput.amount.value) : "",
        position: "received",
        wayDetails: cardInput.cardNumber.value
          ? { title: "Карта получения", value: cardInput.cardNumber.value }
          : undefined,
      },
    };
  } else if (selectedReceieveType === "cash") {
    receive = {
      title: "Я получаю",
      currency: {
        icon: cashInput.currency?.icon || "rub.svg",
        name: cashInput.currency?.name || "RUB",
        type: "cash",
        typeLabel: "Наличные",
        value: cashInput.amount.value ? String(cashInput.amount.value) : "",
        position: "received",
        wayDetails: cashInput.city.value
          ? { title: "Город получения", value: cashInput.city.value }
          : undefined,
      },
    };
  }

  return [give, receive].filter(Boolean) as RequestDetailsProps[];
}; 