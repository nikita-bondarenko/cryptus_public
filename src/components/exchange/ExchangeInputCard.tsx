import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ExchangeInputProps } from "./ExchangeInputCrypto";
import {
  formatWithSpacesCardNumber,
  normalizeInput,
} from "@/helpers/valueMask";
import CurrencyInput from "./CurrencyInput";
import { CurrencyOption } from "./CurrencySelect";
import Select, { SelectOption } from "./Select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectSectionHeadingProps } from "@/redux/selectors";
import {
  setActiveInputType,
  setCardInput,
} from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { usePlaceholder } from "@/hooks/usePlaceholder";
import Icon from "../helpers/Icon";
import clsx from "clsx";
import { nonCryptoCurrencyList } from "@/data/nonCryptoCurrencyList";
import SectionHeading from "../ui/SectionHeading";

export type ExchangeInputCardProps = ExchangeInputProps;

const ExchangeInputCard: React.FC<ExchangeInputCardProps> = memo(
  ({ position }) => {
    const [value, setValue] = useState<number | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(nonCryptoCurrencyList[0]);
    const [bank, setBank] = useState<SelectOption | null>(null);
    const [cardNumber, setCardNumber] = useState<string>("");
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const dispatch = useAppDispatch();

    const { selectedGiveType, selectedReceieveType } = useAppSelector(
      (state) => state.exchangeType
    );

    useEffect(() => {
      setIsInitialLoad(true);
    }, [selectedGiveType, selectedReceieveType]);

    const onSelectChange = useCallback((option: CurrencyOption) => {
      dispatch(setActiveInputType("card"));
      setSelectedCurrency(option);
    }, [dispatch]);

    const onInputChange = useCallback((value: number | null) => {
      dispatch(setActiveInputType("card"));
      setValue(value);
    }, [dispatch]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
      const isNumber = /^[0-9]$/.test(e.key);

      if (!isNumber && !allowed.includes(e.key)) {
        e.preventDefault();
      }
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setActiveInputType("card"));
      const raw = normalizeInput(e.target.value);
      setCardNumber(formatWithSpacesCardNumber(raw));
    };

    const memoizedSelector = useMemo(
      () => selectSectionHeadingProps(position),
      [position]
    );
    const sectionHeadingProps = useAppSelector(memoizedSelector);

    useEffect(() => {
      if (isInitialLoad) {
        setIsInitialLoad(false);
        return;
      }

      dispatch(
        setCardInput({
          amountValue: value,
          currency: selectedCurrency as CurrencyOption,
          bankValue: bank,
          cardNumberValue: cardNumber,
        })
      );
    }, [value, selectedCurrency, bank, cardNumber, isInitialLoad, dispatch]);

    useEffect(() => {
      return () => {
        setIsInitialLoad(true);
      };
    }, []);

    const currencyOptions = useAppSelector(
      (state) => state.exchangeInput.options.nonCryptoCurrencyOptions
    );

    useEffect(() => {
      setSelectedCurrency(currencyOptions[0]);
    }, [currencyOptions]);

    const bankOptions = useAppSelector(
      (state) => state.exchangeInput.options.bankOptions
    );
    useEffect(() => {
      setBank(null);
    }, [bankOptions]);

    const globalStateValue = useAppSelector(
      (state) => state.exchangeInput.cardInput.amount.value
    );

    useEffect(() => {
      setValue(globalStateValue);
    }, [globalStateValue]);

    const valueError = useAppSelector(
      (state) => state.exchangeInput.cardInput.amount.error
    );

    const bankError = useAppSelector(
      (state) => state.exchangeInput.cardInput.bank.error
    );

    const cardNumberError = useAppSelector(
      (state) => state.exchangeInput.cardInput.cardNumber.error
    );

    const areErrorsVisible = useAppSelector(
      (state) => state.exchangeInput.areErrorsVisible
    );

    const placeholder = usePlaceholder(position);

    return (
      <div className="flex flex-col gap-13">
        <div className="">
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
            error={!!valueError && areErrorsVisible && position === "given"}
          ></CurrencyInput>
        </div>
        <Select
          value={bank}
          options={bankOptions}
          onChange={(option) => {
            dispatch(setActiveInputType("card"));
            setBank(option);
          }}
          placeholder="Выберите банк получения"
          error={bankError && areErrorsVisible ? bankError : null}
        ></Select>
        {position === "received" && (
          <div className="relative pb-16 -mb-16">
            <input
              onChange={handleCardNumberChange}
              onKeyDown={handleKeyDown}
              value={cardNumber}
              type="text"
              className={clsx("shimmer-on-loading border border-[#E9E9E9] rounded-6 bg-white text-16 leading-[1.07] px-18 py-15 w-full", cardNumberError && areErrorsVisible ? "[&]:border-[#FF676A]" : ""  )}
              placeholder="Номер  карты"
            />
            {cardNumberError && areErrorsVisible && (
              <>
                <p className="absolute left-0 text-[#FF676A] text-13">
                  {cardNumberError}
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

ExchangeInputCard.displayName = "ExchangeInputCard";

export default ExchangeInputCard;
