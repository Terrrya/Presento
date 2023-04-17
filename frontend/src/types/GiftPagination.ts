import { Gift } from './Gift';

export interface GiftPagination {
  count: number;
  next: string;
  previous: string;
  results: Gift[];
}
