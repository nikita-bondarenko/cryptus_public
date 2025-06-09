import { api } from "@/api/api";
import { CurrencyType } from "@/components/request/RequestDetails";
import { ServerCurrencyType, calculateCurrencyTypeForFetching } from "@/helpers/calculateCurrencyTypeForFetching";
import { setCurrenciesBuy } from "@/redux/slices/exchangeInput/exchangeInputSlice";
import { AppDispatch, RootState } from "@/redux/store";

export const calculateCurrenciesBuy = async (dispatch: AppDispatch, state: RootState) => {



    const { selectedGiveType, selectedReceieveType } = state.exchangeType;

    let giveCurrencyId: number | null | undefined = null;

    switch (selectedGiveType) {
      case "crypto":
        giveCurrencyId = state.exchangeInput.cryptoInput.currency?.value;
        break;
      case "card":
        giveCurrencyId = state.exchangeInput.cardInput.currency?.value;
        break;
      case "cash":
        giveCurrencyId = state.exchangeInput.cashInput.currency?.value;
        break;
    }

    const currenciesBuyType: ServerCurrencyType =
      calculateCurrencyTypeForFetching(selectedReceieveType as CurrencyType);

    if (giveCurrencyId) {
      const currenciesBuy = await dispatch(
        api.endpoints.getCurrenciesBuy.initiate({
          give_currency_id: giveCurrencyId,
          currency_type: currenciesBuyType,
        })
      );
      if (currenciesBuy.data) {
        dispatch(setCurrenciesBuy(currenciesBuy.data));
      }
    }
}