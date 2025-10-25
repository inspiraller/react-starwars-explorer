import { Person } from '@/types/Person';

export const URL_API_PATH = '/people';
export const QUERY_KEY = URL_API_PATH;

export interface ResponsePeople {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}
