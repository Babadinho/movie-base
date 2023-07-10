import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MovieStore {
  movies: any[];
  error: null;

  setMovies: (movies: any[]) => void;
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
