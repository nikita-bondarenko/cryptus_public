import { RootState } from "../store";
import { RequestDetailsProps } from "@/components/request/RequestDetails";
import { createSelector } from "@reduxjs/toolkit";

export const selectExchangeDetails = createSelector(
  (state: RootState) => state.exchangeType.selectedGiveType,
  (state: RootState) => state.exchangeType.selectedReceieveType,
  (state: RootState) => state.exchangeInput.rate,
  (state: RootState) => state.exchangeInput.cryptoInput,
  (state: RootState) => state.exchangeInput.cardInput,
  (state: RootState) => state.exchangeInput.cashInput,
  (
    selectedGiveType,
    selectedReceieveType,
    rate,
    cryptoInput,
    cardInput,
    cashInput
  ): RequestDetailsProps[] => {
    // "Я отдаю"
    let give: RequestDetailsProps | null = null;
    if (selectedGiveType === "COIN") {
      give = {
        title: "Я отдаю",
        rate,
        currency: {
          icon: cryptoInput.currency?.icon || "usdt.svg",
          name: cryptoInput.currency?.name || "USDT",
          type: "COIN",
          typeLabel: cryptoInput.net.value?.name || "BEP 20",
          value: cryptoInput.amount.value ? String(cryptoInput.amount.value) : "",
          position: "given",
        },
      };
    } else if (selectedGiveType === "BANK") {
      give = {
        title: "Я отдаю",
        rate,
        currency: {
          icon: cardInput.currency?.icon || "rub.svg",
          name: cardInput.currency?.name || "RUB",
          type: "BANK",
          typeLabel: cardInput.bank.value?.name || "Банк",
          value: cardInput.amount.value ? String(cardInput.amount.value) : "",
          position: "given",
          wayDetails: cardInput.cardNumber.value
            ? { title: "Карта отправления", value: cardInput.cardNumber.value }
            : undefined,
        },
      };
    } else if (selectedGiveType === "CASH") {
      give = {
        title: "Я отдаю",
        rate,
        currency: {
          icon: cashInput.currency?.icon || "rub.svg",
          name: cashInput.currency?.name || "RUB",
          type: "CASH",
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
    if (selectedReceieveType === "COIN") {
      receive = {
        title: "Я получаю",
        currency: {
          icon: cryptoInput.currency?.icon || "usdt.svg",
          name: cryptoInput.currency?.name || "USDT",
          type: "COIN",
          typeLabel: cryptoInput.net.value?.name || "BEP 20",
          value: cryptoInput.amount.value ? String(cryptoInput.amount.value) : "",
          position: "received",
          wayDetails: cryptoInput.walletAddress.value
            ? { title: "Адрес получения", value: cryptoInput.walletAddress.value }
            : undefined,
        },
      };
    } else if (selectedReceieveType === "BANK") {
      receive = {
        title: "Я получаю",
        currency: {
          icon: cardInput.currency?.icon || "rub.svg",
          name: cardInput.currency?.name || "RUB",
          type: "BANK",
          typeLabel: cardInput.bank.value?.name || "Банк",
          value: cardInput.amount.value ? String(cardInput.amount.value) : "",
          position: "received",
          wayDetails: cardInput.cardNumber.value
            ? { title: "Карта получения", value: cardInput.cardNumber.value }
            : undefined,
        },
      };
    } else if (selectedReceieveType === "CASH") {
      receive = {
        title: "Я получаю",
        currency: {
          icon: cashInput.currency?.icon || "rub.svg",
          name: cashInput.currency?.name || "RUB",
          type: "CASH",
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
  }
); 