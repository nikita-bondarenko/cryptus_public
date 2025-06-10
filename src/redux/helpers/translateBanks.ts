import { ExchangeBank } from "@/redux/slices/exchangeSlice/exchangeSlice";
import { SelectOption } from "@/components/exchange/BankSelect";
import { banksMaskList } from "@/data/banksMaskList";

export const calculateBank = (bank?: ExchangeBank | null) => {
    if (!bank) return null;
    const bankMask = banksMaskList.find(bankMask => bankMask.title === bank.title)
    return {
        value: bank.id,
        name:bankMask?.label || bank.title
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