import { City } from "@/api/types";
import { CurrencyType } from "@/components/request/RequestDetails";

export type CalculateCityIdProps = {
  selectedGivenType: CurrencyType;
  selectedReceivedType: CurrencyType;
  city?: City | null;
};

export const calculateCityId = ({
  selectedGivenType,
  selectedReceivedType,
  city,
}: CalculateCityIdProps) => {
  if (city && (selectedGivenType === "cash" || selectedReceivedType === "cash")) {
    return {
      city: city.id,
    };
  } else {
    return {}
  }
};
