"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEMO_CREDENTIALS } from "@/lib/constants";

// MOCK AUTH — client-side only, backed by localStorage. There is no real
// backend session, password hashing, or token issuance here. This exists
// purely to gate the dashboard demo behind a login screen. See SECURITY.md.
interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  hasHydrated: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      email: null,
      hasHydrated: false,
      login: (email, password) => {
        if (email.trim().toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
          set({ isAuthenticated: true, email });
          return { ok: true };
        }
        return { ok: false, error: "Invalid demo credentials. Use the pre-filled ones below." };
      },
      logout: () => set({ isAuthenticated: false, email: null }),
    }),
    { name: "arbitragex-demo-auth" },
  ),
);
// Flip hasHydrated once the persisted state has been read from localStorage,
// so client components can wait for it instead of racing an effect-driven
// setState (which SSR/hydration mismatch would otherwise force). Guarded
// because this module also loads during server-side prerendering, where
// there is no localStorage and `.persist` hydration never runs.
if (typeof window !== "undefined") {
  useAuthStore.persist.onFinishHydration((state) => {
    useAuthStore.setState({ ...state, hasHydrated: true });
  });
  if (useAuthStore.persist.hasHydrated()) {
    useAuthStore.setState({ hasHydrated: true });
  }
}
