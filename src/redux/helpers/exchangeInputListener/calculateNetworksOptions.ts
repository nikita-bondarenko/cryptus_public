import { GroupedCurrency } from "@/api/types";
import { CurrencyOption } from "@/components/exchange/CurrencySelect";
import { setNetworks } from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { translateNetworks } from "./translateNetworks";

export const calculateNetworksOptions = (dispatch: AppDispatch, state: RootState, currency: GroupedCurrency) => {

    const networks = currency.directions
dispatch(setNetworks(networks))
  
}