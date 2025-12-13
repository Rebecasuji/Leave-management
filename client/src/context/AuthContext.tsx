import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '@/lib/data';
import { getStoredUsers } from '@/lib/storage';
import { useLocation } from 'wouter';

interface AuthContextType {
  user: User | null;
  login: (code: string, password?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('knockturn_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (code: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getStoredUsers();
    const foundUser = users.find(u => u.code === code);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('knockturn_current_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('knockturn_current_user');
    setLocation('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
