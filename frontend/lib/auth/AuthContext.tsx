'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/lib/api';
import type { UserResponse, AuthContextType } from '@/lib/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService
      .me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    await authService.login({ username, password });
    const user = await authService.me();
    setUser(user);
    window.dispatchEvent(new CustomEvent('auth-change'));
  };

  const register = async (username: string, email: string, password: string) => {
    await authService.register({ username, email, password });
    const user = await authService.me();
    setUser(user);
    window.dispatchEvent(new CustomEvent('auth-change'));
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    window.dispatchEvent(new CustomEvent('auth-change'));
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
