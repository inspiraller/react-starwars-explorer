import { useQueries, UseQueryResult } from '@tanstack/react-query';

import { axGet } from './axGet';

import { env } from '@/const/env';

const { VITE_API_SWAPI_URL } = env;

// Prevent this use hook from making more than 10 consecutive requests.

export interface Props<Response> {
  url: string;
  fromPage: number;
  toPage: number;
  callback?: (results: Response) => Response;
}
// ! WARNING - DO NOT CALL THIS PAGE DIRECTLY
// Use useGetAll
// useGetAll will call both useGetFirstPage and useGetAllPages
const useGetPageRange = <Response>({
  url,
  fromPage,
  toPage,
  callback = (results) => results,
}: Props<Response>): UseQueryResult<Response, Error>[] =>
  useQueries({
    queries:
      toPage >= fromPage
        ? Array.from({ length: toPage - fromPage + 1 }, (_, i) => ({
            queryKey: [VITE_API_SWAPI_URL, url, fromPage + i],
            queryFn: () =>
              axGet<Response>({
                url,
                propsQueryString: { page: fromPage + i },
              }).then(callback),
          }))
        : [],
  });

export default useGetPageRange;
