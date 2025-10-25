import { useQueries, UseQueryResult } from '@tanstack/react-query';

import { axGet } from './axGet';

export interface Props<Response> {
  url: string;
  totalPages: number;
  callback?: (results: Response) => Response;
}
// ! WARNING - DO NOT CALL THIS PAGE DIRECTLY
// Use useGetAll
// useGetAll will call both useGetFirstPage and useGetAllPages
const useGetAllPages = <Response>({
  url,
  totalPages,
  callback = (results) => results,
}: Props<Response>): UseQueryResult<Response, Error>[] =>
  useQueries({
    queries:
      totalPages > 0
        ? Array.from({ length: totalPages }, (_, i) => ({
            queryKey: [url, i + 1],
            queryFn: () =>
              axGet<Response>({
                url,
                propsQueryString: { page: i + 1 },
              }).then(callback),
          }))
        : [],
  });

export default useGetAllPages;
