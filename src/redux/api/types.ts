export type PostCallingOperatorApiResponse =
  /** status 201 Успешное создание */ {
    status?: string;
    id?: number;
  };
export type PostCallingOperatorApiArg = {
  body: {
    /** ID пользователя */
    user_id: number;
  };
};  


export type GetCurrenciesGetApiResponse =
  /** status 200 Список доступных направлений обмена */ {
    id: number;
    name: string;
    cities?: object[];
    banks?: object[];
    networks?: object[];
  }[];
export type GetCurrenciesGetApiArg = {
  /** Идентификатор отдаваемой валюты */
  giveCurrencyId: number;
  /** Тип валюты ('BANK' — банковская валюта, 'COIN' — криптовалюта, 'CASH' — наличная) */
  currencyType: string;
};

type SecondaryPropertiesOption = {
    name: string;
    /** ID сети */
    id: number;
}

export type City = SecondaryPropertiesOption
export type Bank = SecondaryPropertiesOption
export type Network = SecondaryPropertiesOption
export type Currency = {
    id: number;
    icon: string;
    name: string;
    cities: City[];
    banks: Bank[];
    networks: Network[];
  }

export type GetDirectionInitialDataByDirectionTypeApiResponse =
  /** status 200 Успешный ответ */ {
    rate?: {
      /** ID направления обмена */
      id: number;
      /** Текущий курс обмена */
      course: number;
      /** Формат отображаемого курса */
      course_view: string;
      /** Минимальная сумма для обмена */
      currency_give_min_value: number;
      network: Network;
      city: City;
      bank: Bank;
      /** Тип направления обмена */
      direction_type: string;
      currency_give: Currency;
      currency_get: Currency;
    };
    currencies_give?: Currency[];
    currencies_get?: Currency[];
  };
export type GetDirectionInitialDataByDirectionTypeApiArg = {
  /** Тип направления обмена, состоящий из двух частей ('тип-отдаваемой-валюты - тип-получаемой-валюты') */
  directionType: string;
};
export type PostExchangesOtherApiResponse =
  /** status 201 Успешное создание */ {
    status?: string;
    id?: number;
  };
export type PostExchangesOtherApiArg = {
  body: {
    /** ID пользователя */
    user_id: number;
  };
};
export type ExchangesCreateApiResponse = /** status 201 Успешное создание */ {
  status?: string;
  id?: number;
};
export type ExchangesCreateApiArg = {
  body: {
    /** ID пользователя */
    user_id: number;
    /** ID направления */
    direction_id: number;
    /** Валюта, которую отдаете */
    currency_give: string;
    /** Сумма, которую отдаете */
    amount_give: number;
    /** Валюта, которую получаете */
    currency_get: string;
    /** Сумма, которую получаете */
    amount_get: number;
    /** Курс обмена */
    course: number;
    /** Направление обмена */
    direction: string;
    /** Название курса */
    course_title: string;
    /** Город */
    city?: string;
    /** Куда получить */
    get_to?: string;
  };
};
export type FaqsListApiResponse = /** status 200 Успешный ответ */ {
  /** Сортировка */
  weight: number;
  /** Название раздела */
  title: string;
  /** Список вопросов и ответов */
  faqs: {
    /** Сортировка */
    weight: number;
    /** Вопрос */
    title: string;
    /** Ответ */
    description: string;
  }[];
}[];
export type FaqsListApiArg = void;
export type GetGetRequisitesApiResponse = /** status 200  */ UsersRequisites[];
export type GetGetRequisitesApiArg = {
  /** ID пользователя */
  userId?: number;
  /** Тип реквизитов (BANK или COIN) */
  typeReq?: string;
};

export type Rate = {
    /** ID направления обмена */
    id: number;
    /** Текущий курс обмена */
    course: number;
    /** Формат отображаемого курса */
    course_view: string;
    /** Минимальная сумма для обмена */
    currency_give_min_value: number;
    network: Network;
    city: City;
    bank: Bank;
    /** Тип направления обмена */
    direction_type: string;
    currency_give: Currency;
    currency_get: Currency;
  }
export type GetJivoMessagesApiResponse = unknown;
export type GetJivoMessagesApiArg = void;
export type PostJivoMessagesApiResponse = unknown;
export type PostJivoMessagesApiArg = void;
export type RateListApiResponse = /** status 200 Успешный ответ */ {
  rate?: Rate;
};
export type RateListApiArg = {
  /** Тип направления обмена, состоящий из двух частей ('тип-отдаваемой-валюты - тип-получаемой-валюты') */
  directionType: string;
};

export type RequestCurrency = {
    amount?: number;
    name?: string;
    icon?: string;
    network?: string;
  }

export type Request = {
    id?: string;
    date?: string;
    course?: number;
    currency_give?: RequestCurrency;
    currency_get?: RequestCurrency;
  }
export type UserListApiResponse =
  /** status 200 Информация о пользователе и его транзакциях */ {
    user_data?: {
      name?: string;
      email?: string;
      phone?: string;
    };
    requests_in_process?: Request[];
    requests_all?: Request[];
    card?: string;
    city?: string;
  };
export type UserListApiArg = {
  /** ID пользователя */
  userId?: number;
};
export type UserUpdateCreateApiResponse =
  /** status 200 Успешное обновление */ {
    user_id?: number;
    full_name?: string;
    phone?: string;
    email?: string;
  };
export type UserUpdateCreateApiArg = {
  body: {
    /** ID пользователя */
    user_id: number;
    /** ФИО пользователя */
    full_name?: string;
    /** Номер телефона */
    phone?: string;
    /** Электронная почта */
    email?: string;
  };
};
export type UsersRequisites = {
  user: number;
  type_req?: ("BANK" | "COIN") | null;
  get_to?: string | null;
};