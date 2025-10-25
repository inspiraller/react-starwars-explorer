import { useQuery } from '@tanstack/react-query';

import { axGet } from './axGet';

interface Props<Response> {
  url: string;
  callback?: (results: Response) => Response;
}
const useGetFirstPage = <Response>({
  url,
  callback = (results) => results,
}: Props<Response>) =>
  useQuery<Response, Error>({
    queryKey: [url, 1],
    queryFn: () =>
      axGet<Response>({
        url,
        propsQueryString: { page: 1 },
      }).then(callback),
  });
export default useGetFirstPage;
