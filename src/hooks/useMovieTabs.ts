import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MovieTabStore {
  currentTab: string;

  setCurrentTab: (currentTab: string) => void;
}

const useMovieTab = create<MovieTabStore>()(
  devtools((set) => ({
    currentTab: 'upcoming',

    setCurrentTab: (currentTab) => set({ currentTab })
  }))
);

export default useMovieTab;
