import { RequestDetailsProps } from "@/components/request/RequestDetails";

export const requestDetails: RequestDetailsProps[] = [
  {
    title: "Я отдал",
    rate: {
      from: {
        value: 1,
        name: "USDT",
        type: "crypto",
      },
      to: {
        value: 81.69,
        name: "RUB",
        type: "cash",
      },
    },
    currency: {
      name: "Tether",
      icon: "usdt.svg",
      type: "crypto",
      typeLabel: "BEP 20",
      value: "100",
      position: "given",
    },
  },
  {
    title: "Я получил",
    currency: {
      icon: "rub.svg",
      name: "RUB",
      type: "card",
      typeLabel: "Тинькофф",
      value: "8 062",
      position: 'received',
      wayDetails: {
        title: "Карта получения ",
        value: "8950 9931 1135 1246",
      },
    },
  },
    {
    title: "Я отдал",
    rate: {
      from: {
        value: 1,
        name: "USDT",
        type: "crypto",
      },
      to: {
        value: 81.69,
        name: "RUB",
        type: "cash",
      },
    },
    currency: {
      name: "Tether",
      icon: "usdt.svg",
      type: "crypto",
      typeLabel: "BEP 20",
      value: "100",
      position: "given",
    },
  },
  {
    title: "Я получил",
    currency: {
      icon: "rub.svg",
      name: "RUB",
      type: "cash",
      typeLabel: "Наличные",
      value: "8 062",
      position: 'received',
      wayDetails: {
        title: "Город получения",
        value: "Санкт-Петербург",
      },
    },
  },
    {
    title: "Я отдал",
    rate: {
      from: {
        value: 1,
        name: "USDT",
        type: "crypto",
      },
      to: {
        value: 81.69,
        name: "RUB",
        type: "cash",
      },
    },
   currency: {
      icon: "rub.svg",
      name: "RUB",
      type: "cash",
      typeLabel: "Наличные",
      value: "50 000",
      position: 'given',
      wayDetails: {
        title: "Город получения",
        value: "Санкт-Петербург",
      },
    },
  },
  {
    title: "Я получил",
    currency:   {
      name: "USDT",
      icon: "usdt.svg",
      type: "crypto",
      typeLabel: "BEP 20",
      value: "640",
      position:'received',
      wayDetails: {
        title: "Адрес получения",
        value: "0xE50b569B526Dd52FcD9286C82F0222Eab00f4386"
      }
    },
  },
    {
    title: "Я отдал",
    rate: {
      from: {
        value: 1,
        name: "USDT",
        type: "crypto",
      },
      to: {
        value: 81.69,
        name: "RUB",
        type: "cash",
      },
    },
   currency: {
      icon: "rub.svg",
      name: "RUB",
      type: "card",
      typeLabel: "Наличные",
      value: "10 000",
      position: 'given',
    },
  },
  {
    title: "Я получил",
    currency:   {
      name: "USDT",
      icon: "usdt.svg",
      type: "crypto",
      typeLabel: "BEP 20",
      value: "130",
      position:'received',
      wayDetails: {
        title: "Адрес получения",
        value: "0xE50b569B526Dd52FcD9286C82F0222Eab00f4386"
      }
    },
  },
];
