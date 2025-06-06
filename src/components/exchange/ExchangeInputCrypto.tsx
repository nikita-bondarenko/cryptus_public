import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { CurrencyPosition } from "../request/RequestDetails";
import SectionHeading, { SectionHeadingProps } from "../ui/SectionHeading";
import CurrencyInput from "./CurrencyInput";
import CurrencySelect, { CurrencyOption } from "./CurrencySelect";
import { cryptoCurrencyList } from "@/data/cryptoCurrencyList";
import { valueMask } from "@/helpers/valueMask";
import CryptoNetSelect, { CryptoNetOption } from "./CryptoNetSelect";
import { cryptoNets } from "@/data/cryptoNets";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectSectionHeadingProps } from "@/redux/selectors";
import {
  setActiveInputType,
  setCryptoInput,
} from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { usePlaceholder } from "@/hooks/usePlaceholder";
import Icon from "../helpers/Icon";
import clsx from "clsx";
import BaseInput from '../common/BaseInput';

export type ExchangeInputProps = {
  position: CurrencyPosition;
};

export type ExchangeInputCryptoProps = ExchangeInputProps & {
  walletAddress: string;
  onWalletAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  walletAddressError?: boolean;
  areErrorsVisible?: boolean;
};

const ExchangeInputCrypto: React.FC<ExchangeInputCryptoProps> = memo(
  ({ position, walletAddress, onWalletAddressChange, walletAddressError = false, areErrorsVisible = false }) => {
    const [value, setValue] = useState<number | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(
      cryptoCurrencyList[0]
    );
    const [selectedNet, setSelectedNet] = useState<CryptoNetOption>(
      cryptoNets[0]
    );
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const memoizedSelector = useMemo(
      () => selectSectionHeadingProps(position),
      [position]
    );
    const sectionHeadingProps = useAppSelector(memoizedSelector);
    const dispatch = useAppDispatch();

    const { selectedGiveType, selectedReceieveType } = useAppSelector(
      (state) => state.exchangeType
    );

    useEffect(() => {
      setIsInitialLoad(true);
    }, [selectedGiveType, selectedReceieveType]);

    const onSelectChange = useCallback((option: CurrencyOption) => {
      dispatch(setActiveInputType("crypto"));
      setSelectedCurrency(option);
    }, [dispatch]);

    const onInputChange = useCallback((value: number | null) => {
      dispatch(setActiveInputType("crypto"));
      setValue(value);
    }, [dispatch]);

    useEffect(() => {
      if (isInitialLoad) {
        setIsInitialLoad(false);
        return;
      }

      dispatch(
        setCryptoInput({
          amountValue: value,
          currency: selectedCurrency,
          netValue: selectedNet,
          walletAddressValue: walletAddress,
        })
      );
    }, [value, walletAddress, selectedCurrency, selectedNet, isInitialLoad]);

    useEffect(() => {
      return () => {
        setIsInitialLoad(true);
      };
    }, []);

    const currencyOptions = useAppSelector(
      (state) => state.exchangeInput.options.cryptoCurrencyOptions
    );

    useEffect(() => {
      setSelectedCurrency(currencyOptions[0]);
    }, [currencyOptions]);

    const netsOptions = useAppSelector(
      (state) => state.exchangeInput.options.netsOptions
    );

    useEffect(() => {
      setSelectedCurrency(currencyOptions[0]);
    }, [currencyOptions]);

    useEffect(() => {
      setSelectedNet(netsOptions[0]);
    }, [netsOptions]);

    const globalStateValue = useAppSelector(
      (state) => state.exchangeInput.cryptoInput.amount.value
    );

    useEffect(() => {
      setValue(globalStateValue);
    }, [globalStateValue]);

    const valueError = useAppSelector(
      (state) => state.exchangeInput.cryptoInput.amount.error
    );

    const placeholder = usePlaceholder(position);
    return (
      <div className="">
        <div className="mb-[22px]">
          <SectionHeading
            {...sectionHeadingProps}
            error={!!valueError && areErrorsVisible}
          ></SectionHeading>
          <CurrencyInput
            placeholder={placeholder}
            inputValue={globalStateValue}
            onInputChange={onInputChange}
            onSelectChange={onSelectChange}
            selectValue={selectedCurrency}
            options={currencyOptions}
            error={!!valueError && areErrorsVisible}
          ></CurrencyInput>
        </div>
        <div>
          <SectionHeading title={"Выберите сеть"}></SectionHeading>
          <CryptoNetSelect
            onChange={(net) => {
              dispatch(setActiveInputType("crypto"));
              setSelectedNet(net);
            }}
            value={selectedNet}
            options={netsOptions}
          ></CryptoNetSelect>
        </div>
        <div className="relative pb-[14px] mb-[-14px] mt-[20px]">
          <BaseInput
            value={walletAddress}
            onChange={onWalletAddressChange}
            placeholder="Адрес кошелька"
            error={walletAddressError}
            areErrorsVisible={areErrorsVisible}
          />
        </div>
      </div>
    );
  }
);

ExchangeInputCrypto.displayName = "ExchangeInputCrypto";

export default ExchangeInputCrypto;
