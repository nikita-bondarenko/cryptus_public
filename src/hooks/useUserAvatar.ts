import { useGetUserDetailQuery } from "@/api/api";
import { useAppSelector } from "@/redux/hooks";
import { useMemo } from "react";

export const useUserAvatar = () => {
  const userId = useAppSelector((state) => state.userData.userId);
  const isAppReady = useAppSelector((state) => state.ui.isAppReady);
  const { data: userDetail, isLoading } = useGetUserDetailQuery(userId ?? 0, {
    skip: !userId || !isAppReady,
  });

  const avatar = useMemo(() => {
    if (!userDetail?.profile_picture) {
      return null;
    }

    // Если аватар - это URL, возвращаем его как есть
    if (userDetail.profile_picture.startsWith('http')) {
      return userDetail.profile_picture;
    }

    // Если аватар - это base64 строка, добавляем префикс для отображения
    if (userDetail.profile_picture.startsWith('data:')) {
      return userDetail.profile_picture;
    }

    // Если аватар - это путь к файлу, добавляем базовый URL
    return `${process.env.NEXT_PUBLIC_API_URL}${userDetail.profile_picture}`;
  }, [userDetail?.profile_picture, isAppReady]);

  return {
    avatar,
    isLoading,
    hasAvatar: !!avatar,
  };
}; 