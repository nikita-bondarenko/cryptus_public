import {
  setAutomaticlyCardInputAmountValue,
  setAutomaticlyCashInputAmountValue,
  setCardInputAmountValue,
  setCashInputAmountValue,
} from "../slices/exchangeInput/exchangeInputSlice";
import { DispatchProps } from "./dispatchCrypto";
import { translateCurrencyValue } from "./translateCurrencyValue";

export const dispatchNonCrypto = ({
  selectedGiveType,
  selectedReceiveType,
  dispatch,
  value,
  rate,
}: DispatchProps) => {

    // // console.log("rate", rate);
  if (selectedGiveType === "COIN") {
    if (selectedReceiveType === "BANK") {
      // // console.log("selectedReceiveType", selectedReceiveType);
      const translatedValue = translateCurrencyValue({
        value,
        rate,
        position: "received",
      });
      // // console.log("translatedValue", translatedValue);
      dispatch(setAutomaticlyCardInputAmountValue(translatedValue));
    } else {
      dispatch(
        setAutomaticlyCashInputAmountValue(
          translateCurrencyValue({ value, rate, position: "received" })
        )
      );
    }
  } else {
    if (selectedGiveType === "BANK") {
      dispatch(
        setAutomaticlyCardInputAmountValue(
          translateCurrencyValue({ value, rate, position: "given" })
        )
      );
    } else {
      dispatch(
        setAutomaticlyCashInputAmountValue(
          translateCurrencyValue({ value, rate, position: "given" })
        )
      );
    }
  }
};
