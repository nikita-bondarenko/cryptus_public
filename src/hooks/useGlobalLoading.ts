import { useSelector } from 'react-redux';
import { api } from '@/api/api';

export const useGlobalLoading = () => {
  // Получаем количество активных запросов RTK Query
  const isLoading = useSelector((state: any) =>
    Object.values(api.endpoints).some(
      (endpoint: any) =>
        state[api.reducerPath]?.queries &&
        Object.values(state[api.reducerPath].queries).some((q: any) => q?.status === 'pending')
    )
  );

  return {
    isLoading,
  };
}; 