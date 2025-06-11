import { RootState } from "../store";
import { CurrencyType, RequestDetailsProps } from "@/components/request/RequestDetails";
import { calculateRate } from "@/helpers/calculateRate";
import { findIcon } from "@/helpers/findIcon";
import { valueMask } from "@/helpers/valueMask";
import { createSelector } from "@reduxjs/toolkit";
import { roundTo8 } from "../helpers";
import { CreateExchangeParams, GroupedCurrency } from "@/api/types";
import { Rate } from "../slices/exchangeInput/types";
import { ExchangeBank, ExchangeNetwork } from "../slices/exchangeSlice/exchangeSlice";
import { calculateBank, translateBanks } from "../helpers/translateBanks";
import { selectBankValue, selectNetValue } from ".";

export const selectExchangeDetails = createSelector(
  (state: RootState) => state.exchange.selectedCurrencySellType,
  (state: RootState) => state.exchange.selectedCurrencyBuyType,
  (state: RootState) => state.exchange.exchangeRate,
  (state: RootState) => state.exchange.selectedCurrencySell,
  (state: RootState) => state.exchange.selectedCurrencyBuy,
  (state: RootState) => state.exchange.currencySellAmount,
  (state: RootState) => state.exchange.currencyBuyAmount,
  (state: RootState) => state.exchange.walletAddress,
  selectBankValue,
  (state: RootState) => state.exchange.cardNumber,
  (state: RootState) => state.exchange.selectedCity,
  selectNetValue,
  (
    selectedCurrencySellType,
    selectedCurrencyBuyType,
    exchangeRate,
    selectedCurrencySell,
    selectedCurrencyBuy,
    currencySellAmount,
    currencyBuyAmount,
    walletAddress,
    selectedBank,
    cardNumber,
    selectedCity,
    selectedNetwork
  ): RequestDetailsProps[] => {
    // "Я отдаю"
    let give: RequestDetailsProps | null = null;
    if (selectedCurrencySellType === "COIN") {
      give = {
        title: "Я отдаю",
        rate: calculateRate({course: exchangeRate?.course || 0, currencyGive: selectedCurrencySell?.code || selectedCurrencySell?.title || "", currencyGet: selectedCurrencyBuy?.code || selectedCurrencyBuy?.title || ""}) as Rate,
        currency: {
          icon: findIcon("COIN", selectedCurrencySell?.code || selectedCurrencySell?.title || "") || "crypt.svg",
          name: selectedCurrencySell?.code || selectedCurrencySell?.title || "",
          type: "COIN",
          typeLabel: selectedNetwork?.name || "",
          value: currencySellAmount.value ? valueMask(roundTo8(currencySellAmount.value)) : "",
          position: "given",
        },
      };
    } else if (selectedCurrencySellType === "BANK") {
      give = {
        title: "Я отдаю",
        rate: calculateRate({course: exchangeRate?.course || 0, currencyGive: selectedCurrencySell?.code || selectedCurrencySell?.title || "", currencyGet: selectedCurrencyBuy?.code || selectedCurrencyBuy?.title || ""}) as Rate,
        currency: {
          icon: findIcon("BANK", selectedCurrencySell?.code || selectedCurrencySell?.title || "") || "",
          name: selectedCurrencySell?.code || selectedCurrencySell?.title || "",
          type: "BANK",
          typeLabel: selectedBank?.name || "",
          value: currencySellAmount.value ? valueMask(roundTo8(currencySellAmount.value)) : "",
          position: "given",
          wayDetails: cardNumber.value
            ? { title: "Карта отправления", value: cardNumber.value }
            : undefined,
        },
      };
    } else if (selectedCurrencySellType === "CASH") {
      give = {
        title: "Я отдаю",
        rate: calculateRate({course: exchangeRate?.course || 0, currencyGive: selectedCurrencySell?.code || selectedCurrencySell?.title || "", currencyGet: selectedCurrencyBuy?.code || selectedCurrencyBuy?.title || ""}) as Rate,
        currency: {
          icon: findIcon("CASH", selectedCurrencySell?.code || selectedCurrencySell?.title || "") || "",
          name: selectedCurrencySell?.code || selectedCurrencySell?.title || "",
          type: "CASH",
          typeLabel: "Наличные",
          value: currencySellAmount.value ? valueMask(roundTo8(currencySellAmount.value)) : "",
          position: "given",
          wayDetails: selectedCity?.value?.title
            ? { title: "Город отправления", value: selectedCity.value.title }
            : undefined,
        },
      };
    }

    // "Я получаю"
    let receive: RequestDetailsProps | null = null;
    if (selectedCurrencyBuyType === "COIN") {
      receive = {
        title: "Я получаю",
        currency: {
          icon: findIcon("COIN", selectedCurrencyBuy?.code || selectedCurrencyBuy?.title || "") || "crypt.svg",
          name: selectedCurrencyBuy?.code || selectedCurrencyBuy?.title || "",
          type: "COIN",
          typeLabel: selectedNetwork?.name || "",
          value: currencyBuyAmount.value ? valueMask(roundTo8(currencyBuyAmount.value)) : "",
          position: "received",
          wayDetails: walletAddress.value
            ? { title: "Адрес получения", value: walletAddress.value }
            : undefined,
        },
      };
    } else if (selectedCurrencyBuyType === "BANK") {
      receive = {
        title: "Я получаю",
        currency: {
          icon: findIcon("BANK", selectedCurrencyBuy?.code || selectedCurrencyBuy?.title || "") || "",
          name: selectedCurrencyBuy?.code || selectedCurrencyBuy?.title || "",
          type: "BANK",
          typeLabel: selectedBank?.name || "",
          value: currencyBuyAmount.value ? valueMask(roundTo8(currencyBuyAmount.value)) : "",
          position: "received",
          wayDetails: cardNumber.value
            ? { title: "Карта получения", value: cardNumber.value }
            : undefined,
        },
      };
    } else if (selectedCurrencyBuyType === "CASH") {
      receive = {
        title: "Я получаю",
        currency: {
          icon: findIcon("CASH", selectedCurrencyBuy?.code || selectedCurrencyBuy?.title || "") || "",
          name: selectedCurrencyBuy?.code || selectedCurrencyBuy?.title || "",
          type: "CASH",
          typeLabel: "Наличные",
          value: currencyBuyAmount.value ? valueMask(roundTo8(currencyBuyAmount.value)) : "",
          position: "received",
          wayDetails: selectedCity?.value?.title
            ? { title: "Город получения", value: selectedCity.value.title }
            : undefined,
        },
      };
    }

    return [give, receive].filter(Boolean) as RequestDetailsProps[];
  }
);

export const selectExchangeCreateData = createSelector(
  (state: RootState) => state.exchange.selectedCurrencySellType,
  (state: RootState) => state.exchange.selectedCurrencyBuyType,
  (state: RootState) => state.exchange.exchangeRate,
  (state: RootState) => state.exchange.selectedCurrencySell,
  (state: RootState) => state.exchange.selectedCurrencyBuy,
  (state: RootState) => state.exchange.currencySellAmount,
  (state: RootState) => state.exchange.currencyBuyAmount,
  (state: RootState) => state.exchange.selectedCity,
  (state: RootState) => state.exchange.walletAddress,
  (state: RootState) => state.exchange.selectedBank,
  (state: RootState) => state.exchange.cardNumber,
  (state: RootState) => state.exchange.selectedNetwork,
  (state: RootState) => state.userData.userId,
  (state: RootState) => state.exchange.exchangeRate?.id,
  (
    selectedCurrencySellType,
    selectedCurrencyBuyType,
    exchangeRate,
    selectedCurrencySell,
    selectedCurrencyBuy,
    currencySellAmount,
    currencyBuyAmount,
    selectedCity,
    walletAddress,
    selectedBank,
    cardNumber,
    selectedNetwork,
    userId,
    exchangeRateId
  ): CreateExchangeParams => {
    return {
      currency_give: getCurrencyTitle({currency: selectedCurrencySell, network: selectedNetwork.value, currencyType: selectedCurrencySellType, bank: selectedBank.value}),
      amount_give: currencySellAmount.value ,
      currency_get: getCurrencyTitle({currency: selectedCurrencyBuy, network: selectedNetwork.value, currencyType: selectedCurrencyBuyType, bank: selectedBank.value}),
      amount_get: currencyBuyAmount.value,
      course: exchangeRate?.course,
      direction: exchangeRate?.direction,
      course_title: exchangeRate?.course_title,
      city: selectedCity?.value?.title,
      get_to: selectedCurrencyBuyType === "BANK" ? cardNumber.value : walletAddress.value,
      user_id: userId,
      direction_id: exchangeRateId
    };
  }
); 

const getCurrencyTitle = ({currency, network, currencyType, bank}: {currency: GroupedCurrency | null, network: ExchangeNetwork | null, currencyType: CurrencyType | null, bank: ExchangeBank | null}) => {
  if (currency?.directions.length === 0) {
    return currency?.title;
  }
  if (currencyType === "COIN") {
    return network?.title;
  }
  if (currencyType === "BANK") {
    return bank?.title;
  }
  return currency?.title;
}

