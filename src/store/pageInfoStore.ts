import { create } from "zustand";

type PageStoreState = {
  pgId: string;
  editMode: boolean;
  fromAction: string;
  setPgId: (params: string) => void;
  setEditMode: (params: boolean) => void;
  setFromAction: (params: string) => void;
};

export const usePageInfoStore = create<PageStoreState>((set) => ({
  pgId: "",
  editMode: false,
  fromAction: "",

  setPgId: (params: string) => {
    set((state: PageStoreState) => {
      if (state.pgId !== params) {
        return { pgId: params };
      }
      return state;
    });
  },
  setEditMode: (params: boolean) => {
    set((state: PageStoreState) => {
      if (state.editMode !== params) {
        return { editMode: params };
      }
      return state;
    });
  },
  setFromAction: (params: string) => {
    set((state: PageStoreState) => {
      if (state.fromAction !== params) {
        return { fromAction: params };
      }
      return state;
    });
  },
}));
