import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Pre-defined admin credentials
const ADMIN_EMAIL = 'admin';
const ADMIN_PASSWORD = 'admin123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing login on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('shop_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate loading
    setIsLoading(true);

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if admin
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser: User = {
          id: 'admin-1',
          name: 'Administrator',
          email: 'admin@example.com',
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('shop_user', JSON.stringify(adminUser));
        setIsLoading(false);
        return true;
      }

      // For regular users, accept any credentials
      else if (email && password) {
        const regularUser: User = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0] || 'User',
          email: email,
          role: 'user'
        };
        setUser(regularUser);
        localStorage.setItem('shop_user', JSON.stringify(regularUser));
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shop_user');
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
