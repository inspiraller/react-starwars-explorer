import useGetAllPages from '../dynamic/useGetAllPages';
import useGetFirstPage from '../dynamic/useGetFirstPage';
import { DISPLAY_ITEMS_PER_PAGE } from '../dynamic/util/const';

import { ResponseFilms } from '@/types/Film';
import { getTotalPages } from '../dynamic/getTotalPages';

import { useUpdateFilmsStore } from './useUpdateFilmsStore';
import { URL_API_PATH } from './const';

const url = URL_API_PATH;

const useGetAllFilms = () => {
  const { callback } = useUpdateFilmsStore();

  // First, get the initial page to determine total count
  const { data: dataFirstPage } = useGetFirstPage<ResponseFilms>({
    url,
    callback,
  });

  // Calculate total pages based on count (assuming 10 items per page for SWAPI)
  const totalPages = dataFirstPage
    ? getTotalPages(dataFirstPage?.count, DISPLAY_ITEMS_PER_PAGE)
    : 0;

  // Create queries for all pages
  const results = useGetAllPages<ResponseFilms>({
    url,
    totalPages,
    callback,
  });

  // Wait for all queries to be successful
  const allSuccess = results.every((r) => r.isSuccess);
  const isFetching = results.some((r) => r.isFetching);
  const error = results.find((r) => r.error);
  const dataAll = allSuccess ? results.map((item) => item.data) : null;

  return {
    data: dataAll,
    isSuccess: allSuccess,
    isFetching: isFetching,
    error,
    totalPages,
  };
};

export default useGetAllFilms;
