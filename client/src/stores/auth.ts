import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  lastSignedInAt: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

type AuthPersist = AuthState & { persist: PersistOptions<AuthState> };

export const useAuthStore = create<
  AuthState,
  [['zustand/persist', AuthPersist]]
>(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearAuth: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
