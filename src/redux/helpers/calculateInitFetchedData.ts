import { api } from "@/api/api";
import { calculateCurrencyTypeForFetching } from "@/helpers/calculateCurrencyTypeForFetching";
import { calculateDirections } from "@/helpers/calculateDirections";
import { calculateRate } from "@/helpers/calculateRate";
import { translateCurrencies } from "@/helpers/translateCurrencies";
import { setInitFetchedData } from "../slices/exchangeInput/exchangeInputSlice";
import { AppDispatch, RootState } from "../store";
import { getCurrencyOptions } from "./getCurrencyOptions";
import { CurrencyType } from "@/components/request/RequestDetails";
import { ListenerEffectAPI, PayloadAction } from "@reduxjs/toolkit";
import { calculateCityId } from "./calculateCityId";
import { translateCities } from "./translateCIties";

export const calculateInitFetchedData = async (
  listenerApi: ListenerEffectAPI<
    RootState,
    AppDispatch,
    PayloadAction<CurrencyType>
  >
) => {
  const state = listenerApi.getState() as RootState;
  const { selectedGiveType, selectedReceieveType } = state.exchangeType;
  console.log(selectedGiveType, selectedReceieveType);
  if (!selectedGiveType || !selectedReceieveType) return;

  // Get currencies for sell
  const sellType = calculateCurrencyTypeForFetching(selectedGiveType);
  const sellResponse = await listenerApi.dispatch(
    api.endpoints.getCurrenciesSell.initiate(sellType)
  );

  if (sellResponse.data) {
    console.log(sellResponse.data.map((item) => item.directions))
    const sellCurrencies = translateCurrencies(sellResponse.data);
    const firstSellCurrency = sellResponse.data[0];

    // Get currencies for buy
    const buyType = calculateCurrencyTypeForFetching(selectedReceieveType);
    const buyResponse = await listenerApi.dispatch(
      api.endpoints.getCurrenciesBuy.initiate({
        give_currency_id: firstSellCurrency.id,
        currency_type: buyType,
      })
    );

    if (buyResponse.data) {
        console.log(buyResponse.data.map((item) => item))

      const buyCurrencies = translateCurrencies(buyResponse.data);
      const firstBuyCurrency = buyResponse.data[0];

      // Get cities
      const citiesResponse = await listenerApi.dispatch(
        api.endpoints.getCities.initiate({
          currency_give: firstSellCurrency.id,
          currency_get: firstBuyCurrency.id,
        })
      );

      let firstCity = null;
      if (citiesResponse?.data) {
        firstCity = citiesResponse.data[0];
      }

      const fetchedRate = await listenerApi.dispatch(
        api.endpoints.getExchangeRate.initiate({
          give_currency: firstSellCurrency.id,
          get_currency: firstBuyCurrency.id,
          ...(calculateCityId({selectedGivenType: selectedGiveType, selectedReceivedType: selectedReceieveType, city: firstCity})),
          direction: calculateDirections(
            selectedGiveType,
            selectedReceieveType
          ),
        })
      );


      if (fetchedRate.data) {
        const rate = calculateRate({
          course: fetchedRate.data.course,
          currencyGive: firstSellCurrency.title,
          currencyGet: firstBuyCurrency.title,
        });

        const payload = {
          rate,
          options: {
            cryptoCurrencyOptions: getCurrencyOptions({
              type: "crypto",
              givenCurrencyType: selectedGiveType,
              receivedCurrencyType: selectedReceieveType,
              currenciesGiven: sellCurrencies,
              currenciesReceived: buyCurrencies,
            }),
            cardCurrencyOptions: getCurrencyOptions({
              type: "card",
              givenCurrencyType: selectedGiveType,
              receivedCurrencyType: selectedReceieveType,
              currenciesGiven: sellCurrencies,
              currenciesReceived: buyCurrencies,
            }),
            cashCurrencyOptions: getCurrencyOptions({
              type: "cash",
              givenCurrencyType: selectedGiveType,
              receivedCurrencyType: selectedReceieveType,
              currenciesGiven: sellCurrencies,
              currenciesReceived: buyCurrencies,
            }),
            bankOptions: [],
            cityOptions: translateCities(citiesResponse.data),
            netsOptions: [],
          },
        };
            console.log(payload)
        listenerApi.dispatch(setInitFetchedData(payload));
      }
    }
  }
};
