import { Rate } from "@/redux/slices/exchangeInput/types";


type CalculateRateProps = {
  course: number;
  currencyGive: string;
  currencyGet: string;
}

export const calculateRate = ({
  course,
  currencyGive,
  currencyGet,
}: CalculateRateProps): Rate => {
  // Вычисляем базовый курс
  const baseRate = course;

  // Определяем, какая валюта будет иметь значение 1
  // Если курс меньше 1, то currencyGet будет иметь значение 1
  // Если курс больше или равен 1, то currencyGive будет иметь значение 1
  if (baseRate < 1) {
    return {
      from: {
        value: 1,
        name: currencyGet,
      },
      to: {
        value: 1 / baseRate,
        name: currencyGive,
      },
    };
  }

  return {
    from: {
      value: 1,
      name: currencyGive,
    },
    to: {
      value: baseRate,
      name: currencyGet,
    },
  };
}; 