import { CurrencyType } from "@/components/request/RequestDetails";
import { setAutomaticlyCryptoInputAmountValue, setCryptoInputAmountValue } from "../slices/exchangeInput/exchangeInputSlice";
import { Rate } from "../slices/exchangeInput/types";
import { AppDispatch } from "../store";
import { roundTo8 } from "./roundTo8";
import { translateCurrencyValue } from "./translateCurrencyValue";

export type DispatchProps = {
  selectedGiveType: CurrencyType;
  selectedReceiveType: CurrencyType;
  dispatch: AppDispatch;
  value: number;
  rate: Rate;
};

 
 export const dispatchCrypto = ({
    selectedGiveType,
    dispatch,
    value,
    rate,
  }: DispatchProps) => {
    if (selectedGiveType === "crypto") {
      dispatch(
        setAutomaticlyCryptoInputAmountValue(
          roundTo8(translateCurrencyValue({ value, rate, position: "given" }))
        )
      );
    } else {
      dispatch(
        setAutomaticlyCryptoInputAmountValue(
          roundTo8(translateCurrencyValue({ value, rate, position: "received" }))
        )
      );
    }
  };