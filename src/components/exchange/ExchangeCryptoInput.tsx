import React, { memo, useEffect, useState } from "react";
import { CurrencyPosition } from "../request/RequestDetails";
import CurrencyInput from "./CurrencyInput";
import { CurrencyOption } from "./CurrencySelect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectSectionHeadingProps,
  selectCurrencyOptions,
  selectNetsOptions,
  selectNetValue,
  selectWalletAddressValue,
  selectWalletAddressError,
  selectAreErrorsVisible,
  selectCurrency,
} from "@/redux/selectors";

import { usePlaceholder } from "@/hooks/usePlaceholder";
import SectionHeading from "../ui/SectionHeading";
import { InputWrapper } from "../ui/InputWrapper";
import { Input } from "../ui/Input";
import CryptoNetSelect, { CryptoNetOption } from "./CryptoNetSelect";
import { useExchangeInput } from "@/hooks/useExchangeInput";
import { setSelectedCurrencySell, setSelectedCurrencyBuy, setActiveInputType, setSelectedNetworkValue, setWalletAddressValue } from "@/redux/slices/exchangeSlice/exchangeSlice";

export type ExchangeCryptoInputProps = {
  position: CurrencyPosition;
};

const ExchangeCryptoInput: React.FC<ExchangeCryptoInputProps> = memo(({ position }) => {
  const dispatch = useAppDispatch();
  const {
    selectedCurrency,
    isInitialLoad,
    setIsInitialLoad,
    globalStateValue,
    valueError,
    areErrorsVisible,
    onSelectChange,
    onInputChange
  } = useExchangeInput(position);

  const sectionHeadingProps = useAppSelector(
    selectSectionHeadingProps(position)
  );

  const currencyOptions = useAppSelector(selectCurrencyOptions(position));
 
  const netsOptions = useAppSelector(selectNetsOptions);
  const networks = useAppSelector(state => state.exchange.networks);
  const netValue = useAppSelector(selectNetValue);
  const walletAddressValue = useAppSelector(selectWalletAddressValue);
  const walletAddressError = useAppSelector(selectWalletAddressError);

  const placeholder = usePlaceholder(position);

  // Обработка изменения валюты
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

 
  }, []);

  // Синхронизация с глобальным состоянием валюты


  const handleNetChange = (net: CryptoNetOption) => {
    const network = networks?.find((network) => network.id === net.value);
    if (network) {
      dispatch(setSelectedNetworkValue(network));
    }
  };

  const handleWalletAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setWalletAddressValue(e.target.value));
  };

  return (
    <div className="flex flex-col">
      <div>
        <SectionHeading
          {...sectionHeadingProps}
          error={!!valueError && areErrorsVisible}
        />
        <CurrencyInput
          placeholder={placeholder}
          inputValue={globalStateValue}
          onInputChange={onInputChange}
          onSelectChange={onSelectChange}
          selectValue={selectedCurrency as CurrencyOption}
          options={currencyOptions || []}
          error={!!valueError && areErrorsVisible}
        />
      </div>

      {netsOptions.length > 0 && (
        <div className="mt-13">
          <SectionHeading title="Выберите сеть" />
          <CryptoNetSelect
            onChange={handleNetChange}
            value={netValue as CryptoNetOption}
            options={netsOptions || []}
          />
        </div>
      )}
      
      {position === "received" && (
        <div className="mt-20">
          <InputWrapper error={walletAddressError && areErrorsVisible ? walletAddressError : null}>
            <Input
              className="border border-neutral-gray-200 rounded-6 bg-neutral-white text-16 leading-normal px-18 py-15 pr-30 w-full"
              type="text"
              onChange={handleWalletAddressChange}
              value={walletAddressValue ?? ""}
              placeholder={`Адрес кошелька в сети ${netValue?.name}`}
            />
          </InputWrapper>
        </div>
      )}
    </div>
  );
});

ExchangeCryptoInput.displayName = "ExchangeCryptoInput";

export default ExchangeCryptoInput; 