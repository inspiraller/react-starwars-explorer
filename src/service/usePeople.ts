import { useQuery } from '@tanstack/react-query';
import { axiosApi } from '@/util/axiosApi';

export const queryKey = ['people'];
export interface Request {
  page?: number;
}

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

const get = (props?: Request) => {
  return axiosApi.get<Response>('/people', {
    params: props && Object.keys(props).length ? props : undefined,
  });
};

export const useGetPeople = (props?: Request) => {
  return useQuery<Response, Error>({
    queryKey: [...queryKey, props?.page], // include props so caching works per page
    queryFn: () => get(props),
  });
};
