import { env } from '@/const/env';

import axios, { AxiosResponse } from 'axios';

const VITE_API_PROXY = env.VITE_API_PROXY;

export const axiosApi = axios.create({
  baseURL: VITE_API_PROXY,
});

// unwrap data.data automatically
axiosApi.interceptors.response.use(
  (response: AxiosResponse) => {
    const raw = response.data;
    // if `data` exists, return it
    if (raw && typeof raw === 'object' && 'data' in raw) {
      return (raw as any).data;
    }
    return raw;
  },
  (error) => Promise.reject(error),
);

// augment typings so TS knows axiosApi.request returns the payload
declare module 'axios' {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
  }
}
