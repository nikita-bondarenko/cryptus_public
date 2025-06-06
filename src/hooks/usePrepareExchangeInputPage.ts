import { banksList } from "@/data/banksList";
import { cityList } from "@/data/cityList";
import { cryptoCurrencyList } from "@/data/cryptoCurrencyList";
import { cryptoNets } from "@/data/cryptoNets";
import { nonCryptoCurrencyList } from "@/data/nonCryptoCurrencyList";
import { useAppDispatch } from "@/redux/hooks";
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
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
console.log('usePrepareExchangeInputPage')
    dispatch(setFetchedData(fetchedDataPayload));
    setTimeout(()=> {
        setIsLoading(false)
    }, 1000)
  }, []);
  return [isLoading];
};
