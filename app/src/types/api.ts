// Types for Cryptus API based on mocks

export interface User {
  id: number;
  username: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
  telegram_id: string;
}

export interface ExchangeRequest {
  id: number;
  status: 'pending' | 'created' | 'completed' | 'failed';
  amount: number;
  currency: string;
  created_at: string;
  completed_at?: string;
}

export interface UserProfile {
  user_data: User;
  requests_in_process: ExchangeRequest[];
}

export interface ExchangeRates {
  rates: Record<string, number>;
  last_updated: string;
}

export interface Currency {
  code: string;
  name: string;
  icon: string;
}

export interface FAQQuestion {
  id: number;
  question: string;
  answer: string;
}

export interface FAQResponse {
  questions: FAQQuestion[];
}

export interface ExchangeCreateRequest {
  from_currency: string;
  to_currency: string;
  amount: number;
}

export interface ExchangeCreateResponse {
  id: number;
  status: string;
  from_currency: string;
  to_currency: string;
  amount: number;
  rate: number;
  created_at: string;
}

export interface SupportCallRequest {
  phone: string;
}

export interface SupportCallResponse {
  message: string;
  ticket_id: number;
  phone: string;
  estimated_call_time: string;
}

export interface SupportMessageRequest {
  subject: string;
  message: string;
}

export interface SupportMessageResponse {
  message: string;
  ticket_id: number;
  subject: string;
  status: string;
}

export interface AuthTelegramRequest {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface AuthTelegramResponse {
  token: string;
  user: User;
}

export interface ApiErrorResponse {
  error: string;
  message: string;
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  version: string;
}
