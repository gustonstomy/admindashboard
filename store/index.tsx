import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isLoggedIn: () => boolean;
  login: (accessToken: string | null) => void;
  logout: () => void;
  isHydrated: boolean;
  setHydrated: () => void;
  getToken: () => string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      isLoggedIn: () => !!get().accessToken,
      login: (accessToken) => {
        set({ accessToken, isHydrated: true });
      },
      logout: () => set({ accessToken: null, isHydrated: false }),
      isHydrated: false,
      setHydrated: () => set({ isHydrated: true }),
      getToken: () => get().accessToken,
    }),
    {
      name: "admin-auth-token",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
        }
      },
    }
  )
);
