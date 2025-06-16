import { Rate } from "@/components/ui/SectionHeading";
import { translateCurrency } from "./translateCurrency";


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
        value: Number((1 / baseRate).toFixed(2)),
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