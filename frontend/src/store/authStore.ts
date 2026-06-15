"use client";

import { create } from "zustand";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,

  setAuth: (user, token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("arlo_token", token);
      localStorage.setItem("arlo_user", JSON.stringify(user));
    }
    set({ user, token });
  },

  clearAuth: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("arlo_token");
      localStorage.removeItem("arlo_user");
    }
    set({ user: null, token: null });
  },

  isAuthenticated: () => {
    const { token } = get();
    if (token) return true;
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("arlo_token");
    }
    return false;
  },
}));
