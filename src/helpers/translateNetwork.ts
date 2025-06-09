import { ExchangeNetwork } from "@/redux/slices/exchangeSlice/exchangeSlice";

export const translateNetwork = (network: ExchangeNetwork | null | undefined) => {
  return network ? {
    value: network.id,
    name: network.title,
  } : null;
}