import { Gift } from '../types/Gift';
import { client } from '../utils/fetchClient';

export const getGiftsFromServer = (searchParams: string) => {
  return client.get<Gift[]>(`/api/gifts/${searchParams}`);
};
