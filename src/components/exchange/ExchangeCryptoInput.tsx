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
  selectCryptoCurrency,
  selectWalletAddressError,
  selectAreErrorsVisible,
} from "@/redux/selectors";
import {
  setActiveInputType,
  setCryptoCurrency,
  setCryptoNet,
  setCryptoWalletAddress,
} from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { usePlaceholder } from "@/hooks/usePlaceholder";
import SectionHeading from "../ui/SectionHeading";
import { InputWrapper } from "../ui/InputWrapper";
import { Input } from "../ui/Input";
import CryptoNetSelect, { CryptoNetOption } from "./CryptoNetSelect";
import { useExchangeInput } from "@/hooks/useExchangeInput";

export type ExchangeCryptoInputProps = {
  position: CurrencyPosition;
};

const ExchangeCryptoInput: React.FC<ExchangeCryptoInputProps> = memo(({ position }) => {
  const [selectedNet, setSelectedNet] = useState<CryptoNetOption | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  
  const dispatch = useAppDispatch();
  const {
    selectedCurrency,
    setSelectedCurrency,
    isInitialLoad,
    setIsInitialLoad,
    globalStateValue,
    valueError,
    areErrorsVisible,
    onSelectChange,
    onInputChange
  } = useExchangeInput("crypto");

  const sectionHeadingProps = useAppSelector(
    selectSectionHeadingProps(position)
  );

  const currencyOptions = useAppSelector(selectCurrencyOptions("crypto"));
  const netsOptions = useAppSelector(selectNetsOptions);
  const netValue = useAppSelector(selectNetValue);
  const walletAddressValue = useAppSelector(selectWalletAddressValue);
  const selectedCryptoCurrency = useAppSelector(selectCryptoCurrency);
  const walletAddressError = useAppSelector(selectWalletAddressError);

  const placeholder = usePlaceholder(position);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    if (!selectedCurrency) return;

    if (selectedCurrency.value !== selectedCryptoCurrency?.value) {
      dispatch(setCryptoCurrency(selectedCurrency));
    }
  }, [selectedCurrency, selectedCryptoCurrency, isInitialLoad, dispatch]);

  useEffect(() => {
    if (isInitialLoad) return;
    if (!selectedNet) return;
    if (selectedNet.value === netValue?.value) return;

    dispatch(setCryptoNet(selectedNet));
  }, [selectedNet, netValue, isInitialLoad, dispatch]);

  useEffect(() => {
    if (isInitialLoad) return;
    if (!walletAddress) return;
    if (walletAddress === walletAddressValue) return;

    dispatch(setCryptoWalletAddress(walletAddress));
  }, [walletAddress, walletAddressValue, isInitialLoad, dispatch]);

  useEffect(() => {
    if (selectedNet !== netValue) {
      setSelectedNet(netValue as CryptoNetOption);
    }
  }, [netValue]);

  useEffect(() => {
    if (walletAddress !== walletAddressValue) {
      setWalletAddress(walletAddressValue);
    }
  }, [walletAddressValue]);

  useEffect(() => {
    if (JSON.stringify(selectedCurrency) !== JSON.stringify(selectedCryptoCurrency)) {
      setSelectedCurrency(selectedCryptoCurrency);
    }
  }, [selectedCryptoCurrency, selectedCurrency, setSelectedCurrency]);

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

      <div className="mt-13">
        <SectionHeading title="Выберите сеть" />
        <CryptoNetSelect
          onChange={(net) => {
            dispatch(setActiveInputType("crypto"));
            setSelectedNet(net);
          }}
          value={netValue as CryptoNetOption}
          options={netsOptions || []}
        />
      </div>
      {position === "received" && (
        <div className="mt-20">
          <InputWrapper error={walletAddressError && areErrorsVisible ? walletAddressError : null}>
            <Input
              className="border  border-neutral-gray-200 rounded-6 bg-neutral-white text-16 leading-normal px-18 py-15 pr-30 w-full"
              type="text"
              onChange={(e) => {
                dispatch(setActiveInputType("crypto"));
                setWalletAddress(e.target.value);
              }}
              value={walletAddress ?? ""}
              placeholder={`Адрес кошелька в сети ${selectedNet?.name}`}
            />
          </InputWrapper>
        </div>
      )}
    </div>
  );
});

ExchangeCryptoInput.displayName = "ExchangeCryptoInput";

export default ExchangeCryptoInput; 