import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';

const useMovies = (id: string) => {
  const REQUEST_URL = `/api/movie/${id}`;

  const { data, error, isLoading, mutate } = useSWR(REQUEST_URL, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  };
};

export default useMovies;
