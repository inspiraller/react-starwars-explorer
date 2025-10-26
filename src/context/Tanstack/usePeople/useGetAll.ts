import { usePeopleStore } from '@/store/zustand/people/people';
import useGetAllPages from '../dynamic/useGetAllPages';
import useGetFirstPage from '../dynamic/useGetFirstPage';
import { URL_API_PATH, type ResponsePeople } from './const';
import { getPersonsArray } from './getPersonsArray';

const url = URL_API_PATH;

const useGetAllPeople = () => {
  const { updatePeople } = usePeopleStore();

  const callback = (response: ResponsePeople) => {
    // On callback - CREATE zustand store of names
    const first = [response];
    const names = getPersonsArray(first) as string[];
    updatePeople(names);
    return response;
  };
  // First, get the initial page to determine total count
  const { data: dataFirstPage } = useGetFirstPage<ResponsePeople>({
    url,
    callback,
  });

  // Calculate total pages based on count (assuming 10 items per page for SWAPI)
  const totalPages = dataFirstPage?.count
    ? Math.ceil(dataFirstPage.count / 10)
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
  const error = results.some((r) => r.error);

  const dataAll = allSuccess ? results.map((item) => item.data) : null;

  return { data: dataAll, isSuccess: allSuccess, isFetching, error };
};

export default useGetAllPeople;
