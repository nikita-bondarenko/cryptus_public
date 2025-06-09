import { City } from "@/api/types";
import { SelectOption } from "@/components/exchange/BankSelect";

export const translateCities = (cities?: City[]): SelectOption[] => {

return cities?.sort((a,b) => a.weight > b.weight ? 1 : -1).map((city) => ({
    value: city.id,
    name: city.title
})) || []
}