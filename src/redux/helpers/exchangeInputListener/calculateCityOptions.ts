import { api } from "@/api/api";
import { GroupedCurrency } from "@/api/types";
import { setCities } from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { AppDispatch, RootState } from "@/redux/store";


export const calculateCityOptions = async (dispatch: AppDispatch, currencySellId: number, currencyBuyId: number ) => {
    const cities = await dispatch(api.endpoints.getCities.initiate({
        currency_give: currencySellId,
        currency_get: currencyBuyId,
    }))
    if (cities.data) {
        dispatch(setCities(cities.data))
    }
}