import 'server-only';

const API_KEY = process.env.APP_API_KEY;

const useMovies = async (type: string, page: string) => {
  const REQUEST_URL = `https://api.themoviedb.org/3/movie/${type}/?api_key=${API_KEY}&language=en-US&page=${page}`;

  return await fetch(REQUEST_URL, {
    next: {
      revalidate: 86400
    }
  });
};

export default useMovies;
