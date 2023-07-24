import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useSearchMovies = (query: string | null, page: string, year?: string | null) => {
  const REQUEST_URL = `/api/search/${query}/${page}/?year=${year}`;

  const { data, error, isLoading, mutate } = useSWR(REQUEST_URL, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  };
};

export default useSearchMovies;
