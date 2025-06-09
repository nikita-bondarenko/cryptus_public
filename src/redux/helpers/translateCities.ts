import { City } from "@/api/types";
import { SelectOption } from "@/components/exchange/BankSelect";

export const calculateCity = (city?: City | null) => {
    if (!city) return null
    return {
        value: city.id,
        name: city.title
    }
}

export const translateCities = (cities?: City[]): SelectOption[] => {
    if (!cities) return [];
    
    // Создаем копию массива перед сортировкой
    return [...cities]
        .sort((a, b) => a.weight > b.weight ? 1 : -1)
        .map((city) => calculateCity(city))
        .filter((city): city is NonNullable<typeof city> => city !== null);
} 