import useGetAllPages from '../dynamic/useGetAllPages';
import useGetFirstPage from '../dynamic/useGetFirstPage';
import { DISPLAY_ITEMS_PER_PAGE, URL_API_PATH } from './const';

import { ResponsePeople } from '@/types/Person';
import { getTotalPages } from '../dynamic/getTotalPages';

import { useUpdatePeopleStore } from './useUpdatePeopleStore';

const url = URL_API_PATH;

const useGetAllPeople = () => {
  const { callback } = useUpdatePeopleStore();

  // First, get the initial page to determine total count
  const { data: dataFirstPage } = useGetFirstPage<ResponsePeople>({
    url,
    callback,
  });

  // Calculate total pages based on count (assuming 10 items per page for SWAPI)
  const totalPages = dataFirstPage
    ? getTotalPages(dataFirstPage?.count, DISPLAY_ITEMS_PER_PAGE)
    : 0;

  // Create queries for all pages
  const results = useGetAllPages<ResponsePeople>({
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

export default useGetAllPeople;
