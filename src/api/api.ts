import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  City,
  GroupedCurrency,
  Exchange,
  UserExchange,
  Profile,
  UserDetail,
  FAQSection,
  SwiftExchange,
  ApiResponse,
  PaginationParams,
  CitiesParams,
  CurrenciesBuyParams,
  CreateExchangeParams,
  CreateSwiftExchangeParams,
  UpdateProfileParams,
  Directions,
  TypesCurrencies,
  UsersRequisites,
  ExchangeRate,
  ExchangeRateParams
} from '@/api/types';

const API_URL = 'https://cryptus-2.0.1362967-ci52663.tw1.ru';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Exchange', 'Profile', 'Currency', 'City', 'ExchangeRate'],
  endpoints: (builder) => ({
    // Cities
    getCities: builder.query<City[], CitiesParams>({
      query: (params) => ({
        url: '/api/cities/',
        params,
      }),
      providesTags: ['City'],
    }),

    getExchangeRate: builder.query<ExchangeRate, ExchangeRateParams>({
      query: (params) => ({
        url: '/get-exchange-rate/',
        params,
      }),
      providesTags: ['ExchangeRate'],
    }),

    // Currencies
    getCurrenciesBuy: builder.query<GroupedCurrency[], CurrenciesBuyParams>({
      query: (params) => ({
        url: '/currencies-buy/',
        params,
      }),
      providesTags: ['Currency'],
    }),

    getCurrenciesSell: builder.query<GroupedCurrency[], string>({
      query: (currencyType) => `/currencies-sell/${currencyType}/`,
      providesTags: ['Currency'],
    }),

    // Exchanges
    createExchange: builder.mutation<{id: number}, CreateExchangeParams>({
      query: (data) => ({
        url: '/exchanges/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Exchange'],
    }),

    getUserExchanges: builder.query<UserExchange[], { user_id: number | null } & PaginationParams>({
      query: (params) => ({
        url: '/user-exchanges/',
        params,
      }),
      providesTags: ['Exchange'],
    }),

    // Swift Exchanges
    callingOperator: builder.mutation<SwiftExchange, CreateSwiftExchangeParams>({
      query: (data) => ({
        url: '/calling-operator/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Exchange'],
    }),

    createOtherExchange: builder.mutation<SwiftExchange, { user_id: number }>({
      query: (data) => ({
        url: '/exchanges-other/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Exchange'],
    }),

    // Profile
    getProfile: builder.query<Profile, number>({
      query: (user_id) => ({
        url: '/api/profile',
        params: { user_id },
      }),
      providesTags: ['Profile'],
    }),

    updateProfile: builder.mutation<Profile, UpdateProfileParams>({
      query: (data) => ({
        url: '/update-user/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),

    getUserDetail: builder.query<UserDetail, number>({
      query: (user_id) => ({
        url: '/user-detail/',
        method: 'POST',
        body: { user_id },
      }),
      providesTags: ['Profile'],
    }),

    // FAQ
    getFAQs: builder.query<FAQSection[], void>({
      query: () => '/faqs/',
    }),
  }),
});

// Экспортируем хуки
export const {
  useGetCitiesQuery,
  useGetCurrenciesBuyQuery,
  useGetCurrenciesSellQuery,
  useCreateExchangeMutation,
  useGetUserExchangesQuery,
  useCallingOperatorMutation,
  useCreateOtherExchangeMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetUserDetailQuery,
  useGetFAQsQuery,
} = api; 