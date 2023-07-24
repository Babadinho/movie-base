import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SearchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchModal = create<SearchModalStore>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
  }))
);

export default useSearchModal;
