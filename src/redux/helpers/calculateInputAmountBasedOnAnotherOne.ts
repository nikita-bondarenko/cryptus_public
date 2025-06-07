
import { setCryptoInputAmountValue } from "../slices/exchangeInput/exchangeInputSlice";
import { RootState, AppDispatch } from "../store";
import { dispatchCrypto } from "./dispatchCrypto";
import { dispatchNonCrypto } from "./dispatchNonCrypto";
import { getCurrencyTypeFromAction } from "./getCurrencyTypeFromAction";
import { ValidateAmountInputProps } from "./validateAmountInput";

export type CalculateInputAmountBasedOnAnotherOneProps = ValidateAmountInputProps;

export const calculateInputAmountBasedOnAnotherOne = ({
  action,
  listenerApi,
}: CalculateInputAmountBasedOnAnotherOneProps) => {
  const state = listenerApi.getState() as RootState;
  const dispatch = listenerApi.dispatch as AppDispatch;

  const { selectedGiveType, selectedReceieveType } = state.exchangeType;
  const rate = state.exchangeInput.rate;
  const value = action.payload as number;
  const activeInputType = state.exchangeInput.activeInputType;
  const sourseType = getCurrencyTypeFromAction(action.type);

  // Validate only if the input type is currently selected

  if (activeInputType !== sourseType) {
    return;
  }

  console.log("value", value);
  console.log("rate", rate);
  console.log("action.type === setCryptoInputAmountValue.type", action.type === setCryptoInputAmountValue.type);

  if (action.type === setCryptoInputAmountValue.type) {
    dispatchNonCrypto({
      selectedReceiveType: selectedReceieveType,
      selectedGiveType,
      value,
      dispatch,
      rate,
    });
  } else {
    dispatchCrypto({
      selectedReceiveType: selectedReceieveType,
      selectedGiveType,
      value,
      dispatch,
      rate,
    });
  }
};
