import { useQuery } from '@tanstack/react-query';

import { axGet } from './axGet';

interface Props {
  url: string;
  id?: string;
  enabled?: boolean;
}
const useGetById = <Response>({ url, id, enabled }: Props) =>
  useQuery<Response, Error>({
    enabled,
    queryKey: [url, id],
    queryFn: () =>
      axGet<Response>({
        url: `${url}/${id}`,
      }),
  });
export default useGetById;
