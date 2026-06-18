"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  clearAuth,
  getStoredUser,
  getToken,
  setAuth,
  authApi,
  type AuthUser,
} from "@/lib/auth";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: any) => Promise<AuthUser>;
  signup: (data: any) => Promise<AuthUser>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const res = await authApi.me();
      if (res.user) {
        setUser(res.user);
      } else {
        clearAuth();
        setUser(null);
      }
    } catch {
      clearAuth();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const login = useCallback(async (data: any) => {
    const res = await authApi.login(data);
    setAuth(res.token, res.user, true);
    setUser(res.user);
    return res.user;
  }, []);

  const signup = useCallback(async (data: any) => {
    const res = await authApi.signup(data);
    setAuth(res.token, res.user, true);
    setUser(res.user);
    return res.user;
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
