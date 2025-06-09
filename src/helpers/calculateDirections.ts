import { Directions, DirectionType } from "@/api/types";
import { CurrencyType } from "@/components/request/RequestDetails";

export const calculateDirections = (giveType: CurrencyType, getType: CurrencyType) : DirectionType => {
    if (giveType === 'crypto' && getType === 'card') {
        return 'COIN - BANK';
    } else if (giveType === 'crypto' && getType === 'cash') {
        return 'COIN - CASH';
    } else if (giveType === 'card' && getType === 'crypto') {
        return 'BANK - COIN';
    }  else if (giveType === 'cash' && getType === 'crypto') {
        return 'CASH - COIN';
    }
    return 'COIN - BANK';
}

