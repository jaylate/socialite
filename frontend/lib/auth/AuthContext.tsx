'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/lib/api';
interface User {
  userId: number;
  username: string;
  email: string;
}
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    authService.me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);
  const login = async (username: string, password: string) => {
    await authService.login({ username, password });
    const user = await authService.me();
    setUser(user);
  };
  const register = async (username: string, email: string, password: string) => {
    await authService.register({ username, email, password });
    const user = await authService.me();
    setUser(user);
  };
  const logout = () => {
    // Call logout endpoint if you have one
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}