import { Network } from "@/redux/slices/exchangeInput/types";

// Базовые типы для API
export type ApiResponse<T> = {
  data: T;
  error?: string;
}

// Типы для городов
export type City = {
  id: number;
  api_id: number;
  weight: number;
  title: string;
}

// Типы для валют
export type GroupedCurrency = {
  id: number;
  title: string;
  code: string;
  type: 'COIN' | 'BANK' | "CASH";
  weight: number;
  directions: Network[];
}

export type DirectionType = 'COIN - BANK' | 'COIN - CASH' | 'BANK - COIN' | 'CASH - COIN';

export type Directions = {
  id: number;
  give_currency: number;
  get_currency: number;
  direction: DirectionType;
  course: number;
  course_view?: number;
  course_title: string;
  min_amount: number;
}

// Типы для обменов
export type Exchange = {
  user_id: number;
  currency_give: string;
  amount_give: number;
  currency_get: string;
  amount_get: number;
  course: number;
  direction: DirectionType;
  course_title: string;
  city?: string;
  get_to?: string;
}

export type UserExchange = {
  id: string;
  created_at: string;
  currency_give: string;
  amount_give: number;
  currency_get: string;
  amount_get: number;
  course: number;
  direction: string;
  course_title: string;
  city: string;
  get_to: string;
  status: string;
}

export type SwiftExchange = {
  status: string;
  id: number;
}

// Типы для пользователя
export type Profile = {
  user_id: number;
  full_name: string;
  phone: string;
  email: string;
}

export type UserDetail = {
  profile_picture: string;
  full_name: string;
  phone: string;
  email: string;
}

export type UsersRequisites = {
  user: number;
  type_req?: 'BANK' | 'COIN';
  get_to?: string;
}

// Типы для FAQ
export type FAQSection = {
  weight: number;
  title: string;
  faqs: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
}

// Параметры запросов
export type PaginationParams = {
  start?: number;
  limit?: number;
}

export type CitiesParams = {
  currency_give: number;
  currency_get: number;
}

export type CurrenciesBuyParams = {
  give_currency_id: number;
  currency_type: string;
}

export type CreateExchangeParams = Exchange & {
  user_id: number;
}

export type CreateSwiftExchangeParams = {
  user_id: number;
  type_direction: "CASH" | 'CASHLESS';
}

export type UpdateProfileParams = {
  user_id: number;
  full_name: string;
  phone: string;
  email: string;
}

// Типы для валют
export type TypesCurrencies = {
  id: number;
  weight: number;
  title: string;
  code: string;
}

export type ExchangeRate = Directions 

export type ExchangeRateParams = {
  give_currency: number;
  get_currency: number;
  city?: number;
  direction: DirectionType;
}