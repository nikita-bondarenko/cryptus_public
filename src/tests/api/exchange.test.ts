import { rest, RestRequest, ResponseComposition, RestContext } from 'msw';
import { setupServer } from 'msw/node';
import { API_URL } from '@/config';
import { describe, beforeAll, afterEach, afterAll, it, expect } from '@jest/globals';

// Types
type City = {
  id: number;
  title: string;
  weight: number;
}

type Currency = {
  id: number;
  title: string;
  code: string;
  type: 'COIN' | 'BANK' | "CASH";
  weight: number;
  directions: string;
}

type Exchange = {
  status: string;
  id: number;
}

type UserExchange = {
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

type Profile = {
  name: string;
  phone: string;
  email: string;
}

type RequestDetail = {
  id: string;
  date: string;
  currencyFrom: {
    value: string;
    name: string;
    icon: string;
  };
  currencyTo: {
    value: string;
    name: string;
    icon: string;
  };
}

type FAQ =  {
  id: number;
  question: string;
  answer: string;
}

// Mock data
const mockCities: City[] = [
  { id: 1, title: 'Москва', weight: 1 },
  { id: 2, title: 'Санкт-Петербург', weight: 2 }
];

const mockCurrencies: Currency[] = [
  {
    id: 1,
    title: 'Tether',
    code: 'USDT',
    type: 'COIN',
    weight: 1,
    directions: 'COIN - BANK'
  },
  {
    id: 2,
    title: 'Рубль',
    code: 'RUB',
    type: 'BANK',
    weight: 2,
    directions: 'BANK - COIN'
  }
];

const mockExchange: Exchange = {
  status: 'success',
  id: 1
};

const mockUserExchanges: UserExchange[] = [
  {
    id: '123',
    created_at: '2024-03-20T12:00:00Z',
    currency_give: 'USDT',
    amount_give: 100,
    currency_get: 'RUB',
    amount_get: 9000,
    course: 90,
    direction: 'COIN - BANK',
    course_title: '1 USDT = 90 RUB',
    city: 'Москва',
    get_to: '1234 5678 9012 3456',
    status: 'Выполнено'
  }
];

const mockProfile: Profile = {
  name: 'Иван Иванов',
  phone: '+7 (999) 123-45-67',
  email: 'ivan@example.com'
};

const mockRequestDetails: RequestDetail[] = [
  {
    id: '#151473',
    date: '26 мая 13:32',
    currencyFrom: {
      value: '10 000',
      name: 'RUB',
      icon: 'rub.svg'
    },
    currencyTo: {
      value: '130',
      name: 'Tether',
      icon: 'usdt.svg'
    }
  },
  {
    id: '#315423',
    date: '13 апреля 11:14',
    currencyFrom: {
      value: '53 000',
      name: 'RUB',
      icon: 'rub.svg'
    },
    currencyTo: {
      value: '0,006612763',
      name: 'BTC',
      icon: 'btc.svg'
    }
  }
];

const mockFAQ: FAQ[] = [
  {
    id: 1,
    question: 'Как работает обмен валют?',
    answer: 'Обмен валют происходит через нашу платформу...'
  },
  {
    id: 2,
    question: 'Какие комиссии взимаются?',
    answer: 'Комиссия зависит от типа обмена...'
  }
];

const USER_ID = 464552386;

const mockSwiftExchange = { status: 'success', id: 2 };
const mockUserDetail = {
  profile_picture: 'https://example.ru/profile_pictures/464552386_profile_pic.jpg',
  full_name: 'Иванов Иван Иванович',
  phone: '+79991234567',
  email: 'example@mail.com',
};
const mockFaqSections = [
  {
    weight: 1,
    title: 'Общие вопросы',
    faqs: [
      { id: 1, question: 'Что такое Cryptus?', answer: 'Это сервис обмена.' },
    ],
  },
];
const mockUpdatedUser = {
  user_id: USER_ID,
  full_name: 'Иванов Иван Иванович',
  phone: '+79991234567',
  email: 'example@mail.com',
};

// Setup MSW
const server = setupServer(
  // Cities endpoint
  rest.get(`${API_URL}/api/cities/`, (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const currencyGive = req.url.searchParams.get('currency_give');
    const currencyGet = req.url.searchParams.get('currency_get');
    
    if (!currencyGive || !currencyGet) {
      return res(ctx.status(400), ctx.json({ error: 'Missing required parameters' }));
    }
    
    return res(ctx.json(mockCities));
  }),

  // Currencies buy endpoint
  rest.get(`${API_URL}/currencies-buy/`, (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const giveCurrencyId = req.url.searchParams.get('give_currency_id');
    const currencyType = req.url.searchParams.get('currency_type');
    
    if (!giveCurrencyId || !currencyType) {
      return res(ctx.status(400), ctx.json({ error: 'Missing required parameters' }));
    }
    
    return res(ctx.json(mockCurrencies));
  }),

  // Currencies sell endpoint
  rest.get(`${API_URL}/currencies-sell/`, (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    return res(ctx.status(400), ctx.json({ error: 'Missing currency type' }));
  }),

  rest.get(`${API_URL}/currencies-sell/:currencyType`, (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const { currencyType } = req.params;
    
    if (!currencyType) {
      return res(ctx.status(400), ctx.json({ error: 'Missing currency type' }));
    }
    
    return res(ctx.json(mockCurrencies));
  }),

  // Create exchange endpoint
  rest.post(`${API_URL}/exchanges/`, (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const requiredFields = [
      'user_id',
      'currency_give',
      'amount_give',
      'currency_get',
      'amount_get',
      'course',
      'direction',
      'course_title'
    ];

    const body = req.body as Record<string, unknown>;
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return res(
        ctx.status(400),
        ctx.json({ error: `Missing required fields: ${missingFields.join(', ')}` })
      );
    }

    if (body.user_id !== USER_ID) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Invalid user_id' })
      );
    }

    return res(ctx.status(201), ctx.json(mockExchange));
  }),

  // User exchanges endpoint
  rest.get(`${API_URL}/user-exchanges/`, (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const userId = req.url.searchParams.get('user_id');
    
    if (!userId) {
      return res(ctx.status(400), ctx.json({ error: 'Missing user_id parameter' }));
    }

    if (parseInt(userId) !== USER_ID) {
      return res(ctx.status(400), ctx.json({ error: 'Invalid user_id' }));
    }
    
    return res(ctx.json(mockUserExchanges));
  }),

  // Profile endpoints
  rest.get(`${API_URL}/api/profile`, (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const userId = req.url.searchParams.get('user_id');
    
    if (!userId) {
      return res(ctx.status(400), ctx.json({ error: 'Missing user_id parameter' }));
    }

    if (parseInt(userId) !== USER_ID) {
      return res(ctx.status(400), ctx.json({ error: 'Invalid user_id' }));
    }
    
    return res(ctx.json(mockProfile));
  }),

  rest.put(`${API_URL}/api/profile`, (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const userId = req.url.searchParams.get('user_id');
    const body = req.body as Record<string, unknown>;
    
    if (!userId) {
      return res(ctx.status(400), ctx.json({ error: 'Missing user_id parameter' }));
    }

    if (parseInt(userId) !== USER_ID) {
      return res(ctx.status(400), ctx.json({ error: 'Invalid user_id' }));
    }

    const requiredFields = ['name', 'phone', 'email'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return res(
        ctx.status(400),
        ctx.json({ error: `Missing required fields: ${missingFields.join(', ')}` })
      );
    }
    
    return res(ctx.json({ ...mockProfile, ...body }));
  }),

  // Request details endpoint
  rest.get(`${API_URL}/api/request/:id`, (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const { id } = req.params;
    const userId = req.url.searchParams.get('user_id');
    
    if (!userId) {
      return res(ctx.status(400), ctx.json({ error: 'Missing user_id parameter' }));
    }

    if (parseInt(userId) !== USER_ID) {
      return res(ctx.status(400), ctx.json({ error: 'Invalid user_id' }));
    }

    const request = mockRequestDetails.find(r => r.id === id);
    
    if (!request) {
      return res(ctx.status(404), ctx.json({ error: 'Request not found' }));
    }
    
    return res(ctx.json(request));
  }),

  // FAQ endpoint
  rest.get(`${API_URL}/api/faq`, (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    return res(ctx.json(mockFAQ));
  }),

  // /calling-operator/
  rest.post(`${API_URL}/calling-operator/`, (req, res, ctx) => {
    const { user_id, type_direction } = req.body as any;
    if (!user_id || !type_direction) {
      return res(ctx.status(400), ctx.json({ error: 'Missing required fields' }));
    }
    if (user_id !== USER_ID) {
      return res(ctx.status(400), ctx.json({ error: 'Invalid user_id' }));
    }
    return res(ctx.status(201), ctx.json(mockSwiftExchange));
  }),

  // /exchanges-other/
  rest.post(`${API_URL}/exchanges-other/`, (req, res, ctx) => {
    const { user_id } = req.body as any;
    if (!user_id) {
      return res(ctx.status(400), ctx.json({ error: 'Missing user_id' }));
    }
    if (user_id !== USER_ID) {
      return res(ctx.status(400), ctx.json({ error: 'Invalid user_id' }));
    }
    return res(ctx.status(201), ctx.json(mockSwiftExchange));
  }),

  // /faqs/
  rest.get(`${API_URL}/faqs/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockFaqSections));
  }),

  // /user-detail/
  rest.post(`${API_URL}/user-detail/`, (req, res, ctx) => {
    const { user_id } = req.body as any;
    if (!user_id) {
      return res(ctx.status(400), ctx.json({ error: 'Missing user_id' }));
    }
    if (user_id !== USER_ID) {
      return res(ctx.status(404), ctx.json({ error: 'User not found' }));
    }
    return res(ctx.status(200), ctx.json(mockUserDetail));
  }),

  // /update-user/
  rest.put(`${API_URL}/update-user/`, (req, res, ctx) => {
    const { user_id, full_name, phone, email } = req.body as any;
    if (!user_id || !full_name || !phone || !email) {
      return res(ctx.status(400), ctx.json({ error: 'Missing required fields' }));
    }
    if (user_id !== USER_ID) {
      return res(ctx.status(404), ctx.json({ error: 'User not found' }));
    }
    return res(ctx.status(200), ctx.json(mockUpdatedUser));
  })
);

// Tests
describe('Exchange API', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('GET /api/cities/', () => {
    it('should return cities when valid parameters are provided', async () => {
      const response = await fetch(`${API_URL}/api/cities/?currency_give=USDT&currency_get=RUB`);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual(mockCities);
    });

    it('should return 400 when parameters are missing', async () => {
      const response = await fetch(`${API_URL}/api/cities/`);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
  });

  describe('GET /currencies-buy/', () => {
    it('should return currencies when valid parameters are provided', async () => {
      const response = await fetch(`${API_URL}/currencies-buy/?give_currency_id=1&currency_type=COIN`);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual(mockCurrencies);
    });

    it('should return 400 when parameters are missing', async () => {
      const response = await fetch(`${API_URL}/currencies-buy/`);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
  });

  describe('GET /currencies-sell/:currencyType', () => {
    it('should return currencies when valid currency type is provided', async () => {
      const response = await fetch(`${API_URL}/currencies-sell/COIN`);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual(mockCurrencies);
    });

    it('should return 400 when currency type is missing', async () => {
      const response = await fetch(`${API_URL}/currencies-sell/`);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
  });

  describe('POST /exchanges/', () => {
    it('should create exchange when all required fields are provided', async () => {
      const exchangeData = {
        user_id: USER_ID,
        currency_give: 'USDT',
        amount_give: 100,
        currency_get: 'RUB',
        amount_get: 9000,
        course: 90,
        direction: 'COIN - BANK',
        course_title: '1 USDT = 90 RUB'
      };

      const response = await fetch(`${API_URL}/exchanges/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exchangeData),
      });
      
      const data = await response.json();
      
      expect(response.status).toBe(201);
      expect(data).toEqual(mockExchange);
    });

    it('should return 400 when required fields are missing', async () => {
      const response = await fetch(`${API_URL}/exchanges/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });

    it('should return 400 when user_id is invalid', async () => {
      const exchangeData = {
        user_id: 123456,
        currency_give: 'USDT',
        amount_give: 100,
        currency_get: 'RUB',
        amount_get: 9000,
        course: 90,
        direction: 'COIN - BANK',
        course_title: '1 USDT = 90 RUB'
      };

      const response = await fetch(`${API_URL}/exchanges/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exchangeData),
      });
      
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
  });

  describe('GET /user-exchanges/', () => {
    it('should return user exchanges when valid user_id is provided', async () => {
      const response = await fetch(`${API_URL}/user-exchanges/?user_id=${USER_ID}`);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual(mockUserExchanges);
    });

    it('should return 400 when user_id is missing', async () => {
      const response = await fetch(`${API_URL}/user-exchanges/`);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });

    it('should return 400 when user_id is invalid', async () => {
      const response = await fetch(`${API_URL}/user-exchanges/?user_id=123456`);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
  });

  describe('GET /api/profile', () => {
    it('should return profile when valid user_id is provided', async () => {
      const response = await fetch(`${API_URL}/api/profile?user_id=${USER_ID}`);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual(mockProfile);
    });

    it('should return 400 when user_id is missing', async () => {
      const response = await fetch(`${API_URL}/api/profile`);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });

    it('should return 400 when user_id is invalid', async () => {
      const response = await fetch(`${API_URL}/api/profile?user_id=123456`);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
  });

  describe('PUT /api/profile', () => {
    it('should update profile when valid data is provided', async () => {
      const profileData = {
        name: 'Петр Петров',
        phone: '+7 (999) 765-43-21',
        email: 'petr@example.com'
      };

      const response = await fetch(`${API_URL}/api/profile?user_id=${USER_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual({ ...mockProfile, ...profileData });
    });

    it('should return 400 when required fields are missing', async () => {
      const response = await fetch(`${API_URL}/api/profile?user_id=${USER_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });

    it('should return 400 when user_id is invalid', async () => {
      const profileData = {
        name: 'Петр Петров',
        phone: '+7 (999) 765-43-21',
        email: 'petr@example.com'
      };

      const response = await fetch(`${API_URL}/api/profile?user_id=123456`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
  });

  describe('GET /api/request/:id', () => {
    it('should return request details when valid id and user_id are provided', async () => {
      const response = await fetch(`${API_URL}/api/request/%23151473?user_id=${USER_ID}`);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual(mockRequestDetails[0]);
    });

    it('should return 404 when request is not found', async () => {
      const response = await fetch(`${API_URL}/api/request/999999?user_id=${USER_ID}`);
      const data = await response.json();
      
      expect(response.status).toBe(404);
      expect(data).toHaveProperty('error');
    });

    it('should return 400 when user_id is missing', async () => {
      const response = await fetch(`${API_URL}/api/request/151473`);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });

    it('should return 400 when user_id is invalid', async () => {
      const response = await fetch(`${API_URL}/api/request/151473?user_id=123456`);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
  });

  describe('GET /api/faq', () => {
    it('should return FAQ list', async () => {
      const response = await fetch(`${API_URL}/api/faq`);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual(mockFAQ);
    });
  });

  describe('POST /calling-operator/', () => {
    it('should create a swift exchange when valid data is provided', async () => {
      const response = await fetch(`${API_URL}/calling-operator/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: USER_ID, type_direction: "CASH" }),
      });
      const data = await response.json();
      expect(response.status).toBe(201);
      expect(data).toEqual(mockSwiftExchange);
    });
    it('should return 400 when required fields are missing', async () => {
      const response = await fetch(`${API_URL}/calling-operator/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
    it('should return 400 when user_id is invalid', async () => {
      const response = await fetch(`${API_URL}/calling-operator/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 123, type_direction: "CASH" }),
      });
      const data = await response.json();
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
  });

  describe('POST /exchanges-other/', () => {
    it('should create a swift exchange when valid data is provided', async () => {
      const response = await fetch(`${API_URL}/exchanges-other/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: USER_ID }),
      });
      const data = await response.json();
      expect(response.status).toBe(201);
      expect(data).toEqual(mockSwiftExchange);
    });
    it('should return 400 when user_id is missing', async () => {
      const response = await fetch(`${API_URL}/exchanges-other/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
    it('should return 400 when user_id is invalid', async () => {
      const response = await fetch(`${API_URL}/exchanges-other/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 123 }),
      });
      const data = await response.json();
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
  });

  describe('GET /faqs/', () => {
    it('should return FAQ sections', async () => {
      const response = await fetch(`${API_URL}/faqs/`);
      const data = await response.json();
      expect(response.status).toBe(200);
      expect(data).toEqual(mockFaqSections);
    });
  });

  describe('POST /user-detail/', () => {
    it('should return user detail when valid user_id is provided', async () => {
      const response = await fetch(`${API_URL}/user-detail/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: USER_ID }),
      });
      const data = await response.json();
      expect(response.status).toBe(200);
      expect(data).toEqual(mockUserDetail);
    });
    it('should return 400 when user_id is missing', async () => {
      const response = await fetch(`${API_URL}/user-detail/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
    it('should return 404 when user_id is invalid', async () => {
      const response = await fetch(`${API_URL}/user-detail/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 123 }),
      });
      const data = await response.json();
      expect(response.status).toBe(404);
      expect(data).toHaveProperty('error');
    });
  });

  describe('PUT /update-user/', () => {
    it('should update user when valid data is provided', async () => {
      const userData = {
        user_id: USER_ID,
        full_name: 'Иванов Иван Иванович',
        phone: '+79991234567',
        email: 'example@mail.com',
      };
      const response = await fetch(`${API_URL}/update-user/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      expect(response.status).toBe(200);
      expect(data).toEqual(mockUpdatedUser);
    });
    it('should return 400 when required fields are missing', async () => {
      const response = await fetch(`${API_URL}/update-user/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: USER_ID }),
      });
      const data = await response.json();
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });
    it('should return 404 when user_id is invalid', async () => {
      const userData = {
        user_id: 123,
        full_name: 'Иванов Иван Иванович',
        phone: '+79991234567',
        email: 'example@mail.com',
      };
      const response = await fetch(`${API_URL}/update-user/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      expect(response.status).toBe(404);
      expect(data).toHaveProperty('error');
    });
  });
}); 