import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  lastSignedInAt: string;
}

interface Session {
  accessToken: string;
  expiresAt: string;
  expiresIn: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  setUser: (user: User) => void;
  setSession: (session: Session) => void;
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
