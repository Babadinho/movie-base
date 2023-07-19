import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  page: number;
  total_pages: number;
}

interface MovieStore {
  movies: Movie[];
  error: null;

  setMovies: (movies: Movie[]) => void;
  setError: (error: null) => void;
}

const useMovieStore = create<MovieStore>()(
  devtools((set) => ({
    movies: [],
    error: null,

    setMovies: (movies) => set({ movies }),
    setError: (error) => set({ error })
  }))
);

export default useMovieStore;
