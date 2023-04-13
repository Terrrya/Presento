import { GiftPagination } from '../types/GiftPagination';
import { client } from '../utils/fetchClient';

export const getGiftsFromServer = (searchParams: string) => {
  return client.get<GiftPagination>(`/api/gifts/${searchParams}`);
};
