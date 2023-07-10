import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';

const useMovies = (type: string, page: string) => {
  const REQUEST_URL = `/api/movies/${type}/${page}`;

  const { data, error, isLoading, mutate } = useSWR(REQUEST_URL, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  };
};

export default useMovies;
