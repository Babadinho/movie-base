import 'server-only';

const API_KEY = process.env.APP_API_KEY;

const useMovies = async (id: string) => {
  const REQUEST_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

  return await fetch(REQUEST_URL, {
    next: {
      revalidate: 86400
    }
  });
};

export default useMovies;
