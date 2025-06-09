import { ExchangeBank } from "@/redux/slices/exchangeSlice/exchangeSlice";
import { SelectOption } from "@/components/exchange/BankSelect";

export const calculateBank = (bank?: ExchangeBank | null) => {
    if (!bank) return null;
    return {
        value: bank.id,
        name: bank.title
    };
};

export const translateBanks = (banks?: ExchangeBank[]): SelectOption[] => {
    if (!banks) return [];
    
    // Создаем копию массива перед сортировкой
    return [...banks]
        .sort((a, b) => a.weight > b.weight ? 1 : -1)
        .map((bank) => calculateBank(bank))
        .filter((bank): bank is NonNullable<typeof bank> => bank !== null);
}; 