import { ExchangeNetwork } from "@/redux/slices/exchangeSlice/exchangeSlice";
import { CryptoNetOption } from "@/components/exchange/CryptoNetSelect";

export const translateNetworks = (networks: ExchangeNetwork[]): CryptoNetOption[] => {
    return networks.map((network) => ({
        value: network.id,
        name: network.title_network,
    }))
}
