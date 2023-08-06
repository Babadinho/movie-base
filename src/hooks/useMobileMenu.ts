import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MobileMenuStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMobileMenu = create<MobileMenuStore>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
  }))
);

export default useMobileMenu;
