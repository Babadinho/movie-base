import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useMovies = (id: string) => {
  const REQUEST_URL = `/api/movie/cast/${id}`;

  const { data, error, isLoading, mutate } = useSWR(REQUEST_URL, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  };
};

export default useMovies;
