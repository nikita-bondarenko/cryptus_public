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

    const memoizedSelector = useMemo(
      () => selectSectionHeadingProps(position),
      [position]
    );
    const sectionHeadingProps = useAppSelector(memoizedSelector);
    const onSelectChange = useCallback((option: CurrencyOption) => {
      setSelectedCurrency(option);
    }, []);

    const onInputChange = useCallback((value: number | null) => {
      dispatch(setActiveInputType("crypto"));
      setValue(value);
    }, []);

    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(
        setCryptoInput({
          amountValue: value,
          currency: selectedCurrency,
          netValue: selectedNet,
          walletAddressValue: walletAddress,
        })
      );
    }, [value, walletAddress, selectedCurrency, selectedNet]);

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

    const placeholder = usePlaceholder(position);
    return (
      <div className="">
        <div className="mb-[22px]">
          <SectionHeading {...sectionHeadingProps}></SectionHeading>
          <CurrencyInput
            placeholder={placeholder}
            inputValue={globalStateValue}
            onInputChange={onInputChange}
            onSelectChange={onSelectChange}
            selectValue={selectedCurrency}
            options={currencyOptions}
          ></CurrencyInput>
        </div>
        <div>
          <SectionHeading title={"Выберите сеть"}></SectionHeading>
          <CryptoNetSelect
            onChange={setSelectedNet}
            value={selectedNet}
            options={netsOptions}
          ></CryptoNetSelect>
        </div>
        {position === "received" && (
          <input
            className="border-[1px] shimmer-on-loading mt-[20px] border-[#dedede] rounded-[6px] bg-white text-[13px] leading-[107%] px-[18px] py-[15px] w-full"
            type="text"
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder={`Адрес кошелька в сети ${selectedNet?.name}`}
          />
        )}
      </div>
    );
  }
);

ExchangeInputCrypto.displayName = "ExchangeInputCrypto";

export default ExchangeInputCrypto;
