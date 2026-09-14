/* Hearthline identity layer: the static frontend uses a small persisted session for prototype auth until a real backend is connected. */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type AuthUser = { name: string; email: string };

type AuthContextValue = {
  user: AuthUser | null;
  signIn: (email: string, password: string) => boolean;
  signUp: (name: string, email: string, password: string) => boolean;
  signOut: () => void;
};

const STORAGE_KEY = "hearthline-user";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    signIn: (email, password) => {
      if (!email.trim() || password.length < 6) return false;
      const name = email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
      setUser({ name: name || "Hearthline member", email: email.trim().toLowerCase() });
      return true;
    },
    signUp: (name, email, password) => {
      if (!name.trim() || !email.trim() || password.length < 6) return false;
      setUser({ name: name.trim(), email: email.trim().toLowerCase() });
      return true;
    },
    signOut: () => setUser(null),
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
