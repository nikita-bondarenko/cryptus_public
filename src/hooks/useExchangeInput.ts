import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectInputValue,
  selectValueError,
  selectAreErrorsVisible,
  selectCurrencyTypes
} from "@/redux/selectors";
import {
  setActiveInputType,
  setCardInputAmountValue,
  setCashInputAmountValue,
  setCryptoInputAmountValue,
} from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { CurrencyOption } from "@/components/exchange/CurrencySelect";

export type ExchangeInputType = "card" | "cash" | "crypto";

export const useExchangeInput = (type: ExchangeInputType) => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const dispatch = useAppDispatch();
  const { givenType, receivedType } = useAppSelector(selectCurrencyTypes);
  const globalStateValue = useAppSelector(selectInputValue(type));
  const valueError = useAppSelector(selectValueError(type));
  const areErrorsVisible = useAppSelector(selectAreErrorsVisible);

  const onSelectChange = useCallback((option: CurrencyOption) => {
    dispatch(setActiveInputType(type));
    setSelectedCurrency(option);
  }, [dispatch, type]);

  const onInputChange = useCallback((value: number | null) => {
    dispatch(setActiveInputType(type));
    switch (type) {
      case "card":
        dispatch(setCardInputAmountValue(value));
        break;
      case "cash":
        dispatch(setCashInputAmountValue(value));
        break;
      case "crypto":
        dispatch(setCryptoInputAmountValue(value));
        break;
    }
  }, [dispatch, type]);

  useEffect(() => {
    setIsInitialLoad(true);
  }, [givenType, receivedType]);

  useEffect(() => {
    setIsInitialLoad(true);
  }, [type]);

  return {
    selectedCurrency,
    setSelectedCurrency,
    isInitialLoad,
    setIsInitialLoad,
    globalStateValue,
    valueError,
    areErrorsVisible,
    onSelectChange,
    onInputChange
  };
}; 