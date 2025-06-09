import { Directions, DirectionType } from "@/api/types";
import { CurrencyType } from "@/components/request/RequestDetails";

export const calculateDirections = (giveType: CurrencyType, getType: CurrencyType) : DirectionType => {
    if (giveType === "COIN" && getType === "BANK") {
        return 'COIN - BANK';
    } else if (giveType === "COIN" && getType === "CASH") {
        return 'COIN - CASH';
    } else if (giveType === "BANK" && getType === "COIN") {
        return 'BANK - COIN';
    }  else if (giveType === "CASH" && getType === "COIN") {
        return 'CASH - COIN';
    }
    return 'COIN - BANK';
}

