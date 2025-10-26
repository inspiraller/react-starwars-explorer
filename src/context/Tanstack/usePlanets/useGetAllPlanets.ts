import useGetAllPages from '../dynamic/useGetAllPages';
import useGetFirstPage from '../dynamic/useGetFirstPage';
import { DISPLAY_ITEMS_PER_PAGE } from '../dynamic/util/const';

import { ResponsePlanets } from '@/types/Planet';
import { getTotalPages } from '../dynamic/getTotalPages';

import { useUpdatePlanetsStore } from './useUpdatePlanetsStore';
import { URL_API_PATH } from './const';

const url = URL_API_PATH;

const useGetAllPlanets = () => {
  const { callback } = useUpdatePlanetsStore();

  // First, get the initial page to determine total count
  const { data: dataFirstPage } = useGetFirstPage<ResponsePlanets>({
    url,
    callback,
  });

  // Calculate total pages based on count (assuming 10 items per page for SWAPI)
  const totalPages = dataFirstPage
    ? getTotalPages(dataFirstPage?.count, DISPLAY_ITEMS_PER_PAGE)
    : 0;

  // Create queries for all pages
  const results = useGetAllPages<ResponsePlanets>({
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

export default useGetAllPlanets;
