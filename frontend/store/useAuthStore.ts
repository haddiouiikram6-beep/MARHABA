import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import api from "../services/api";

interface User {
  id: number;
  fullName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      await SecureStore.setItemAsync("token", token);

      const me = await api.get("/auth/me");

      set({
        token,
        user: me.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
      });

      throw error;
    }
  },
  register: async (fullName, email, password) => {
    set({ isLoading: true });

    try {
      const response = await api.post("/auth/register", {
        fullName,
        email,
        password,
      });

      const token = response.data.token;

      await SecureStore.setItemAsync("token", token);

      const me = await api.get("/auth/me");

      set({
        token,
        user: me.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
      });

      throw error;
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("token");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  restoreSession: async () => {
    set({
      isLoading: true,
    });

    try {
      const token = await SecureStore.getItemAsync("token");

      if (!token) {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });

        return;
      }

      const me = await api.get("/auth/me");

      set({
        token,
        user: me.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      await SecureStore.deleteItemAsync("token");

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));