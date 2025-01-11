import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import type {
  User as SupabaseUser,
  Session as SupabaseSession,
} from '@supabase/auth-js';

interface AuthState {
  user: SupabaseUser | null;
  session: SupabaseSession | null;
  setUser: (user: SupabaseUser) => void;
  setSession: (session: SupabaseSession) => void;
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
      session: null,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      clearAuth: () => set({ user: null, session: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
