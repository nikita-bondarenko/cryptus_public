import { networkMaskList } from "@/data/networkMaskList";
import { ExchangeNetwork } from "@/redux/slices/exchangeSlice/exchangeSlice";

export const translateNetwork = (network: ExchangeNetwork | null | undefined) => {

  const networkMask = networkMaskList.find(item => item.title === network?.title_network);
  return network ? {
    value: network.id,
    name: networkMask ? networkMask.label : network.title_network,
  } : null;
}