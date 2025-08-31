'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface AuthUser {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (token: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      if (session) {
        // NextAuth session is active
        setUser({
          id: session.user?.id || '',
          email: session.user?.email || null,
          firstName: session.user?.firstName || null,
          lastName: session.user?.lastName || null,
          name: session.user?.name || null,
        });
        setIsLoading(false);
      } else if (status === 'unauthenticated') {
        // Check for JWT token only after NextAuth is done
        const token = localStorage.getItem('jwt_token');
        if (token) {
          try {
            const decoded: any = jwtDecode(token);
            setUser({
              id: decoded.id || '',
              email: decoded.email || null,
              firstName: decoded.firstName || null,
              lastName: decoded.lastName || null,
              name: decoded.name || null,
            });
          } catch {
            // Invalid token, remove it
            localStorage.removeItem('jwt_token');
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
      // Don't set loading to false if status is still 'loading'
    };

    if (status !== 'loading') {
      checkAuth();
    }
  }, [session, status]);

  const login = (token: string) => {
    localStorage.setItem('jwt_token', token);
    // Trigger a re-check of auth state
    const decoded: any = jwtDecode(token);
    setUser({
      id: decoded.id || '',
      email: decoded.email || null,
      firstName: decoded.firstName || null,
      lastName: decoded.lastName || null,
      name: decoded.name || null,
    });
  };

  const logout = async () => {
    try {
      // Set loading state during logout
      setIsLoading(true);
      
      // Clear any cached data or state that might persist
      if (typeof window !== 'undefined') {
        // Clear any additional localStorage items that might be related to user data
        const keysToRemove = ['user_preferences', 'resume_drafts', 'temp_data'];
        keysToRemove.forEach(key => {
          if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
          }
        });
      }
      
      if (session) {
        // NextAuth session, sign out
        await signOut({ redirect: false });
      } else {
        // JWT token, remove it
        localStorage.removeItem('jwt_token');
      }
      
      // Clear user state immediately
      setUser(null);
      
      // Navigate to landing page
      router.push('/');
      
    } catch (error) {
      console.error('Logout error:', error);
      
      // Even if there's an error, clear local state and redirect
      setUser(null);
      localStorage.removeItem('jwt_token');
      
      // Force redirect to landing page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } finally {
      // Always clear loading state
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading: isLoading || status === 'loading',
    isAuthenticated: !!user,
    isHydrated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
