import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { CurrencyPosition } from "../request/RequestDetails";
import CurrencyInput from "./CurrencyInput";
import CryptoNetSelect, { CryptoNetOption } from "./CryptoNetSelect";
import { cryptoCurrencyList } from "@/data/cryptoCurrencyList";
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
import { CurrencyOption } from "./CurrencySelect";
import SectionHeading from "../ui/SectionHeading";

export type ExchangeInputProps = {
  position: CurrencyPosition;
};

export type ExchangeInputCryptoProps = ExchangeInputProps;

const ExchangeInputCrypto: React.FC<ExchangeInputCryptoProps> = memo(
  ({ position }) => {
    const [value, setValue] = useState<number | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(
      cryptoCurrencyList[0]
    );
    const [walletAddress, setWalletAddress] = useState("");

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
    }, [value, walletAddress, selectedCurrency, selectedNet, isInitialLoad, dispatch]);

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

    const walletAddressError = useAppSelector(
      (state) => state.exchangeInput.cryptoInput.walletAddress.error
    );

    const areErrorsVisible = useAppSelector(
      (state) => state.exchangeInput.areErrorsVisible
    );

    const placeholder = usePlaceholder(position);
    return (
      <div className="">
        <div className="mb-22">
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
        {position === "received" && (
          <div className="relative pb-16 -mb-16 mt-20">
            <input
              className={clsx("border shimmer-on-loading border-[#E9E9E9] rounded-6 bg-white text-16 leading-[1.07] px-18 py-15 pr-30 w-full", walletAddressError && areErrorsVisible ? "[&]:border-[#FF676A]" : ""  )}
              type="text"
              onChange={(e) => {
                dispatch(setActiveInputType("crypto"));
                setWalletAddress(e.target.value);
              }}
              placeholder={`Адрес кошелька в сети ${selectedNet?.name}`}
            />
            {walletAddressError && areErrorsVisible && (
              <>
                <p className="absolute left-0 text-[#FF676A] text-12 bottom-0">
                  {walletAddressError}
                </p>
                <Icon
                  src="alert.svg"
                  className="w-16 h-16 absolute right-12 top-14"
                ></Icon>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
);

ExchangeInputCrypto.displayName = "ExchangeInputCrypto";

export default ExchangeInputCrypto;
