import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { CurrencyPosition } from "../request/RequestDetails";
import CurrencyInput from "./CurrencyInput";
import { CurrencyOption } from "./CurrencySelect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectSectionHeadingProps } from "@/redux/selectors";
import {
  setActiveInputType,
  setCardInputAmountValue,
  setCashInputAmountValue,
  setCryptoInputAmountValue,
  setCardCurrency,
  setCardBank,
  setCardNumber as setCardNumberAction,
  setCashCurrency,
  setCashCity,
  setCryptoCurrency,
  setCryptoNet,
  setCryptoWalletAddress,
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
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption | null>(null);
  const [bank, setBank] = useState<BankOption | null>(null);
  const [cardNumber, setCardNumber] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
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

  const bankValue = useAppSelector(
    (state) => state.exchangeInput.cardInput.bank.value
  );
  const cityValue = useAppSelector(
    (state) => state.exchangeInput.cashInput.city.value
  );

  const cardNumberValue = useAppSelector(
    (state) => state.exchangeInput.cardInput.cardNumber.value
  );

  const netValue = useAppSelector(
    (state) => state.exchangeInput.cryptoInput.net.value
  );

  const walletAddressValue = useAppSelector(
    (state) => state.exchangeInput.cryptoInput.walletAddress.value
  );

  const selectedCardCurrency = useAppSelector(
    (state) => state.exchangeInput.cardInput.currency
  );

  const selectedCashCurrency = useAppSelector(
    (state) => state.exchangeInput.cashInput.currency
  );
  
  const selectedCryptoCurrency = useAppSelector(
    (state) => state.exchangeInput.cryptoInput.currency
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
    switch (type) {
        case "card":
          dispatch(setCardInputAmountValue(value))
          break;
        case "cash":
            dispatch(setCashInputAmountValue(value))
          break;
        case "crypto":
            dispatch(setCryptoInputAmountValue(value))
          break;
      }
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

    if (!selectedCurrency) return;

    switch (type) {
      case "card":
        if (selectedCurrency.value !== selectedCardCurrency?.value) {
          dispatch(setCardCurrency(selectedCurrency as CurrencyOption));
        }
        break;
      case "cash":
        if (selectedCurrency.value !== selectedCashCurrency?.value) {
          dispatch(setCashCurrency(selectedCurrency as CurrencyOption));
        }
        break;
      case "crypto":
        if (selectedCurrency.value !== selectedCryptoCurrency?.value) {
          dispatch(setCryptoCurrency(selectedCurrency as CurrencyOption));
        }
        break;
    }
  }, [selectedCurrency, selectedCardCurrency, selectedCashCurrency, selectedCryptoCurrency, isInitialLoad, dispatch, type]);

  useEffect(() => {
    if (isInitialLoad) return;
    if (type !== "card" || !bank) return;
    if (bank.value === bankValue?.value) return;

    dispatch(setCardBank(bank));
  }, [bank, bankValue, isInitialLoad, dispatch, type]);

  useEffect(() => {
    if (isInitialLoad) return;
    if (type !== "card" || !cardNumber) return;
    if (cardNumber === cardNumberValue) return;

    dispatch(setCardNumberAction(cardNumber));
  }, [cardNumber, cardNumberValue, isInitialLoad, dispatch, type]);

  useEffect(() => {
    if (isInitialLoad) return;
    if (type !== "cash" || !city) return;
    if (city === cityValue) return;

    dispatch(setCashCity(city));
  }, [city, cityValue, isInitialLoad, dispatch, type]);

  useEffect(() => {
    if (isInitialLoad) return;
    if (type !== "crypto" || !selectedNet) return;
    if (selectedNet.value === netValue?.value) return;

    dispatch(setCryptoNet(selectedNet as CryptoNetOption));
  }, [selectedNet, netValue, isInitialLoad, dispatch, type]);

  useEffect(() => {
    if (isInitialLoad) return;
    if (type !== "crypto" || !walletAddress) return;
    if (walletAddress === walletAddressValue) return;

    dispatch(setCryptoWalletAddress(walletAddress));
  }, [walletAddress, walletAddressValue, isInitialLoad, dispatch, type]);

  useEffect(() => {
    setIsInitialLoad(true);
  }, [type]);

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
    if (bank?.value !== bankValue?.value) {
      setBank(bankValue);
    }
  }, [bankValue]);

  useEffect(() => {
    if (city !== cityValue) {
      setCity(cityValue);
    }
  }, [cityValue]);

  useEffect(() => {
    if (cardNumber !== cardNumberValue) {
      setCardNumber(cardNumberValue);
    }
  }, [cardNumberValue]);

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
    if (JSON.stringify(selectedCurrency) !== JSON.stringify(selectedCardCurrency) && type === "card") {
      setSelectedCurrency(selectedCardCurrency as CurrencyOption);
    }
  }, [selectedCardCurrency]);

  useEffect(() => {
    if (JSON.stringify(selectedCurrency) !== JSON.stringify(selectedCashCurrency) && type === "cash") {
      setSelectedCurrency(selectedCashCurrency as CurrencyOption);
    }
  }, [selectedCashCurrency]);

  useEffect(() => {
    console.log("selectedCryptoCurrency", selectedCryptoCurrency, type, selectedCurrency);
    if (JSON.stringify(selectedCurrency) !== JSON.stringify(selectedCryptoCurrency) && type === "crypto") {
      setSelectedCurrency(selectedCryptoCurrency as CurrencyOption);
    }
  }, [selectedCryptoCurrency]);

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
            value={bankValue}
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
                  value={cardNumber ?? ""}
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
          value={cityValue ?? ""}
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
              value={netValue as CryptoNetOption}
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
                  value={walletAddress ?? ""}
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