import { useQuery } from '@tanstack/react-query';
import { axGet } from './axGet';
import { env } from '@/const/env';

const { VITE_API_SWAPI_URL } = env;

interface Props<Response> {
  url: string;
  callback?: (results: Response) => Response;
}
const useGetFirstPage = <Response>({
  url,
  callback = (results) => results,
}: Props<Response>) =>
  useQuery<Response, Error>({
    queryKey: [VITE_API_SWAPI_URL, url, 1],
    queryFn: () =>
      axGet<Response>({
        url,
        propsQueryString: { page: 1 },
      }).then(callback),
  });
export default useGetFirstPage;
