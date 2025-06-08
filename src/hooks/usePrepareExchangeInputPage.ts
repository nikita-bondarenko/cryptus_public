import { useGetCurrenciesSellQuery } from "@/api/api";
import { banksList } from "@/data/banksList";
import { cityList } from "@/data/cityList";
import { cryptoCurrencyList } from "@/data/cryptoCurrencyList";
import { cryptoNets } from "@/data/cryptoNets";
import { nonCryptoCurrencyList } from "@/data/nonCryptoCurrencyList";
import { calculateCurrencyTypeForFetching } from "@/helpers/calculateCurrencyTypeForFetching";
import { translateCurrencies } from "@/helpers/translateCurrencies";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrencyTypes } from "@/redux/selectors";
import { setFetchedData } from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { SetFetchedDataActionPayload } from "@/redux/slices/exchangeInput/types";
import { useEffect, useState } from "react";

export     const fetchedDataPayload: SetFetchedDataActionPayload = {
  rate: {
    from: {
      value: 1,
      name: "USDT",
      type: "crypto",
    },
    to: {
      value: 81.69,
      name: "RUB",
      type: "cash",
    },
  },
  options: {
    netsOptions: cryptoNets,
    bankOptions: banksList,
    cityOptions: cityList,
    cryptoCurrencyOptions: cryptoCurrencyList,
    nonCryptoCurrencyOptions: nonCryptoCurrencyList,
  },
};

export const usePrepareExchangeInputPage = () => {

  const dispatch = useAppDispatch();
  const {givenType} = useAppSelector(selectCurrencyTypes)
const {data: currenciesGiven} = useGetCurrenciesSellQuery(calculateCurrencyTypeForFetching(givenType))
console.log(currenciesGiven)



  useEffect(() => {
if (currenciesGiven) {
  const currenciesGivenOptions = translateCurrencies(currenciesGiven)
 }

    dispatch(setFetchedData(fetchedDataPayload));
  

  }, [currenciesGiven]);
};
