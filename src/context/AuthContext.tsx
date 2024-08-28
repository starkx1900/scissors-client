'use client';

import apiClient from '@/lib/api';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = apiClient.getTokenFromLocalStorage();
    const userInfo = apiClient.getUserInfo();
    if (token && userInfo) {
      setUser(userInfo);
    }
  }, []);

  const login = async (email: string, password: string) => {
    await apiClient.login(email, password);
    const userInfo = apiClient.getUserInfo();
    setUser(userInfo);
    router.push('/');
  };

  const logout = () => {
    apiClient.logout();
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
