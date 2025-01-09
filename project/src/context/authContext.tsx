'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type AuthContextType = {
  isAuthenticated: boolean;
  user: any | null;
  showLoginToast: boolean;
  setShowLoginToast: (show: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  showLoginToast: false,
  setShowLoginToast: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsAuthenticated(!!user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user);
        setIsAuthenticated(true);
        setShowLoginToast(true);
      }
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
        setShowLoginToast(false); // Clear login toast on logout
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Add logout function to context
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setShowLoginToast(false); // Ensure toast is cleared
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      showLoginToast, 
      setShowLoginToast,
      logout // Add logout function to context
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
