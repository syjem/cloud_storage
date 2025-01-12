import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ViewState {
  view: 'list' | 'gallery';
  setView: (view: 'list' | 'gallery') => void;
}

export const useViewStore = create<ViewState>()(
  persist(
    (set) => ({
      view: 'list',
      setView: (view) => set({ view }),
    }),
    {
      name: 'view-state',
    }
  )
);
