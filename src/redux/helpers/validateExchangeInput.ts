import { CurrencyPosition } from "@/components/request/RequestDetails";
import { ValidatedField, ValidatorOptions, validators } from "./validators";

export type ValidateExchangeInput = (props: {
  value: unknown;
  inputType: ValidatedField;
  position: CurrencyPosition;
  minValue: number;
}) => string | null;

export const validateExchangeInput: ValidateExchangeInput = ({ value, inputType, position, minValue }) => {
  const validator = validators[inputType];

  if (validator) {
    const options: ValidatorOptions = {
      minValue: inputType === 'amount' ? minValue : undefined,
      position
    };
    return validator(value, options);
  }

  console.warn(`No specific validator found for input type: ${inputType}. Returning null.`);
  return null;
}; 