import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { CurrencyPosition } from "../request/RequestDetails";
import CurrencyInput from "./CurrencyInput";
import { CurrencyOption } from "./CurrencySelect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectSectionHeadingProps } from "@/redux/selectors";
import {
  setActiveInputType,
  setCardInput,
  setCashInput,
  setCryptoInput,
} from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { usePlaceholder } from "@/hooks/usePlaceholder";
import SectionHeading from "../ui/SectionHeading";
import { InputWrapper } from "../ui/InputWrapper";
import { Input } from "../ui/Input";
import BankSelect, { BankOption } from "./BankSelect";
import CitySelect from "./CitySelect";
import CryptoNetSelect, { CryptoNetOption } from "./CryptoNetSelect";
import { formatWithSpacesCardNumber, normalizeInput } from "@/helpers/valueMask";
import { ExchangeInputState, CryptoInput, CashInput, CardInput } from "@/redux/slices/exchangeInput/types";

export type ExchangeInputProps = {
  position: CurrencyPosition;
  type: "card" | "cash" | "crypto";
};

const ExchangeInput: React.FC<ExchangeInputProps> = memo(({ position, type }) => {
  const [value, setValue] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption | null>(null);
  const [bank, setBank] = useState<BankOption | null>(null);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [selectedNet, setSelectedNet] = useState<CryptoNetOption | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const dispatch = useAppDispatch();

  const { selectedGiveType, selectedReceieveType } = useAppSelector(
    (state) => state.exchangeType
  );

  const sectionHeadingProps = useAppSelector(
    useMemo(() => selectSectionHeadingProps(position), [position])
  );

  const currencyOptions = useAppSelector(
    (state) => {
      switch (type) {
        case "crypto":
          return state.exchangeInput.options.cryptoCurrencyOptions;
        case "card":
        case "cash":
          return state.exchangeInput.options.nonCryptoCurrencyOptions;
        default:
          return [];
      }
    }
  );

  const bankOptions = useAppSelector(
    (state) => state.exchangeInput.options.bankOptions
  );

  const cityOptions = useAppSelector(
    (state) => state.exchangeInput.options.cityOptions
  );

  const netsOptions = useAppSelector(
    (state) => state.exchangeInput.options.netsOptions
  );

  const globalStateValue = useAppSelector(
    (state) => {
      const input = state.exchangeInput[`${type}Input` as keyof ExchangeInputState] as CryptoInput | CashInput | CardInput;
      return input?.amount.value ?? null;
    }
  );

  const valueError = useAppSelector(
    (state) => {
      const input = state.exchangeInput[`${type}Input` as keyof ExchangeInputState] as CryptoInput | CashInput | CardInput;
      return input?.amount.error ?? null;
    }
  );

  const bankError = useAppSelector(
    (state) => state.exchangeInput.cardInput.bank.error
  );

  const cardNumberError = useAppSelector(
    (state) => state.exchangeInput.cardInput.cardNumber.error
  );

  const cityError = useAppSelector(
    (state) => state.exchangeInput.cashInput.city.error
  );

  const walletAddressError = useAppSelector(
    (state) => state.exchangeInput.cryptoInput.walletAddress.error
  );

  const areErrorsVisible = useAppSelector(
    (state) => state.exchangeInput.areErrorsVisible
  );

  const placeholder = usePlaceholder(position);

  const onSelectChange = useCallback((option: CurrencyOption) => {
    dispatch(setActiveInputType(type));
    setSelectedCurrency(option);
  }, [dispatch, type]);

  const onInputChange = useCallback((value: number | null) => {
    dispatch(setActiveInputType(type));
    setValue(value);
  }, [dispatch, type]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    const isNumber = /^[0-9]$/.test(e.key);

    if (!isNumber && !allowed.includes(e.key)) {
      e.preventDefault();
    }
  }, []);

  const handleCardNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setActiveInputType("card"));
    const raw = normalizeInput(e.target.value);
    setCardNumber(formatWithSpacesCardNumber(raw));
  }, [dispatch]);

  useEffect(() => {
    setIsInitialLoad(true);
  }, [selectedGiveType, selectedReceieveType]);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    switch (type) {
      case "card":
        dispatch(
          setCardInput({
            amountValue: value,
            currency: selectedCurrency as CurrencyOption,
            bankValue: bank,
            cardNumberValue: cardNumber,
          })
        );
        break;
      case "cash":
        dispatch(
          setCashInput({
            amountValue: value,
            currency: selectedCurrency as CurrencyOption,
            cityValue: city,
          })
        );
        break;
      case "crypto":
        dispatch(
          setCryptoInput({
            amountValue: value,
            currency: selectedCurrency as CurrencyOption,
            netValue: selectedNet as CryptoNetOption,
            walletAddressValue: walletAddress,
          })
        );
        break;
    }
  }, [value, selectedCurrency, bank, cardNumber, city, selectedNet, walletAddress, isInitialLoad, dispatch, type]);

  useEffect(() => {
    return () => {
      setIsInitialLoad(true);
    };
  }, []);

  const nonCryptoCurrencyOptions = useAppSelector(
    (state) => state.exchangeInput.options.nonCryptoCurrencyOptions
  );

  const cryptoCurrencyOptions = useAppSelector(
    (state) => state.exchangeInput.options.cryptoCurrencyOptions
  );

  useEffect(() => {
    if (type === "card") {
      setBank(null);
      if (nonCryptoCurrencyOptions[0]) {
        setSelectedCurrency(nonCryptoCurrencyOptions[0]);
      }
    } else if (type === "cash") {
      setCity("");
      if (nonCryptoCurrencyOptions[0]) {
        setSelectedCurrency(nonCryptoCurrencyOptions[0]);
      }
    } else if (type === "crypto" && netsOptions?.[0]) {
      setSelectedNet(netsOptions[0]);
      if (cryptoCurrencyOptions[0]) {
        setSelectedCurrency(cryptoCurrencyOptions[0]);
      }
    }
  }, [type, bankOptions, cityOptions, netsOptions, nonCryptoCurrencyOptions, cryptoCurrencyOptions]);

  useEffect(() => {
    setValue(globalStateValue);
  }, [globalStateValue]);

  return (
    <div className="flex flex-col ">
      <div className="">
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
          options={currencyOptions}
          error={!!valueError && areErrorsVisible }
        />
      </div>

      {type === "card" && (
        <>
          <BankSelect
            value={bank}
            options={bankOptions}
            onChange={(option) => {
              dispatch(setActiveInputType("card"));
              setBank(option);
            }}
            placeholder="Выберите банк получения"
            error={bankError && areErrorsVisible ? bankError : null}
          />
          {position === "received" && (
            <div className="-mb-16">
              <InputWrapper error={cardNumberError && areErrorsVisible ? cardNumberError : null}>
                <Input
                  onChange={handleCardNumberChange}
                  onKeyDown={handleKeyDown}
                  value={cardNumber}
                  type="text"
                  className="shimmer-on-loading border border-neutral-gray-200 rounded-6 bg-neutral-white text-16 leading-normal px-18 py-15 w-full"
                  placeholder="Номер карты"
                />
              </InputWrapper>
            </div>
          )}
        </>
      )}

      {type === "cash" && (
        <CitySelect
          value={city}
          options={cityOptions}
          onChange={(option) => {
            dispatch(setActiveInputType("cash"));
            setCity(option);
          }}
          placeholder="Выберите город получения"
          placeholderFocused="Введите название города"
          error={cityError && areErrorsVisible ? cityError : null}
        />
      )}

      {type === "crypto" && (
        <>
          <div className="mt-13">
            <SectionHeading title="Выберите сеть" />
            <CryptoNetSelect
              onChange={(net) => {
                dispatch(setActiveInputType("crypto"));
                setSelectedNet(net);
              }}
              value={selectedNet as CryptoNetOption}
              options={netsOptions}
            />
          </div>
          {position === "received" && (
            <div className="mt-20">
              <InputWrapper error={walletAddressError && areErrorsVisible ? walletAddressError : null}>
                <Input
                  className="border shimmer-on-loading border-neutral-gray-200 rounded-6 bg-neutral-white text-16 leading-normal px-18 py-15 pr-30 w-full"
                  type="text"
                  onChange={(e) => {
                    dispatch(setActiveInputType("crypto"));
                    setWalletAddress(e.target.value);
                  }}
                  value={walletAddress}
                  placeholder={`Адрес кошелька в сети ${selectedNet?.name}`}
                />
              </InputWrapper>
            </div>
          )}
        </>
      )}
    </div>
  );
});

ExchangeInput.displayName = "ExchangeInput";

export default ExchangeInput; 