import { axiosApi } from '@/util/axiosApi';

export interface Request {
  url: string;
  propsQueryString: Record<string, string | number | boolean>;
}

export const axGet = <Response>({ url, propsQueryString }: Request) => {
  return axiosApi.get<Response>(url, {
    params:
      propsQueryString && Object.keys(propsQueryString).length
        ? propsQueryString
        : undefined,
  });
};
