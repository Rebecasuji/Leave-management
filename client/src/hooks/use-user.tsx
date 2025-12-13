import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, INITIAL_USERS } from "@/lib/data";
import { useLocation } from "wouter";

interface UserContextType {
  user: User | null;
  login: (code: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check local storage for session
    const storedUser = localStorage.getItem("knockturn_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (code: string) => {
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = INITIAL_USERS.find((u) => u.code === code);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("knockturn_user", JSON.stringify(foundUser));
      
      // Redirect based on role
      if (foundUser.role === 'Admin') {
        setLocation('/admin/dashboard');
      } else {
        setLocation('/employee/dashboard');
      }
      
      return { success: true };
    }

    return { success: false, message: "Invalid Employee Code" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("knockturn_user");
    setLocation("/");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
