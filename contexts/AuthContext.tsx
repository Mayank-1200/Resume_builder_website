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
<<<<<<< HEAD
      console.log('Checking auth state:', { 
        session: !!session, 
        status, 
        user: !!user,
        sessionUser: session?.user,
        sessionStatus: status
      });
      
      if (session) {
        // NextAuth session is active
        console.log('NextAuth session active, setting user from session');
=======
      if (session) {
        // NextAuth session is active
>>>>>>> 7669d29b5a09ea62a49a08c04507400bf932b763
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
<<<<<<< HEAD
        console.log('NextAuth unauthenticated, checking JWT token');
=======
>>>>>>> 7669d29b5a09ea62a49a08c04507400bf932b763
        const token = localStorage.getItem('jwt_token');
        if (token) {
          try {
            const decoded: any = jwtDecode(token);
<<<<<<< HEAD
            console.log('JWT token found, setting user from token');
=======
>>>>>>> 7669d29b5a09ea62a49a08c04507400bf932b763
            setUser({
              id: decoded.id || '',
              email: decoded.email || null,
              firstName: decoded.firstName || null,
              lastName: decoded.lastName || null,
              name: decoded.name || null,
            });
          } catch {
            // Invalid token, remove it
<<<<<<< HEAD
            console.log('Invalid JWT token, removing it');
=======
>>>>>>> 7669d29b5a09ea62a49a08c04507400bf932b763
            localStorage.removeItem('jwt_token');
            setUser(null);
          }
        } else {
<<<<<<< HEAD
          console.log('No JWT token found, user is null');
          setUser(null);
        }
        setIsLoading(false);
      } else if (status === 'loading') {
        console.log('NextAuth still loading...');
=======
          setUser(null);
        }
        setIsLoading(false);
>>>>>>> 7669d29b5a09ea62a49a08c04507400bf932b763
      }
      // Don't set loading to false if status is still 'loading'
    };

    if (status !== 'loading') {
      checkAuth();
    }
  }, [session, status]);

<<<<<<< HEAD
  // Add a session refresh mechanism for Google OAuth
  useEffect(() => {
    if (session && !user) {
      console.log('Session detected but no user, refreshing auth state...');
      // Force a refresh of the auth state
      const timer = setTimeout(() => {
        if (session && !user) {
          console.log('Refreshing user state from session...');
          setUser({
            id: session.user?.id || '',
            email: session.user?.email || null,
            firstName: session.user?.firstName || null,
            lastName: session.user?.lastName || null,
            name: session.user?.name || null,
          });
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [session, user]);

  const login = async (token: string) => {
    console.log('Login function called with token:', token ? 'present' : 'missing');
    
    localStorage.setItem('jwt_token', token);
    // Trigger a re-check of auth state
    const decoded: any = jwtDecode(token);
    console.log('Decoded token data:', { id: decoded.id, email: decoded.email, firstName: decoded.firstName });
    
=======
  const login = (token: string) => {
    localStorage.setItem('jwt_token', token);
    // Trigger a re-check of auth state
    const decoded: any = jwtDecode(token);
>>>>>>> 7669d29b5a09ea62a49a08c04507400bf932b763
    setUser({
      id: decoded.id || '',
      email: decoded.email || null,
      firstName: decoded.firstName || null,
      lastName: decoded.lastName || null,
      name: decoded.name || null,
    });
<<<<<<< HEAD
    
    console.log('User state set, waiting for state update...');
    
    // Small delay to ensure state is updated
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('Login function completed');
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
      
      // Small delay to ensure state is cleared
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Check if we're on a protected route and need to redirect
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
      const isProtectedRoute = currentPath.startsWith('/dashboard') || currentPath.startsWith('/profile');
      
      // Navigate to landing page
      if (isProtectedRoute) {
        // Force redirect for protected routes
        window.location.href = '/';
      } else {
        router.push('/');
      }
      
      // Fallback: if router.push doesn't work, use window.location
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location.pathname !== '/') {
          window.location.href = '/';
        }
      }, 100);
      
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
=======
  };

  const logout = async () => {
    if (session) {
      // NextAuth session, sign out
      await signOut({ redirect: false });
    } else {
      // JWT token, remove it
      localStorage.removeItem('jwt_token');
    }
    
    setUser(null);
    // Navigate to landing page instead of reloading
    router.push('/');
>>>>>>> 7669d29b5a09ea62a49a08c04507400bf932b763
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
