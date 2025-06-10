import { useCallingOperatorMutation } from "@/api/api";
import { useAppSelector } from "@/redux/hooks";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import { selectCurrencyTypes } from "@/redux/selectors";

export const useCallSupport = () => {
  const [callOperator] = useCallingOperatorMutation();
  const userId = useAppSelector((state) => state.userData.userId);
  const isAppReady = useAppSelector((state) => state.ui.isAppReady);
  const {exchangeRate} = useAppSelector(state => state.exchange);
  
  const callSupport = async () => {
    if (!isAppReady) return;
    if (!userId) {
      console.error("User ID is required");
      return;
    }

    try {
      await callOperator({
        user_id: userId,
        type_direction: exchangeRate?.direction.includes("CASH") ? "CASH" : "CASHLESS",
      }).unwrap();

      // Закрываем Telegram WebApp
      window.Telegram.WebApp.close();
    } catch (error) {
      console.error("Error calling support:", error);
    }
  };

  return {
    callSupport,
  };
}; 