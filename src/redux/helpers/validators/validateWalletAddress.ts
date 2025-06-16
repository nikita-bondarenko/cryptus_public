import { ValidationOptions } from "../types";

export type ValidateWalletAddressProps = {
  value: string | null;
  options?: ValidationOptions;
};

export const validateWalletAddress = ({ value, options }: ValidateWalletAddressProps): string | null => {
  // // // console.log(options)
  
  if (options?.position === "given") {
    return null;
  }
  
  if (!value) {
    return "Введите адрес кошелька";
  }

  // Basic Ethereum address validation
  if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
    return "Неверный формат адреса кошелька";
  }

  return null;
}; 
