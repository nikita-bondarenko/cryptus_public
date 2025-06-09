import { GroupedCurrency } from "@/api/types";
import { setBanks } from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { AppDispatch, RootState } from "@/redux/store";

export const calculateBanksOptions = (dispatch: AppDispatch, state: RootState, currency: GroupedCurrency) => {
    // const banks = currency
    // dispatch(setBanks(banks))
}