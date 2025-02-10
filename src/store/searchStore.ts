import { create } from "zustand";

type searchStore = {
  searchText: string;
  setSearch: (params: string) => void;
};

export const useSearchStore = create<searchStore>((set) => ({
  searchText: "",

  setSearch: (params: string) => {
    set((state: searchStore) => {
      if (state.searchText !== params) {
        return { searchText: params };
      }
      return state;
    });
  },

  // 동일한 값일 경우 업데이트하지 않음
}));
