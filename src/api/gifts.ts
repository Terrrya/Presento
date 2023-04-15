import { GiftPagination } from '../types/GiftPagination';
import { axiosApi } from '../utils/axiosApi';

export const getGiftsFromServer = (searchParams: string) => {
  return axiosApi.get<GiftPagination>(`gifts/?${searchParams}`);
};
