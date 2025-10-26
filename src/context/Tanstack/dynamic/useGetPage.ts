import { useQuery } from '@tanstack/react-query';

import { axGet } from './axGet';

import { env } from '@/const/env';

const { VITE_API_SWAPI_URL } = env;

export interface Props<Response> {
  url: string;
  page: number;
  callback?: (results: Response) => Response;
}

const useGetPage = <Response>({ url, page, callback }: Props<Response>) =>
  useQuery<Response, Error>({
    queryKey: [VITE_API_SWAPI_URL, url, page],
    queryFn: () =>
      axGet<Response>({
        url,
        propsQueryString: { page },
      }).then(callback),
  });

export default useGetPage;
