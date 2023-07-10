import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useGenres = () => {
  const REQUEST_URL = '/api/genres';

  const { data, error, isLoading, mutate } = useSWR(REQUEST_URL, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  };
};

export default useGenres;
