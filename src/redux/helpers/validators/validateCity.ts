import { ValidationOptions } from "../types";

export type ValidateCityProps = {
  value: string | null;
  options?: ValidationOptions;
};

export const validateCity = ({ value, options }: ValidateCityProps): string | null => {
  if (!value) {
    return "Выберите город";
  }

  if (value.length < 2) {
    return "Название города должно содержать минимум 2 символа";
  }

  if (!/^[а-яА-ЯёЁ\s-]+$/.test(value)) {
    return "Название города должно содержать только русские буквы";
  }

  return null;
}; 