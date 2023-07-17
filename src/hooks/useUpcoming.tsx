import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
const API_KEY = process.env.NEXT_PUBLIC_APP_API_KEY;

const useUpcoming = (type: string, page: string) => {
  const REQUEST_URL = `https://api.themoviedb.org/3/movie/${type}/?api_key=${API_KEY}&language=en-US&page=${page}`;

  const { data, error, isLoading, mutate } = useSWR(REQUEST_URL, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  };
};

export default useUpcoming;
