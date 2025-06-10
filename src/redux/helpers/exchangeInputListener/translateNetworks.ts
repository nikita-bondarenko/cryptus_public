import { ExchangeNetwork } from "@/redux/slices/exchangeSlice/exchangeSlice";
import { CryptoNetOption } from "@/components/exchange/CryptoNetSelect";
import { translateNetwork } from "@/helpers/translateNetwork";

export const translateNetworks = (networks: ExchangeNetwork[]): CryptoNetOption[] => {
    return networks.map((network) => translateNetwork(network)).filter(Boolean) as CryptoNetOption[];
}
