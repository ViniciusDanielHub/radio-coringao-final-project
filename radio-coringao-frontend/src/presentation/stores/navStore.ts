import { create } from "zustand";

interface NavStore {
  activeCategory: string;
  isMobileMenuOpen: boolean;
  setActiveCategory: (category: string) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useNavStore = create<NavStore>((set) => ({
  activeCategory: "noticias",
  isMobileMenuOpen: false,
  setActiveCategory: (category) => set({ activeCategory: category }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));