'use client';

import { useState } from 'react';

export default function MockTestPage() {
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testEndpoint = async (url: string, method: string = 'GET', body?: any) => {
    setLoading(true);
    setError(null);
    setApiResponse(null);

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      const data = await response.json();
      
      setApiResponse({
        status: response.status,
        data,
        url,
        method,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const endpoints = [
    {
      name: 'Health Check',
      url: '/api/health',
      method: 'GET',
    },
    {
      name: 'User Profile',
      url: '/api/user/profile',
      method: 'GET',
    },
    {
      name: 'Exchange Rates',
      url: '/api/exchange/rates',
      method: 'GET',
    },
    {
      name: 'FAQ',
      url: '/api/faq',
      method: 'GET',
    },
    {
      name: 'Bank Currencies',
      url: '/api/currencies/bank',
      method: 'GET',
    },
    {
      name: 'Crypto Currencies',
      url: '/api/currencies/coin',
      method: 'GET',
    },
    {
      name: 'Create Exchange',
      url: '/api/exchange/create',
      method: 'POST',
      body: {
        from_currency: 'BTC',
        to_currency: 'USDT',
        amount: 0.1,
      },
    },
    {
      name: 'Call Support',
      url: '/api/support/call',
      method: 'POST',
      body: {
        phone: '+7 999 123 45 67',
      },
    },
    {
      name: 'Test 500 Error',
      url: '/api/error/500',
      method: 'GET',
    },
    {
      name: 'Test 404 Error',
      url: '/api/error/404',
      method: 'GET',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🧪 Mock API Tester
          </h1>
          
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="font-semibold text-blue-800 mb-2">Инструкция:</h2>
            <p className="text-blue-700">
              Нажимайте на кнопки ниже, чтобы протестировать различные API эндпоинты. 
              Все запросы перехватываются Mock Service Worker и возвращают тестовые данные.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {endpoints.map((endpoint, index) => (
              <button
                key={index}
                onClick={() => testEndpoint(endpoint.url, endpoint.method, endpoint.body)}
                disabled={loading}
                className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="font-medium text-gray-900">{endpoint.name}</div>
                <div className="text-sm text-gray-500">
                  {endpoint.method} {endpoint.url}
                </div>
              </button>
            ))}
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Загрузка...</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Ошибка:</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {apiResponse && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Ответ API:</h3>
              
              <div className="mb-3">
                <span className="inline-block px-2 py-1 text-xs font-mono bg-gray-200 rounded mr-2">
                  {apiResponse.method}
                </span>
                <span className="text-sm font-mono text-gray-600">
                  {apiResponse.url}
                </span>
                <span className={`inline-block px-2 py-1 text-xs font-mono rounded ml-2 ${
                  apiResponse.status >= 200 && apiResponse.status < 300
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {apiResponse.status}
                </span>
              </div>

              <pre className="bg-white border border-gray-200 rounded p-4 text-sm overflow-x-auto">
                {JSON.stringify(apiResponse.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
