import { SelectOption } from "@/components/exchange/BankSelect";
import { Network } from "@/redux/slices/exchangeInput/types";
import { CryptoNetOption } from "@/components/exchange/CryptoNetSelect";
export const translateNetworks = (networks: Network[]): CryptoNetOption[] => {
    return networks.map((network) => ({
        value: network.id,
        name: network.title_network,
    }))
}
