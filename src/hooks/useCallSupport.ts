import { useCallingOperatorMutation } from "@/api/api";
import { useAppSelector } from "@/redux/hooks";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import { selectCurrencyTypes } from "@/redux/selectors";

export const useCallSupport = () => {
  const [callOperator] = useCallingOperatorMutation();
  const userId = useAppSelector((state) => state.userData.userId);
  const tg = useTelegramWebApp();
  const {givenType, receivedType} = useAppSelector(selectCurrencyTypes);
  const callSupport = async () => {
    if (!userId) {
      console.error("User ID is required");
      return;
    }

    try {
      await callOperator({
        user_id: userId,
        type_direction: givenType === "CASH" || receivedType === "CASH" ? "CASH" : 'CASHLESS',
      }).unwrap();

      // Закрываем Telegram WebApp
      tg?.close();
    } catch (error) {
      console.error("Error calling support:", error);
    }
  };

  return {
    callSupport,
  };
}; 