import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
const API_KEY = process.env.APP_API_KEY;

const useUpcoming = (page: string) => {
  const REQUEST_URL = page && `/api/movies/upcoming/${page}`;

  const { data, error, isLoading, mutate } = useSWR(REQUEST_URL, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  };
};

export default useUpcoming;
